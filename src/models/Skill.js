import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },

    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },    // user-defined (Backend/Mobile/etc.)
    status: { type: String, required: true, trim: true, default: "To Start", index: true }, // “In Progress”, “Mastered”, etc.

    confidence: { type: Number, min: 1, max: 5, default: 1, index: true },
    tags: [{ type: String, trim: true, index: true }],

    description: String,
    startedAt: Date,
    nextReviewAt: Date,

    minutesTotal: { type: Number, default: 0 }, // denormalized sum of time entries
    minutesTarget: { type: Number, default: 0 }
  },
  { timestamps: true }
);

// helpful compound indexes for fast filtering/grouping
SkillSchema.index({ userId: 1, category: 1 });
SkillSchema.index({ userId: 1, status: 1 });
SkillSchema.index({ userId: 1, confidence: 1 });
SkillSchema.index({ userId: 1, tags: 1 });

export default mongoose.model("Skill", SkillSchema);
