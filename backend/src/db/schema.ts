import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// =================== User Table Schema ===================

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: varchar("created_at", { length: 255 }).notNull(),
  updatedAt: varchar("updated_at", { length: 255 }).notNull(),
});

// =================== User chat Mesages schema ( One to One ) ===================

export const messageTable = pgTable("message", {
  id: uuid("id").primaryKey().defaultRandom(),
  sender_id: uuid("sender_id")
    .references(() => userTable.id)
    .notNull(),
  receiver_id: uuid("receiver_id")
    .references(() => userTable.id)
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
