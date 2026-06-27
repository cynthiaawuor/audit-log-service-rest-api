import { integer, uuid, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const audits = pgTable("events", {
  // id: uuid("id").primaryKey(),
  actor_id: varchar({ length: 255 }).notNull(),
  action: varchar({ length: 255 }),
  resource_type: varchar({ length: 255 }),
  resource_id: varchar({ length: 255 }).notNull(),
  before_state: varchar(),
  after_state: varchar(),
  ip_address: varchar(),
  user_agent: varchar(),
});
