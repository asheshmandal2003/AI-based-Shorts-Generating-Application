import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const dbURL = process.env.DATABASE_URL;
const sql = neon(dbURL);
export const db = drizzle({ client: sql });
