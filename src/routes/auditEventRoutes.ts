import { Router } from "express";
import { createEventsController } from "../controllers/auditControllers.js";

const router = Router();
router.post("/events", createEventsController);

export default router;
