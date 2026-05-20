
import connectDB from "../lib/db.js";

import Provider from "../models/Provider.js";
import AllocationState from "../models/AllocationState.js";

const seed = async () => {
  try {
    await connectDB();

    // Clear old data
    await Provider.deleteMany();
    await AllocationState.deleteMany();

    // Create providers
    const providers = await Provider.insertMany([
      { name: "Provider 1" },
      { name: "Provider 2" },
      { name: "Provider 3" },
      { name: "Provider 4" },
      { name: "Provider 5" },
    ]);

    console.log("Providers Seeded");

    const providerIds = providers.map((p) => p._id);

    // Create allocation states
    await AllocationState.insertMany([
      {
        serviceType: "Service 1",
        lastIndex: 0,
        providerPool: providerIds,
      },
      {
        serviceType: "Service 2",
        lastIndex: 0,
        providerPool: providerIds,
      },
      {
        serviceType: "Service 3",
        lastIndex: 0,
        providerPool: providerIds,
      },
    ]);

    console.log("Allocation States Seeded");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seed();