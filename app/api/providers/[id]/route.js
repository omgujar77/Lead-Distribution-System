import { NextResponse } from "next/server";

import connectDB from "@/lib/db";

import Provider from "@/models/Provider";
import Lead from "@/models/Lead";


import LeadAssignment from "@/models/LeadAssignment";

// ======================================
// GET PROVIDER DETAILS
// ======================================

export async function GET(request, context) {
  try {
    await connectDB();

    // IMPORTANT FOR NEXT 15
    const params = await context.params;

    const providerId = params.id;

    // ==========================
    // GET PROVIDER
    // ==========================

    const provider = await Provider.findById(providerId);

    if (!provider) {
      return NextResponse.json({
        success: false,

        message: "Provider not found",
      });
    }

    // ==========================
    // GET ASSIGNMENTS
    // ==========================

    const assignments = await LeadAssignment.find({
      providerId,
    }).populate("leadId");

    // ==========================
    // EXTRACT LEADS
    // ==========================

    const leads = assignments.map((item) => item.leadId);

    return NextResponse.json({
      success: true,

      provider,

      leads,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,

      message: error.message,
    });
  }
}
