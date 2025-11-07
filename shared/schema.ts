import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  category: text("category").notNull(),
  message: text("message"),
  status: text("status").default("pending").notNull(), // pending, responded, archived
  respondedAt: timestamp("responded_at"),
  respondedBy: text("responded_by"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogArticles = pgTable("blog_articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // students, graduates, professionals
  readTime: text("read_time").notNull(),
  content: text("content"), // full article content (optional for now)
  imageUrl: text("image_url"), // featured image for article
  published: timestamp("published").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role").notNull(),
  quote: text("quote").notNull(),
  initial: text("initial").notNull(),
  gradient: text("gradient").notNull(), // CSS gradient class
  imageUrl: text("image_url"), // profile/avatar image
  featured: timestamp("featured"), // when testimonial was featured (for ordering)
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const packages = pgTable("packages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  features: text("features").array().notNull(),
  category: text("category").notNull(), // 8-9-students, 10-12-students, college-graduates, working-professionals
  isPopular: boolean("is_popular").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const customizePlans = pgTable("customize_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  priceType: text("price_type").default("one-time").notNull(), // one-time, monthly, per-interaction
  duration: text("duration"), // e.g., "1 hour", "per month", etc.
  isActive: boolean("is_active").default(true).notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  packageId: varchar("package_id").references(() => packages.id),
  customizePlanId: varchar("customize_plan_id").references(() => customizePlans.id),
  planType: text("plan_type").default("package"), // "package" or "customize"
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("INR").notNull(),
  status: text("status").default("pending").notNull(), // pending, success, failed, refunded
  razorpayOrderId: text("razorpay_order_id"),
  razorpayPaymentId: text("razorpay_payment_id"),
  razorpaySignature: text("razorpay_signature"),
  paymentMethod: text("payment_method"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  paidAt: timestamp("paid_at"),
});

export const adminUsers = pgTable("admin_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("admin").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const photoGallery = pgTable("photo_gallery", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  displayOrder: integer("display_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const workshopBookings = pgTable("workshop_bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  schoolName: text("school_name").notNull(),
  principalName: text("principal_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  numberOfStudents: integer("number_of_students"),
  preferredDate: text("preferred_date"),
  message: text("message"),
  status: text("status").default("pending").notNull(), // pending, contacted, confirmed, completed, cancelled
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
  status: true,
  respondedAt: true,
  respondedBy: true,
  adminNotes: true,
});

export const insertBlogArticleSchema = createInsertSchema(blogArticles).omit({
  id: true,
  createdAt: true,
  published: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

// Define valid package categories
export const packageCategoryEnum = z.enum([
  "8-9-students",
  "10-12-students", 
  "college-graduates",
  "working-professionals"
]);

export const insertPackageSchema = createInsertSchema(packages).omit({
  id: true,
  createdAt: true,
}).extend({
  category: packageCategoryEnum,
});

export const insertCustomizePlanSchema = createInsertSchema(customizePlans).omit({
  id: true,
  createdAt: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
  paidAt: true,
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({
  id: true,
  createdAt: true,
  lastLogin: true,
});

export const insertPhotoGallerySchema = createInsertSchema(photoGallery).omit({
  id: true,
  createdAt: true,
});

export const insertWorkshopBookingSchema = createInsertSchema(workshopBookings).omit({
  id: true,
  createdAt: true,
  status: true,
  adminNotes: true,
});

export const updateContactStatusSchema = z.object({
  status: z.enum(["pending", "responded", "archived"]),
  adminNotes: z.string().optional(),
  respondedBy: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertBlogArticle = z.infer<typeof insertBlogArticleSchema>;
export type BlogArticle = typeof blogArticles.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type Package = typeof packages.$inferSelect;
export type InsertCustomizePlan = z.infer<typeof insertCustomizePlanSchema>;
export type CustomizePlan = typeof customizePlans.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertPhotoGallery = z.infer<typeof insertPhotoGallerySchema>;
export type PhotoGallery = typeof photoGallery.$inferSelect;
export type InsertWorkshopBooking = z.infer<typeof insertWorkshopBookingSchema>;
export type WorkshopBooking = typeof workshopBookings.$inferSelect;
export type UpdateContactStatus = z.infer<typeof updateContactStatusSchema>;
