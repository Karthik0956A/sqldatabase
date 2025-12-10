import Skill from "../models/Skill.js";
import TimeEntry from "../models/TimeEntry.js";
import sequelize from "../config/db.js";
import { Op } from "sequelize";

export const listSkills = async (req, res) => {
  try {
    const where = { userId: req.userId };

    if (req.query.tag) {
      where.tags = { [Op.like]: `%${req.query.tag}%` };
    }
    if (req.query.category) {
      where.category = req.query.category;
    }
    if (req.query.status) {
      where.status = req.query.status;
    }
    if (req.query.search) {
      where.title = { [Op.like]: `%${req.query.search}%` };
    }

    const skills = await Skill.findAll({
      where,
      order: [["createdAt", "DESC"]]
    });
    res.json(skills);
  } catch (error) {
    console.error("List skills error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createSkill = async (req, res) => {
  try {
    const body = { ...req.body, userId: req.userId };
    const skill = await Skill.create(body);
    res.status(201).json(skill);
  } catch (error) {
    console.error("Create skill error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findOne({
      where: { id: req.params.id, userId: req.userId }
    });
    
    if (!skill) {
      return res.sendStatus(404);
    }

    await skill.update(req.body);
    res.json(skill);
  } catch (error) {
    console.error("Update skill error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const deleted = await Skill.destroy({
      where: { id: req.params.id, userId: req.userId }
    });
    
    if (deleted === 0) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Delete skill error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// groupings for tabs
export const groupByStatus = async (req, res) => {
  try {
    const skills = await Skill.findAll({
      where: { userId: req.userId },
      order: [["createdAt", "DESC"]],
      raw: true
    });

    // Group by status in JavaScript
    const grouped = skills.reduce((acc, skill) => {
      const status = skill.status;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(skill);
      return acc;
    }, {});

    // Convert to array format like MongoDB aggregate
    const rows = Object.keys(grouped).map(status => ({
      _id: status,
      items: grouped[status]
    }));

    res.json(rows);
  } catch (error) {
    console.error("Group by status error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const groupByCategory = async (req, res) => {
  try {
    const skills = await Skill.findAll({
      where: { userId: req.userId },
      order: [["createdAt", "DESC"]],
      raw: true
    });

    // Group by category in JavaScript
    const grouped = skills.reduce((acc, skill) => {
      const category = skill.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {});

    // Convert to array format like MongoDB aggregate
    const rows = Object.keys(grouped).map(category => ({
      _id: category,
      items: grouped[category]
    }));

    res.json(rows);
  } catch (error) {
    console.error("Group by category error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const groupByConfidence = async (req, res) => {
  try {
    const skills = await Skill.findAll({
      where: { userId: req.userId },
      order: [["createdAt", "DESC"]],
      raw: true
    });

    // Group by confidence in JavaScript
    const grouped = skills.reduce((acc, skill) => {
      const confidence = skill.confidence;
      if (!acc[confidence]) {
        acc[confidence] = [];
      }
      acc[confidence].push(skill);
      return acc;
    }, {});

    // Convert to array format like MongoDB aggregate
    const rows = Object.keys(grouped).map(confidence => ({
      _id: parseInt(confidence),
      items: grouped[confidence]
    }));

    res.json(rows);
  } catch (error) {
    console.error("Group by confidence error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
