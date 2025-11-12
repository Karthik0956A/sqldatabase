import Skill from "../models/Skill.js";
import TimeEntry from "../models/TimeEntry.js";
import mongoose from "mongoose";

export const addTime = async (req, res) => {
  const skill = await Skill.findOne({ _id: req.params.skillId, userId: req.userId });
  if (!skill) return res.sendStatus(404);

  const { minutes, note, at } = req.body;
  const entry = await TimeEntry.create({
    userId: req.userId,
    skillId: skill._id,
    minutes,
    note,
    at
  });

  await Skill.updateOne({ _id: skill._id }, { $inc: { minutesTotal: minutes } });

  res.status(201).json(entry);
};

export const listTimeEntries = async (req, res) => {
  const match = { userId: req.userId };
  if (req.query.from || req.query.to) {
    match.at = {};
    if (req.query.from) match.at.$gte = new Date(req.query.from);
    if (req.query.to) match.at.$lte = new Date(req.query.to);
  }
  if (req.query.skillId) match.skillId = req.query.skillId;

  const rows = await TimeEntry
    .find(match)
    .populate({ path: "skillId", select: "title category status confidence" })
    .sort({ at: -1 });

  res.json(rows);
};

export const timeSummaryPerSkill = async (req, res) => {
  const rows = await Skill.aggregate([
   { $match: { userId: new mongoose.Types.ObjectId(req.userId) } },
    { $project: {
        title: 1, category: 1, status: 1, confidence: 1,
        minutesTotal: 1, startedAt: 1, nextReviewAt: 1, createdAt: 1
    }},
    { $sort: { category: 1, title: 1 } }
  ]);
  res.json(rows);
};
