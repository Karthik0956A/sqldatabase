import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  listSkills, createSkill, updateSkill, deleteSkill,
  groupByStatus, groupByCategory, groupByConfidence
} from "../controllers/skills.controller.js";

const router = Router();
router.use(requireAuth);

router.get("/", listSkills);
router.post("/", createSkill);
router.patch("/:id", updateSkill);
router.delete("/:id", deleteSkill);

router.get("/group/status", groupByStatus);
router.get("/group/category", groupByCategory);
router.get("/group/confidence", groupByConfidence);

export default router;
