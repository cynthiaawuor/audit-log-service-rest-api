import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema.js";
import postgres from "postgres";

const queryClient = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client: queryClient, schema });
