import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const Skill = sequelize.define("Skill", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id"
    },
    onDelete: "CASCADE"
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "To Start",
    validate: {
      notEmpty: true
    }
  },
  confidence: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 5
    }
  },
  tags: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  startedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  nextReviewAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  minutesTotal: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  minutesTarget: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true,
  tableName: "skills",
  indexes: [
    { fields: ["userId"] },
    { fields: ["userId", "category"] },
    { fields: ["userId", "status"] },
    { fields: ["userId", "confidence"] },
    { fields: ["status"] },
    { fields: ["confidence"] }
  ]
});

// Define associations
Skill.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Skill, { foreignKey: "userId", as: "skills" });

export default Skill;
