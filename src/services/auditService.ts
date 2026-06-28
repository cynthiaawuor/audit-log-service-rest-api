import { db } from "../db/connection.js";
import { audits } from "../db/schema.js";
import type { InsertAuditEvent } from "../db/zodSchema.js";

export const createAuditEvent = async (data: InsertAuditEvent) => {
  const { actor_id, action, resource_type, resource_id, ip_address } = data;

  const auditEvent: InsertAuditEvent = {
    actor_id,
    action,
    resource_type,
    resource_id,
    ip_address,
  };
  const event = await db.insert(audits).values(auditEvent).returning();
  return event;
};

export const getAuditEvents = async () => {
  try {
    return await db.select().from(audits);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
