import "dotenv/config";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { audits } from "./schema.js";

const ACTIONS = ["create", "update", "delete", "login", "logout", "view"];
const RESOURCE_TYPES = ["user", "order", "invoice", "session", "document"];

function pick<T>(arr: T[], i: number): T {
  return arr[i % arr.length];
}

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle({ client: pool });

  const actorIds = Array.from({ length: 10 }, () => randomUUID());

  // Spread timestamps randomly from Jan 1 2025 to Dec 31 2026.
  const rangeStart = Date.UTC(2025, 0, 1);
  const rangeEnd = Date.UTC(2026, 11, 31, 23, 59, 59);
  const randomTimestamp = () =>
    new Date(rangeStart + Math.random() * (rangeEnd - rangeStart));

  const rows = Array.from({ length: 75 }, (_, i) => {
    const action = pick(ACTIONS, i);
    const resourceType = pick(RESOURCE_TYPES, i);
    const before =
      action === "create" ? null : JSON.stringify({ status: "old", v: i });
    const after =
      action === "delete" ? null : JSON.stringify({ status: "new", v: i + 1 });
    return {
      actor_id: pick(actorIds, i),
      action,
      resource_type: resourceType,
      resource_id: String(1000 + i),
      before_state: before,
      after_state: after,
      ip_address: `192.168.${i % 256}.${(i * 7) % 256}`,
      user_agent: "seed-script/1.0",
      timestamp: randomTimestamp(),
    };
  });

  const inserted = await db
    .insert(audits)
    .values(rows)
    .returning({ id: audits.id });
  console.log(`Seeded ${inserted.length} events.`);

  await pool.end();
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
