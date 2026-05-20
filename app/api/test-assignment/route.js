import connectDB from "@/lib/db";

import Lead from "@/models/Lead";

import {
  assignLeadToProviders,
} from "@/services/assignmentService";


export async function GET() {

  try {

    await connectDB();

    // CREATE TEST LEAD
    const lead = await Lead.create({
      name: "Test User",
      phone: Math.random().toString().slice(2, 12),
      city: "Latur",
      serviceType: "Service 1",
      description: "Need help",
    });

    // ASSIGN LEAD
    const providers =
      await assignLeadToProviders(
        lead._id,
        lead.serviceType
      );

    return Response.json({
      success: true,
      assignedProviders:
        providers.map((p) => p.name),
    });

  } catch (error) {

    return Response.json({
      success: false,
      error: error.message,
    });
  }
}