import mongoose from "mongoose";

const TimeEntrySchema = new mongoose.Schema(
  {
    userId:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    skillId: { type: mongoose.Schema.Types.ObjectId, ref: "Skill", required: true, index: true },
    minutes: { type: Number, required: true, min: 1 },
    note:    { type: String, trim: true },
    at:      { type: Date, default: Date.now, index: true }
  },
  { timestamps: true }
);

TimeEntrySchema.index({ userId: 1, skillId: 1, at: -1 });

export default mongoose.model("TimeEntry", TimeEntrySchema);
