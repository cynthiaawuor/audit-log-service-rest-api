import { createInsertSchema } from "drizzle-zod";
import { audits } from "../db/schema.js";
import z from "zod";

export const insertAuditSchema = createInsertSchema(audits, {
  actor_id: (schema) => schema.min(1, "actor_id is required"),
  action: () => z.string({ error: "action must be a string." }),
  resource_type: () => z.string({ error: "resource_type must be a string." }),
  resource_id: () =>
    z
      .string({ error: "resource_id must be a string." })
      .min(1, "resource_id is required."),
  before_state: () =>
    z.string({ error: "before_state must be a string." }).optional(),
  after_state: () =>
    z.string({ error: "after_state must be a string." }).optional(),
  ip_address: () => z.ipv4().optional(),
  user_agent: () =>
    z.string({ error: "user_agent must be a string." }).optional(),
}).omit({ timestamp: true, id: true });

export type InsertAuditEvent = z.infer<typeof insertAuditSchema>;
