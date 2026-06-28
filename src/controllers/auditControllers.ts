import type { Request, Response } from "express";
import * as auditEventService from "../services/auditService.js";

export const createEventsController = async (req: Request, res: Response) => {
  try {
    //TODO: Add ip_address and user_agent to the db without the user having to add them
    const ipAddress = req.ip;
    const userAgent = req.get("user-agent");
    const event = await auditEventService.createAuditEvent(req.body);
    return res.status(201).json({
      ok: true,
      payload: event,
      errors: [],
    });
  } catch (err) {
    throw err;
  }
};

export const getEventsController = async (req: Request, res: Response) => {
  const events = await auditEventService.getAuditEvents();
  return res.status(201).json(events);
};
