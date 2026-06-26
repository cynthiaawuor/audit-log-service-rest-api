import { Router } from "express";
import { createAuditEvents } from "../controllers/auditControllers.js";

const router = Router();
router.post("/events", createAuditEvents);

export default router;
