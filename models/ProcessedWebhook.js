import mongoose from "mongoose";

const processedWebhookSchema = new mongoose.Schema(
  {
    webhookId: {
      type: String,
      required: true,
      unique: true,
    },

    processedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ProcessedWebhook ||
  mongoose.model("ProcessedWebhook", processedWebhookSchema);