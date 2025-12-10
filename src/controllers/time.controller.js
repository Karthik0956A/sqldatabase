import Skill from "../models/Skill.js";
import TimeEntry from "../models/TimeEntry.js";
import sequelize from "../config/db.js";
import { Op } from "sequelize";

export const addTime = async (req, res) => {
  try {
    const skill = await Skill.findOne({
      where: { id: req.params.skillId, userId: req.userId }
    });
    
    if (!skill) {
      return res.sendStatus(404);
    }

    const { minutes, note, at } = req.body;
    const entry = await TimeEntry.create({
      userId: req.userId,
      skillId: skill.id,
      minutes,
      note,
      at
    });

    // Update skill's total minutes
    await skill.increment("minutesTotal", { by: minutes });

    res.status(201).json(entry);
  } catch (error) {
    console.error("Add time error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const listTimeEntries = async (req, res) => {
  try {
    const where = { userId: req.userId };
    
    if (req.query.from || req.query.to) {
      where.at = {};
      if (req.query.from) {
        where.at[Op.gte] = new Date(req.query.from);
      }
      if (req.query.to) {
        where.at[Op.lte] = new Date(req.query.to);
      }
    }
    if (req.query.skillId) {
      where.skillId = req.query.skillId;
    }

    const rows = await TimeEntry.findAll({
      where,
      include: [
        {
          model: Skill,
          as: "skill",
          attributes: ["title", "category", "status", "confidence"]
        }
      ],
      order: [["at", "DESC"]]
    });

    res.json(rows);
  } catch (error) {
    console.error("List time entries error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const timeSummaryPerSkill = async (req, res) => {
  try {
    const skills = await Skill.findAll({
      where: { userId: req.userId },
      attributes: [
        "id",
        "title",
        "category",
        "status",
        "confidence",
        "minutesTotal",
        "startedAt",
        "nextReviewAt",
        "createdAt"
      ],
      order: [
        ["category", "ASC"],
        ["title", "ASC"]
      ]
    });

    res.json(skills);
  } catch (error) {
    console.error("Time summary error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
