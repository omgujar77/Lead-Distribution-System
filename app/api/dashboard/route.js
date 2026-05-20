import { NextResponse } from "next/server";

import connectDB from "@/lib/db";

import LeadAssignment from "@/models/LeadAssignment";

import "@/models/Lead";
import "@/models/Provider";

export async function GET() {

  try {

    await connectDB();

    const assignments =
      await LeadAssignment.find()
        .populate("leadId")
        .populate("providerId")
        .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      assignments,
    });

  } catch (error) {

    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}