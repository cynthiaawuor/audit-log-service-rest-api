import type { Request, Response } from "express";
import { db } from "../db/connection.js";
import { audits } from "../db/schema.js";
import type { AuditEvent } from "../types/auditEvent.js";

export const createAuditEvent = async (req: Request, res: Response) => {
  try {
    const { actor_id, action, resource_type, resource_id } = req.body;

    const auditEvent: AuditEvent = {
      actor_id,
      action,
      resource_type,
      resource_id,
    };
    const event = await db.insert(audits).values(auditEvent).returning();
    //change with dynamic response messages zod error messages
    return res.status(201).json({
      ok: true,
      event: event,
    });
  } catch (err) {
    return res.status(400).json({
      ok: false,
      event: null,
      //replace with dynamic error for specific error messages
      errors: [
        {
          field: "actor_id",
          message: "actor_id is required.",
          code: "MISSING_FIELD",
        },
      ],
    });
  }
};
