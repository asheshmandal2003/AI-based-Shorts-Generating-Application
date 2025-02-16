import {
  boolean,
  index,
  json,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

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

export const Video = pgTable("video", {
  id: serial("id").primaryKey(),
  videoScript: json("script").notNull(),
  audioURL: varchar("audio_url").notNull(),
  captions: json("captions").notNull(),
  images: varchar("images").array(),
  author: varchar("author").notNull(),
});
