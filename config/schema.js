import {
  boolean,
  index,
  integer,
  json,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const Users = pgTable(
  "users",
  {
    id: varchar("id").primaryKey(),
    name: varchar("name").notNull(),
    email: varchar("email").unique().notNull(),
    imageUrl: varchar("image_url"),
    subscription: boolean("subscription").default(false),
    credits: integer("credits").default(30),
  },
  (table) => {
    return {
      emailIdx: index("email_idx").on(table.email),
    };
  }
);

export const Video = pgTable("video", {
  id: serial("id").primaryKey(),
  audioURL: varchar("audio_url").notNull(),
  captions: json("captions").notNull(),
  images: varchar("images").array(),
  author: varchar("author").notNull(),
});
