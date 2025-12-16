import sequelize from "../config/db.js";
import User from "../models/User.js";
import Skill from "../models/Skill.js";
import TimeEntry from "../models/TimeEntry.js";

/**
 * Database Query Layer
 * This layer abstracts Sequelize operations to look like raw SQL queries
 */

// ==================== USER QUERIES ====================

export const findUserByEmail = async (email) => {
  console.log(`[SQL] SELECT * FROM users WHERE email = '${email}'`);
  const [results] = await sequelize.query(
    "SELECT * FROM users WHERE email = ?",
    { replacements: [email], type: sequelize.QueryTypes.SELECT, raw: true }
  );
  return results;
};

export const createUser = async ({ name, email, passwordHash }) => {
  console.log(`[SQL] INSERT INTO users (name, email, passwordHash) VALUES ('${name}', '${email}', '***')`);
  const [result] = await sequelize.query(
    "INSERT INTO users (name, email, passwordHash, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())",
    { replacements: [name, email, passwordHash], type: sequelize.QueryTypes.INSERT }
  );
  return { id: result, name, email };
};

export const findUserById = async (id) => {
  console.log(`[SQL] SELECT id, name, email FROM users WHERE id = ${id}`);
  const [result] = await sequelize.query(
    "SELECT id, name, email FROM users WHERE id = ?",
    { replacements: [id], type: sequelize.QueryTypes.SELECT, raw: true }
  );
  return result;
};

// ==================== SKILL QUERIES ====================

export const findAllSkills = async (userId, filters = {}) => {
  let query = "SELECT * FROM skills WHERE userId = ?";
  const replacements = [userId];
  
  if (filters.category) {
    query += " AND category = ?";
    replacements.push(filters.category);
  }
  if (filters.status) {
    query += " AND status = ?";
    replacements.push(filters.status);
  }
  if (filters.search) {
    query += " AND title LIKE ?";
    replacements.push(`%${filters.search}%`);
  }
  
  query += " ORDER BY createdAt DESC";
  
  console.log(`[SQL] ${query}`);
  const results = await sequelize.query(query, {
    replacements,
    type: sequelize.QueryTypes.SELECT,
    raw: true
  });
  return results;
};

export const createSkill = async (skillData) => {
  const { userId, title, category, status, confidence, tags, description, minutesTotal, minutesTarget } = skillData;
  console.log(`[SQL] INSERT INTO skills (userId, title, category, status, confidence, tags, ...) VALUES (${userId}, '${title}', ...)`);
  
  const [result] = await sequelize.query(
    `INSERT INTO skills (userId, title, category, status, confidence, tags, description, minutesTotal, minutesTarget, createdAt, updatedAt) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    {
      replacements: [
        userId,
        title,
        category,
        status || "To Start",
        confidence || 1,
        JSON.stringify(tags || []),
        description || null,
        minutesTotal || 0,
        minutesTarget || 0
      ],
      type: sequelize.QueryTypes.INSERT
    }
  );
  
  return findSkillById(result, userId);
};

export const findSkillById = async (skillId, userId) => {
  console.log(`[SQL] SELECT * FROM skills WHERE id = ${skillId} AND userId = ${userId}`);
  const [result] = await sequelize.query(
    "SELECT * FROM skills WHERE id = ? AND userId = ?",
    { replacements: [skillId, userId], type: sequelize.QueryTypes.SELECT, raw: true }
  );
  return result;
};

export const updateSkill = async (skillId, userId, updates) => {
  const fields = [];
  const replacements = [];
  
  for (const [key, value] of Object.entries(updates)) {
    if (key === "tags") {
      fields.push(`${key} = ?`);
      replacements.push(JSON.stringify(value));
    } else {
      fields.push(`${key} = ?`);
      replacements.push(value);
    }
  }
  
  replacements.push(skillId, userId);
  
  const query = `UPDATE skills SET ${fields.join(", ")}, updatedAt = NOW() WHERE id = ? AND userId = ?`;
  console.log(`[SQL] ${query}`);
  
  await sequelize.query(query, {
    replacements,
    type: sequelize.QueryTypes.UPDATE
  });
  
  return findSkillById(skillId, userId);
};

export const deleteSkill = async (skillId, userId) => {
  console.log(`[SQL] DELETE FROM skills WHERE id = ${skillId} AND userId = ${userId}`);
  const [result] = await sequelize.query(
    "DELETE FROM skills WHERE id = ? AND userId = ?",
    { replacements: [skillId, userId], type: sequelize.QueryTypes.DELETE }
  );
  return result.affectedRows > 0;
};

export const groupSkillsByStatus = async (userId) => {
  console.log(`[SQL] SELECT status, GROUP_CONCAT(id) FROM skills WHERE userId = ${userId} GROUP BY status`);
  const results = await sequelize.query(
    "SELECT * FROM skills WHERE userId = ? ORDER BY createdAt DESC",
    { replacements: [userId], type: sequelize.QueryTypes.SELECT, raw: true }
  );
  
  // Group in JavaScript
  const grouped = results.reduce((acc, skill) => {
    if (!acc[skill.status]) acc[skill.status] = [];
    acc[skill.status].push(skill);
    return acc;
  }, {});
  
  return Object.keys(grouped).map(status => ({
    _id: status,
    items: grouped[status]
  }));
};

export const groupSkillsByCategory = async (userId) => {
  console.log(`[SQL] SELECT category, GROUP_CONCAT(id) FROM skills WHERE userId = ${userId} GROUP BY category`);
  const results = await sequelize.query(
    "SELECT * FROM skills WHERE userId = ? ORDER BY createdAt DESC",
    { replacements: [userId], type: sequelize.QueryTypes.SELECT, raw: true }
  );
  
  const grouped = results.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});
  
  return Object.keys(grouped).map(category => ({
    _id: category,
    items: grouped[category]
  }));
};

export const groupSkillsByConfidence = async (userId) => {
  console.log(`[SQL] SELECT confidence, GROUP_CONCAT(id) FROM skills WHERE userId = ${userId} GROUP BY confidence`);
  const results = await sequelize.query(
    "SELECT * FROM skills WHERE userId = ? ORDER BY createdAt DESC",
    { replacements: [userId], type: sequelize.QueryTypes.SELECT, raw: true }
  );
  
  const grouped = results.reduce((acc, skill) => {
    if (!acc[skill.confidence]) acc[skill.confidence] = [];
    acc[skill.confidence].push(skill);
    return acc;
  }, {});
  
  return Object.keys(grouped).map(confidence => ({
    _id: parseInt(confidence),
    items: grouped[confidence]
  }));
};

// ==================== TIME ENTRY QUERIES ====================

export const createTimeEntry = async ({ userId, skillId, minutes, note, at }) => {
  console.log(`[SQL] INSERT INTO time_entries (userId, skillId, minutes, note, at) VALUES (${userId}, ${skillId}, ${minutes}, ...)`);
  const [result] = await sequelize.query(
    `INSERT INTO time_entries (userId, skillId, minutes, note, at, createdAt, updatedAt) 
     VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
    {
      replacements: [userId, skillId, minutes, note || null, at || new Date()],
      type: sequelize.QueryTypes.INSERT
    }
  );
  
  // Update skill's minutesTotal
  console.log(`[SQL] UPDATE skills SET minutesTotal = minutesTotal + ${minutes} WHERE id = ${skillId}`);
  await sequelize.query(
    "UPDATE skills SET minutesTotal = minutesTotal + ? WHERE id = ?",
    { replacements: [minutes, skillId], type: sequelize.QueryTypes.UPDATE }
  );
  
  const [entry] = await sequelize.query(
    "SELECT * FROM time_entries WHERE id = ?",
    { replacements: [result], type: sequelize.QueryTypes.SELECT, raw: true }
  );
  
  return entry;
};

export const findAllTimeEntries = async (userId, filters = {}) => {
  let query = `
    SELECT te.*, 
           s.title as 'skill.title', 
           s.category as 'skill.category', 
           s.status as 'skill.status', 
           s.confidence as 'skill.confidence'
    FROM time_entries te
    LEFT JOIN skills s ON te.skillId = s.id
    WHERE te.userId = ?
  `;
  const replacements = [userId];
  
  if (filters.from) {
    query += " AND te.at >= ?";
    replacements.push(new Date(filters.from));
  }
  if (filters.to) {
    query += " AND te.at <= ?";
    replacements.push(new Date(filters.to));
  }
  if (filters.skillId) {
    query += " AND te.skillId = ?";
    replacements.push(filters.skillId);
  }
  
  query += " ORDER BY te.at DESC";
  
  console.log(`[SQL] ${query}`);
  const results = await sequelize.query(query, {
    replacements,
    type: sequelize.QueryTypes.SELECT,
    raw: true
  });
  
  // Restructure to match Sequelize include format
  return results.map(row => ({
    id: row.id,
    userId: row.userId,
    skillId: row.skillId,
    minutes: row.minutes,
    note: row.note,
    at: row.at,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    skill: {
      title: row['skill.title'],
      category: row['skill.category'],
      status: row['skill.status'],
      confidence: row['skill.confidence']
    }
  }));
};

export const getTimeSummaryPerSkill = async (userId) => {
  console.log(`[SQL] SELECT id, title, category, status, confidence, minutesTotal, startedAt, nextReviewAt, createdAt FROM skills WHERE userId = ${userId} ORDER BY category, title`);
  const results = await sequelize.query(
    `SELECT id, title, category, status, confidence, minutesTotal, startedAt, nextReviewAt, createdAt 
     FROM skills 
     WHERE userId = ? 
     ORDER BY category ASC, title ASC`,
    { replacements: [userId], type: sequelize.QueryTypes.SELECT, raw: true }
  );
  return results;
};

export const deleteTimeEntriesBySkillId = async (userId, skillId) => {
  console.log(`[SQL] DELETE FROM time_entries WHERE userId = ${userId} AND skillId = ${skillId}`);
  await sequelize.query(
    "DELETE FROM time_entries WHERE userId = ? AND skillId = ?",
    { replacements: [userId, skillId], type: sequelize.QueryTypes.DELETE }
  );
};
