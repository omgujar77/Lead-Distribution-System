import mongoose from "mongoose";

const allocationStateSchema = new mongoose.Schema(
  {
    serviceType: {
      type: String,
      required: true,
      unique: true,
    },

    lastIndex: {
      type: Number,
      default: 0,
    },

    providerPool: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AllocationState ||
  mongoose.model("AllocationState", allocationStateSchema);