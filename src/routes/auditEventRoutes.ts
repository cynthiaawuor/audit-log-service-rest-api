import { Router } from "express";
import {
  createBulkEventsController,
  createEventsController,
  getEventByIdController,
  getEventsController,
} from "../controllers/auditControllers.js";
import { validateAuditEvent } from "../middlewares/validateAuditEvent.js";
import { bulkInsertSchema, insertAuditSchema } from "../db/zodSchema.js";

const router = Router();
router.post(
  "/events",
  validateAuditEvent(insertAuditSchema),
  createEventsController,
);
router.post(
  "/events/bulk",
  validateAuditEvent(bulkInsertSchema),
  createBulkEventsController,
);
router.get("/events", getEventsController);
router.get("/events/:id", getEventByIdController);

export default router;
