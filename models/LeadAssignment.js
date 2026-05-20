import mongoose from "mongoose";

const leadAssignmentSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },

    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },

    assignedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
  
  
);
leadAssignmentSchema.index(
  {
    leadId: 1,
    providerId: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.models.LeadAssignment ||
  mongoose.model("LeadAssignment", leadAssignmentSchema);