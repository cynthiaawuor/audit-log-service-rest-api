import type { AuditEvent } from "../types/auditEvent.js";

const auditEvents: AuditEvent[] = [];

export const createAuditEvent = (body: AuditEvent) => {
  //TODO:Replace with prisma DB logic
  const { actor_id, action, resource_type, resource_id } = body;
  const auditEvent: AuditEvent = {
    actor_id,
    action,
    resource_type,
    resource_id,
  };
  auditEvents.push(auditEvent);
  return {
    success: true,
    data: auditEvent,
  };
};

const sampleAuditEvent: AuditEvent = {
  actor_id: "usr_01J2X4M7P9A",
  action: "delete",
  resource_type: "invoice",
  resource_id: "inv_2026_08942",
};
console.log(createAuditEvent(sampleAuditEvent));
