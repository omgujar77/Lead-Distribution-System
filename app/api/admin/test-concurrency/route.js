import { NextResponse }
from "next/server";

import connectDB
from "@/lib/db";

import Lead
from "@/models/Lead";

import {
  assignLeadToProviders
}
from "@/services/assignmentService";


export async function POST() {

  try {

    await connectDB();

    const promises = [];

    for (let i = 0; i < 5; i++) {

      promises.push(

        (async () => {

          // SMALL DELAY
          await new Promise(
            (resolve) =>
              setTimeout(
                resolve,
                i * 500
              )
          );

          const lead =
            await Lead.create({

              name:
                `Test User ${i}`,

              phone:
                `99999${Date.now()}${i}`,

              city: "Latur",

              serviceType:
                `Service ${
                  (i % 3) + 1
                }`,

              description:
                "Concurrency Test",
            });

          await assignLeadToProviders(
            lead._id,
            lead.serviceType
          );

          return lead;
        })()
      );
    }

    const results =
      await Promise.all(promises);

    return NextResponse.json({

      success: true,

      message:
        "Concurrency test completed",

      totalLeads:
        results.length,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      success: false,

      message: error.message,
    });
  }
}