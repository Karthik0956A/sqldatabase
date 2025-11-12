import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { addTime, listTimeEntries, timeSummaryPerSkill } from "../controllers/time.controller.js";

const router = Router();
router.use(requireAuth);

router.post("/:skillId", addTime);
router.get("/", listTimeEntries);
router.get("/summary", timeSummaryPerSkill);

export default router;
