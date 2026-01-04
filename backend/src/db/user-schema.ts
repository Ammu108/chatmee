import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  profilePicture: varchar("profile_picture", { length: 255 }).notNull(),
  createdAt: varchar("created_at", { length: 255 }).notNull(),
  updatedAt: varchar("updated_at", { length: 255 }).notNull(),
});
