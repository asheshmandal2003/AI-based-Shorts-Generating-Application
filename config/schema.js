import { boolean, index, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    email: varchar("email").unique().notNull(),
    imageUrl: varchar("image_url"),
    subscription: boolean("subscription").default(false),
  },
  (table) => {
    return {
      emailIdx: index("email_idx").on(table.email),
    };
  }
);
