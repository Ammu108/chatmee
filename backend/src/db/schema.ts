import { boolean, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// =================== User Table Schema ===================

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  usernameNormalized: varchar("usernameNormalized", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: varchar("created_at", { length: 255 }).notNull(),
  updatedAt: varchar("updated_at", { length: 255 }).notNull(),
});

// =================== Converstations schema ( One to One ) ===================

export const conversationTable = pgTable("conversations", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_one_id: uuid("user_one_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  user_two_id: uuid("user_two_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  lastMessage: text("last_message"),
  lastMessageAt: timestamp("last_message_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .notNull(),
});

// =================== Mesages schema ( One to One ) ===================

export const messageTable = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  conversation_id: uuid("conversation_id")
    .references(() => conversationTable.id, { onDelete: "cascade" })
    .notNull(),
  sender_id: uuid("sender_id")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
