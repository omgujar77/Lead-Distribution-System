import connectDB from "@/lib/db";

import Provider from "@/models/Provider";


export async function POST() {

  try {

    await connectDB();

    await Provider.updateMany(
      {},
      {
        quotaRemaining: 10,
      }
    );

    return Response.json({
      success: true,
      message: "Quotas reset successfully",
    });

  } catch (error) {

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}