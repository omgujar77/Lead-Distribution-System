import { NextResponse } from "next/server";

import connectDB from "@/lib/db";

import Lead from "@/models/Lead";

import {
  assignLeadToProviders,
} from "@/services/assignmentService";


export async function POST(req) {

  try {

    console.log("STEP 1");

    await connectDB();

    console.log("STEP 2");

    const body = await req.json();

    console.log("STEP 3", body);

    const {
      name,
      phone,
      city,
      serviceType,
      description,
    } = body;

    // =========================
    // CREATE LEAD
    // =========================

    const lead = await Lead.create({

      name,
      phone,
      city,
      serviceType,
      description,
    });

    console.log("STEP 4 LEAD CREATED");

    // =========================
    // ASSIGN PROVIDERS
    // =========================

    await assignLeadToProviders(
      lead._id,
      serviceType
    );

    console.log("STEP 5 ASSIGNMENT DONE");

    return NextResponse.json({

      success: true,

      message:
        "Lead created successfully",
    });

  } catch (error) {

    console.log(
      "CREATE LEAD ERROR:",
      error
    );

    // Duplicate error
    if (error.code === 11000) {

      return NextResponse.json({

        success: false,

        message:
          "Duplicate lead already exists",
      });
    }

    return NextResponse.json({

      success: false,

      message: error.message,
    });
  }
}