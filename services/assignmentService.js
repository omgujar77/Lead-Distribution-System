import mongoose from "mongoose";

import { getIO } from "../lib/socket.js";

import Provider from "../models/Provider.js";
import LeadAssignment from "../models/LeadAssignment.js";
import AllocationState from "../models/AllocationState.js";


// ============================================
// MANDATORY PROVIDER RULES
// ============================================

const mandatoryRules = {
  "Service 1": ["Provider 1"],
  "Service 2": ["Provider 5"],
  "Service 3": ["Provider 1", "Provider 4"],
};


// ============================================
// GET MANDATORY PROVIDERS
// ============================================

export async function getMandatoryProviders(serviceType) {

  const providerNames =
    mandatoryRules[serviceType] || [];

  const providers = await Provider.find({
    name: { $in: providerNames },
  });

  return providers;
}


// ============================================
// FILTER PROVIDERS BY QUOTA
// ============================================

export async function filterByQuota(providers) {

  return providers.filter(
    (provider) => provider.quotaRemaining > 0
  );
}


// ============================================
// GET FAIR ROUND-ROBIN PROVIDERS
// ============================================

export async function getFairProviders(
  serviceType,
  count,
  excludedProviderIds = []
) {

  const allocationState =
    await AllocationState.findOne({
      serviceType,
    }).populate("providerPool");

  if (!allocationState) {

    throw new Error(
      "Allocation state not found"
    );
  }

  // ==========================
  // FILTER PROVIDERS
  // ==========================

  let availableProviders =
    allocationState.providerPool.filter(

      (provider) =>

        !excludedProviderIds.includes(
          provider._id.toString()
        ) &&

        provider.quotaRemaining > 0
    );

  if (
    availableProviders.length === 0
  ) {

    return [];
  }

  // ==========================
  // ROUND ROBIN
  // ==========================

  const selectedProviders = [];

  let currentIndex =
    allocationState.lastIndex || 0;

  for (
    let i = 0;
    i < availableProviders.length &&
    selectedProviders.length < count;
    i++
  ) {

    const provider =
      availableProviders[
        currentIndex %
        availableProviders.length
      ];

    selectedProviders.push(provider);

    currentIndex++;
  }

  // ==========================
  // UPDATE INDEX
  // ==========================

  allocationState.lastIndex =
    currentIndex;

  await allocationState.save();

  return selectedProviders;
}


// ============================================
// MAIN ASSIGNMENT FUNCTION
// ============================================

export async function assignLeadToProviders(
  leadId,
  serviceType,
  retryCount = 1
) {

  const session =
    await mongoose.startSession();

  session.startTransaction();

  try {

    // ==============================
    // MANDATORY PROVIDERS
    // ==============================

    const mandatoryProviders =
      await getMandatoryProviders(
        serviceType
      );

    const validMandatory =
      await filterByQuota(
        mandatoryProviders
      );

    // ==============================
    // FAIR PROVIDERS
    // ==============================

    const remainingCount =
      3 - validMandatory.length;

    const fairProviders =
      await getFairProviders(

        serviceType,

        remainingCount,

        validMandatory.map(
          (p) =>
            p._id.toString()
        )
      );

    // ==============================
    // FINAL PROVIDERS
    // ==============================

    const finalProviders = [

      ...validMandatory,

      ...fairProviders,
    ];

    // ==============================
    // CREATE ASSIGNMENTS
    // ==============================

    for (const provider of finalProviders) {

      await LeadAssignment.create(
        [
          {
            leadId,
            providerId:
              provider._id,
          },
        ],
        { session }
      );

      provider.quotaRemaining -= 1;

      provider.totalAssigned += 1;

      await provider.save({
        session,
      });
    }

    // ==============================
    // COMMIT TRANSACTION
    // ==============================

    await session.commitTransaction();

    session.endSession();

    // ==============================
    // SOCKET EVENTS
    // ==============================

    const io = getIO();

    if (io) {

      for (const provider of finalProviders) {

        io.emit(
          "lead-assigned",
          {
            providerId:
              provider._id,

            providerName:
              provider.name,

            quotaRemaining:
              provider.quotaRemaining,

            leadId,
          }
        );
      }

      console.log(
        "Socket Event Emitted Successfully"
      );
    }

    return finalProviders;

  } catch (error) {

    await session.abortTransaction();

    session.endSession();

    // Retry only for write conflicts
    if (
      retryCount > 0 &&
      error.message.includes(
        "Write conflict"
      )
    ) {

      console.log(
        `Retrying transaction... Attempts left: ${retryCount}`
      );

      return await assignLeadToProviders(

        leadId,

        serviceType,

        retryCount - 1
      );
    }

    console.log(
      "Assignment Error:",
      error
    );

    throw error;
  }
}