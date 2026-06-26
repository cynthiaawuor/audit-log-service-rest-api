import type { Request, Response } from "express";
import * as auditEventService from "../services/auditService.js";

export const createAuditEvents = async (req: Request, res: Response) => {
  try {
    const event = await auditEventService.createAuditEvent(req.body);
    res.json({ success: true, data: event });
  } catch (err) {
    res.json({ message: "Could not create user" });
  }
};
