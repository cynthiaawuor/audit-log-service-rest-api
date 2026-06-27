import type { Request, Response } from "express";
import * as auditEventService from "../services/auditService.js";

export const createEventsController = async (req: Request, res: Response) => {
  try {
    const event = await auditEventService.createAuditEvent(req.body);
    return res.status(201).json({ ok: true, event: event });
  } catch (err: any) {
    return res.status(err.status).json({
      ok: false,
      event: null,
      errors: err.errors,
    });
  }
};
