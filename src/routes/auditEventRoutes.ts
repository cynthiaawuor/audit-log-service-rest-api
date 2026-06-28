import { Router } from "express";
import { createEventsController } from "../controllers/auditControllers.js";
import { validateAuditEvent } from "../middlewares/validateAuditEvent.js";
import { insertAuditSchema } from "../db/zodSchema.js";

const router = Router();
router.post(
  "/events",
  validateAuditEvent(insertAuditSchema),
  createEventsController,
);

export default router;
