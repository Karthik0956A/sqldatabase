import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import Skill from "./Skill.js";

const TimeEntry = sequelize.define("TimeEntry", {
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
  skillId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "skills",
      key: "id"
    },
    onDelete: "CASCADE"
  },
  minutes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
  tableName: "time_entries",
  indexes: [
    { fields: ["userId"] },
    { fields: ["skillId"] },
    { fields: ["at"] },
    { fields: ["userId", "skillId", "at"] }
  ]
});

// Define associations
TimeEntry.belongsTo(User, { foreignKey: "userId", as: "user" });
TimeEntry.belongsTo(Skill, { foreignKey: "skillId", as: "skill" });
User.hasMany(TimeEntry, { foreignKey: "userId", as: "timeEntries" });
Skill.hasMany(TimeEntry, { foreignKey: "skillId", as: "timeEntries" });

export default TimeEntry;
