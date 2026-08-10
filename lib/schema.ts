import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";

export const rsvps = pgTable("founders_table_rsvps", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  businessName: text("business_name").notNull(),
  role: text("role").notNull(),
  industry: text("industry").notNull(),
  motivation: text("motivation").notNull(),
  heardFrom: text("heard_from").notNull(),
  approved: boolean("approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
