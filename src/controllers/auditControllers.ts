import type { Request, Response } from "express";
import * as auditEventService from "../services/auditService.js";

export const createEventsController = async (req: Request, res: Response) => {
  try {
    const event = await auditEventService.createAuditEvent(req.body, res);
    return res.json({ success: true, data: event });
  } catch (err) {
    return res.json({ message: "Could not create user" });
  }
};
