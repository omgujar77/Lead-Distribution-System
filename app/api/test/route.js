import connectDB from "@/lib/db";
import Lead from "@/models/Lead";

export async function GET() {
  try {
    await connectDB();

    await Lead.create({
      name: "Om",
      phone: "9999999999",
      city: "Akola",
      serviceType: "Service 1",
      description: "Test",
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json({
      error: error.message,
    });
  }
}