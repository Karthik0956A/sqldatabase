import Skill from "../models/Skill.js";
import TimeEntry from "../models/TimeEntry.js";
import mongoose from "mongoose";

export const listSkills = async (req, res) => {
  const q = { userId: req.userId };

  if (req.query.tag) q.tags = req.query.tag;
  if (req.query.category) q.category = req.query.category;
  if (req.query.status) q.status = req.query.status;
  if (req.query.search) q.title = { $regex: req.query.search, $options: "i" };

  const skills = await Skill.find(q).sort({ createdAt: -1 });
  res.json(skills);
};

export const createSkill = async (req, res) => {
  const body = { ...req.body, userId: req.userId };
  const skill = await Skill.create(body);
  res.status(201).json(skill);
};

export const updateSkill = async (req, res) => {
  const skill = await Skill.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  if (!skill) return res.sendStatus(404);
  res.json(skill);
};

export const deleteSkill = async (req, res) => {
  const skill = await Skill.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  if (!skill) return res.sendStatus(404);
  await TimeEntry.deleteMany({ userId: req.userId, skillId: skill._id });
  res.sendStatus(204);
};

// groupings for tabs
export const groupByStatus = async (req, res) => {
  const rows = await Skill.aggregate([
  { $match: { userId: new mongoose.Types.ObjectId(req.userId) } },
    { $sort: { createdAt: -1 } },
    { $group: { _id: "$status", items: { $push: "$$ROOT" } } }
  ]);
  res.json(rows);
};

export const groupByCategory = async (req, res) => {
  const rows = await Skill.aggregate([
   { $match: { userId: new mongoose.Types.ObjectId(req.userId) } },
    { $sort: { createdAt: -1 } },
    { $group: { _id: "$category", items: { $push: "$$ROOT" } } }
  ]);
  res.json(rows);
};

export const groupByConfidence = async (req, res) => {
  const rows = await Skill.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(req.userId) } },
    { $sort: { createdAt: -1 } },
    { $group: { _id: "$confidence", items: { $push: "$$ROOT" } } }
  ]);
  res.json(rows);
};
