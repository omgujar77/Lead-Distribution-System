import { NextResponse }
from "next/server";

import connectDB
from "@/lib/db";

import Provider
from "@/models/Provider";

import ProcessedWebhook
from "@/models/ProcessedWebhook";


// ======================================
// PAYMENT SUCCESS WEBHOOK
// ======================================

export async function POST(req) {

  try {

    console.log(
      "WEBHOOK STEP 1"
    );

    await connectDB();

    console.log(
      "WEBHOOK STEP 2"
    );

    const body =
      await req.json();

    console.log(
      "WEBHOOK BODY:",
      body
    );

    const {
      webhookId,
      providerId,
    } = body;

    // ==========================
    // VALIDATION
    // ==========================

    if (
      !webhookId ||
      !providerId
    ) {

      return NextResponse.json({

        success: false,

        message:
          "webhookId and providerId required",
      });
    }

    // ==========================
    // CHECK DUPLICATE WEBHOOK
    // ==========================

    const existingWebhook =
      await ProcessedWebhook.findOne({

        webhookId,
      });

    if (existingWebhook) {

      return NextResponse.json({

        success: false,

        message:
          "Webhook already processed",
      });
    }

    console.log(
      "WEBHOOK STEP 3"
    );

    // ==========================
    // FIND PROVIDER
    // ==========================

    const provider =
      await Provider.findById(
        providerId
      );

    if (!provider) {

      return NextResponse.json({

        success: false,

        message:
          "Provider not found",
      });
    }

    console.log(
      "WEBHOOK STEP 4"
    );

    // ==========================
    // RESET QUOTA
    // ==========================

    provider.quotaRemaining = 10;

    await provider.save();

    console.log(
      "WEBHOOK STEP 5"
    );

    // ==========================
    // SAVE WEBHOOK RECORD
    // ==========================

    await ProcessedWebhook.create({

      webhookId,
    });

    console.log(
      "WEBHOOK STEP 6"
    );

    return NextResponse.json({

      success: true,

      message:
        "Quota reset successfully",
    });

  } catch (error) {

    console.log(
      "WEBHOOK ERROR:",
      error
    );

    return NextResponse.json({

      success: false,

      message:
        error.message,
    });
  }
}