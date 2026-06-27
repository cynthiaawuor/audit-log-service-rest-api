import type { Request, Response } from "express";
import { db } from "../db/connection.js";
import { audits } from "../db/schema.js";
import type { AuditEvent } from "../types/auditEvent.js";

export const createAuditEvent = async (data: AuditEvent) => {
  const { actor_id, action, resource_type, resource_id } = data;

  if (!actor_id || !action || !resource_type || !resource_id) {
    const error: any = new Error("Validation failed");
    error.status = 400;
    error.errors = [
      {
        field: !actor_id
          ? "actor_id"
          : !action
            ? "action"
            : !resource_type
              ? "resource_type"
              : "resource_id",
        message: "Field is required.",
        code: "MISSING_FIELD",
      },
    ];
    throw error;
  }

  const auditEvent: AuditEvent = {
    actor_id,
    action,
    resource_type,
    resource_id,
  };
  const event = await db.insert(audits).values(auditEvent).returning();
  return event;
};
