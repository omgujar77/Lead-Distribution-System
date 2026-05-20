import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    quotaRemaining: {
      type: Number,
      default: 10,
    },

    totalAssigned: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Provider ||
  mongoose.model("Provider", providerSchema);