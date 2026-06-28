import { integer, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const audits = pgTable("events", {
  id: integer().generatedByDefaultAsIdentity().primaryKey(),
  actor_id: varchar({ length: 255 }).notNull(),
  action: varchar({ length: 255 }).notNull(),
  resource_type: varchar({ length: 255 }).notNull(),
  resource_id: varchar({ length: 255 }).notNull(),
  before_state: varchar(),
  after_state: varchar(),
  ip_address: varchar(),
  user_agent: varchar(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});
