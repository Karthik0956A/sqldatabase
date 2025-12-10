import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "skill_tracker",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected");
    
    // Sync all models with database
    await sequelize.sync({ alter: process.env.NODE_ENV === "development" });
    console.log("✅ Database synced");
  } catch (err) {
    console.error("MySQL error:", err.message);
    process.exit(1);
  }
};

export default sequelize;
