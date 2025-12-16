import * as db from "../db/queries.js";

/**
 * Example Controller using Raw SQL Query Layer
 * This demonstrates how to use the query layer instead of Sequelize directly
 */

// ==================== AUTH EXAMPLES ====================

export const registerWithRawSQL = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await db.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }
    
    // Hash password
    const bcrypt = await import("bcryptjs");
    const passwordHash = await bcrypt.default.hash(password, 10);
    
    // Create user
    const user = await db.createUser({ name, email, passwordHash });
    
    // Generate token
    const { signToken } = await import("../utils/jwt.js");
    const token = signToken({ id: user.id });
    
    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==================== SKILLS EXAMPLES ====================

export const listSkillsWithRawSQL = async (req, res) => {
  try {
    const filters = {
      category: req.query.category,
      status: req.query.status,
      search: req.query.search
    };
    
    const skills = await db.findAllSkills(req.userId, filters);
    res.json(skills);
  } catch (error) {
    console.error("List skills error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createSkillWithRawSQL = async (req, res) => {
  try {
    const skillData = { ...req.body, userId: req.userId };
    const skill = await db.createSkill(skillData);
    res.status(201).json(skill);
  } catch (error) {
    console.error("Create skill error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSkillWithRawSQL = async (req, res) => {
  try {
    const skill = await db.findSkillById(req.params.id, req.userId);
    if (!skill) {
      return res.sendStatus(404);
    }
    
    const updated = await db.updateSkill(req.params.id, req.userId, req.body);
    res.json(updated);
  } catch (error) {
    console.error("Update skill error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteSkillWithRawSQL = async (req, res) => {
  try {
    // Delete associated time entries first
    await db.deleteTimeEntriesBySkillId(req.userId, req.params.id);
    
    // Delete skill
    const deleted = await db.deleteSkill(req.params.id, req.userId);
    if (!deleted) {
      return res.sendStatus(404);
    }
    
    res.sendStatus(204);
  } catch (error) {
    console.error("Delete skill error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const groupByStatusWithRawSQL = async (req, res) => {
  try {
    const groups = await db.groupSkillsByStatus(req.userId);
    res.json(groups);
  } catch (error) {
    console.error("Group by status error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const groupByCategoryWithRawSQL = async (req, res) => {
  try {
    const groups = await db.groupSkillsByCategory(req.userId);
    res.json(groups);
  } catch (error) {
    console.error("Group by category error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const groupByConfidenceWithRawSQL = async (req, res) => {
  try {
    const groups = await db.groupSkillsByConfidence(req.userId);
    res.json(groups);
  } catch (error) {
    console.error("Group by confidence error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ==================== TIME TRACKING EXAMPLES ====================

export const addTimeWithRawSQL = async (req, res) => {
  try {
    const skill = await db.findSkillById(req.params.skillId, req.userId);
    if (!skill) {
      return res.sendStatus(404);
    }
    
    const { minutes, note, at } = req.body;
    const entry = await db.createTimeEntry({
      userId: req.userId,
      skillId: skill.id,
      minutes,
      note,
      at
    });
    
    res.status(201).json(entry);
  } catch (error) {
    console.error("Add time error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const listTimeEntriesWithRawSQL = async (req, res) => {
  try {
    const filters = {
      from: req.query.from,
      to: req.query.to,
      skillId: req.query.skillId
    };
    
    const entries = await db.findAllTimeEntries(req.userId, filters);
    res.json(entries);
  } catch (error) {
    console.error("List time entries error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const timeSummaryWithRawSQL = async (req, res) => {
  try {
    const summary = await db.getTimeSummaryPerSkill(req.userId);
    res.json(summary);
  } catch (error) {
    console.error("Time summary error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
