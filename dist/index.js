var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  adminUsers: () => adminUsers,
  blogArticles: () => blogArticles,
  contactSubmissions: () => contactSubmissions,
  customizePlans: () => customizePlans,
  insertAdminUserSchema: () => insertAdminUserSchema,
  insertBlogArticleSchema: () => insertBlogArticleSchema,
  insertContactSchema: () => insertContactSchema,
  insertCustomizePlanSchema: () => insertCustomizePlanSchema,
  insertPackageSchema: () => insertPackageSchema,
  insertPaymentSchema: () => insertPaymentSchema,
  insertPhotoGallerySchema: () => insertPhotoGallerySchema,
  insertTestimonialSchema: () => insertTestimonialSchema,
  insertUserSchema: () => insertUserSchema,
  insertWorkshopBookingSchema: () => insertWorkshopBookingSchema,
  packageCategoryEnum: () => packageCategoryEnum,
  packages: () => packages,
  payments: () => payments,
  photoGallery: () => photoGallery,
  testimonials: () => testimonials,
  updateContactStatusSchema: () => updateContactStatusSchema,
  users: () => users,
  workshopBookings: () => workshopBookings
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users, contactSubmissions, blogArticles, testimonials, packages, customizePlans, payments, adminUsers, photoGallery, workshopBookings, insertUserSchema, insertContactSchema, insertBlogArticleSchema, insertTestimonialSchema, packageCategoryEnum, insertPackageSchema, insertCustomizePlanSchema, insertPaymentSchema, insertAdminUserSchema, insertPhotoGallerySchema, insertWorkshopBookingSchema, updateContactStatusSchema;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    users = pgTable("users", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      username: text("username").notNull().unique(),
      password: text("password").notNull()
    });
    contactSubmissions = pgTable("contact_submissions", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      email: text("email").notNull(),
      phone: text("phone").notNull(),
      category: text("category").notNull(),
      message: text("message"),
      status: text("status").default("pending").notNull(),
      // pending, responded, archived
      respondedAt: timestamp("responded_at"),
      respondedBy: text("responded_by"),
      adminNotes: text("admin_notes"),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    blogArticles = pgTable("blog_articles", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      title: text("title").notNull(),
      description: text("description").notNull(),
      category: text("category").notNull(),
      // students, graduates, professionals
      readTime: text("read_time").notNull(),
      content: text("content"),
      // full article content (optional for now)
      imageUrl: text("image_url"),
      // featured image for article
      videoUrl: text("video_url"),
      // YouTube/Vimeo video URL (optional)
      published: timestamp("published").defaultNow().notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    testimonials = pgTable("testimonials", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      role: text("role").notNull(),
      quote: text("quote").notNull(),
      initial: text("initial").notNull(),
      gradient: text("gradient").notNull(),
      // CSS gradient class
      imageUrl: text("image_url"),
      // profile/avatar image
      featured: timestamp("featured"),
      // when testimonial was featured (for ordering)
      isActive: boolean("is_active").default(true).notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    packages = pgTable("packages", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      description: text("description").notNull(),
      price: numeric("price", { precision: 10, scale: 2 }).notNull(),
      features: text("features").array().notNull(),
      category: text("category").notNull(),
      // 8-9-students, 10-12-students, college-graduates, working-professionals
      isPopular: boolean("is_popular").default(false).notNull(),
      isActive: boolean("is_active").default(true).notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    customizePlans = pgTable("customize_plans", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      name: text("name").notNull(),
      description: text("description").notNull(),
      price: numeric("price", { precision: 10, scale: 2 }).notNull(),
      priceType: text("price_type").default("one-time").notNull(),
      // one-time, monthly, per-interaction
      duration: text("duration"),
      // e.g., "1 hour", "per month", etc.
      isActive: boolean("is_active").default(true).notNull(),
      displayOrder: integer("display_order").default(0).notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    payments = pgTable("payments", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      packageId: varchar("package_id").references(() => packages.id),
      customizePlanId: varchar("customize_plan_id").references(() => customizePlans.id),
      planType: text("plan_type").default("package"),
      // "package" or "customize"
      customerName: text("customer_name").notNull(),
      customerEmail: text("customer_email").notNull(),
      customerPhone: text("customer_phone").notNull(),
      amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
      currency: text("currency").default("INR").notNull(),
      status: text("status").default("pending").notNull(),
      // pending, success, failed, refunded
      razorpayOrderId: text("razorpay_order_id"),
      razorpayPaymentId: text("razorpay_payment_id"),
      razorpaySignature: text("razorpay_signature"),
      paymentMethod: text("payment_method"),
      notes: text("notes"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      paidAt: timestamp("paid_at")
    });
    adminUsers = pgTable("admin_users", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      username: text("username").notNull().unique(),
      email: text("email").notNull().unique(),
      password: text("password").notNull(),
      role: text("role").default("admin").notNull(),
      isActive: boolean("is_active").default(true).notNull(),
      lastLogin: timestamp("last_login"),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    photoGallery = pgTable("photo_gallery", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      imageUrl: text("image_url").notNull(),
      caption: text("caption"),
      displayOrder: integer("display_order").default(0).notNull(),
      isActive: boolean("is_active").default(true).notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    workshopBookings = pgTable("workshop_bookings", {
      id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
      schoolName: text("school_name").notNull(),
      principalName: text("principal_name").notNull(),
      email: text("email").notNull(),
      phone: text("phone").notNull(),
      numberOfStudents: integer("number_of_students"),
      preferredDate: text("preferred_date"),
      message: text("message"),
      status: text("status").default("pending").notNull(),
      // pending, contacted, confirmed, completed, cancelled
      adminNotes: text("admin_notes"),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    insertUserSchema = createInsertSchema(users).pick({
      username: true,
      password: true
    });
    insertContactSchema = createInsertSchema(contactSubmissions).omit({
      id: true,
      createdAt: true,
      status: true,
      respondedAt: true,
      respondedBy: true,
      adminNotes: true
    });
    insertBlogArticleSchema = createInsertSchema(blogArticles).omit({
      id: true,
      createdAt: true,
      published: true
    });
    insertTestimonialSchema = createInsertSchema(testimonials).omit({
      id: true,
      createdAt: true
    });
    packageCategoryEnum = z.enum([
      "8-9-students",
      "10-12-students",
      "college-graduates",
      "working-professionals"
    ]);
    insertPackageSchema = createInsertSchema(packages).omit({
      id: true,
      createdAt: true
    }).extend({
      category: packageCategoryEnum
    });
    insertCustomizePlanSchema = createInsertSchema(customizePlans).omit({
      id: true,
      createdAt: true
    });
    insertPaymentSchema = createInsertSchema(payments).omit({
      id: true,
      createdAt: true,
      paidAt: true
    });
    insertAdminUserSchema = createInsertSchema(adminUsers).omit({
      id: true,
      createdAt: true,
      lastLogin: true
    });
    insertPhotoGallerySchema = createInsertSchema(photoGallery).omit({
      id: true,
      createdAt: true
    });
    insertWorkshopBookingSchema = createInsertSchema(workshopBookings).omit({
      id: true,
      createdAt: true,
      status: true,
      adminNotes: true
    });
    updateContactStatusSchema = z.object({
      status: z.enum(["pending", "responded", "archived"]),
      adminNotes: z.string().optional(),
      respondedBy: z.string().optional()
    });
  }
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
var pool, db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    neonConfig.webSocketConstructor = ws;
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?"
      );
    }
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema: schema_exports });
  }
});

// server/storage.ts
import { eq, desc, sql as sql2 } from "drizzle-orm";
var DatabaseStorage, storage;
var init_storage = __esm({
  "server/storage.ts"() {
    "use strict";
    init_schema();
    init_db();
    DatabaseStorage = class {
      async getUser(id) {
        const [user] = await db.select().from(users).where(eq(users.id, id));
        return user || void 0;
      }
      async getUserByUsername(username) {
        const [user] = await db.select().from(users).where(eq(users.username, username));
        return user || void 0;
      }
      async createUser(insertUser) {
        const [user] = await db.insert(users).values(insertUser).returning();
        return user;
      }
      async createContactSubmission(insertContact) {
        const [contact] = await db.insert(contactSubmissions).values(insertContact).returning();
        return contact;
      }
      async getContactSubmissions() {
        return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
      }
      // Blog articles
      async getBlogArticles() {
        return await db.select().from(blogArticles).orderBy(desc(blogArticles.published));
      }
      async getBlogArticlesByCategory(category) {
        return await db.select().from(blogArticles).where(eq(blogArticles.category, category)).orderBy(desc(blogArticles.published));
      }
      async createBlogArticle(article) {
        const [newArticle] = await db.insert(blogArticles).values(article).returning();
        return newArticle;
      }
      async updateBlogArticle(id, article) {
        const [updatedArticle] = await db.update(blogArticles).set(article).where(eq(blogArticles.id, id)).returning();
        return updatedArticle;
      }
      async deleteBlogArticle(id) {
        await db.delete(blogArticles).where(eq(blogArticles.id, id));
      }
      // Testimonials
      async getTestimonials() {
        return await db.select().from(testimonials).orderBy(desc(sql2`COALESCE(${testimonials.featured}, ${testimonials.createdAt})`));
      }
      async createTestimonial(testimonial) {
        const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
        return newTestimonial;
      }
      async updateTestimonial(id, testimonial) {
        const [updatedTestimonial] = await db.update(testimonials).set(testimonial).where(eq(testimonials.id, id)).returning();
        return updatedTestimonial;
      }
      async deleteTestimonial(id) {
        await db.delete(testimonials).where(eq(testimonials.id, id));
      }
      // Admin user operations
      async getAdminUser(id) {
        const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
        return admin || void 0;
      }
      async getAdminUserByUsername(username) {
        const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
        return admin || void 0;
      }
      async getAdminUserByEmail(email) {
        const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
        return admin || void 0;
      }
      async createAdminUser(adminUser) {
        const [newAdmin] = await db.insert(adminUsers).values(adminUser).returning();
        return newAdmin;
      }
      async updateAdminLastLogin(id) {
        await db.update(adminUsers).set({ lastLogin: /* @__PURE__ */ new Date() }).where(eq(adminUsers.id, id));
      }
      // Contact submissions updates
      async updateContactStatus(id, status) {
        const updateData = {
          status: status.status,
          respondedAt: status.status === "responded" ? /* @__PURE__ */ new Date() : null
        };
        if (status.adminNotes !== void 0) {
          updateData.adminNotes = status.adminNotes;
        }
        if (status.respondedBy !== void 0) {
          updateData.respondedBy = status.respondedBy;
        }
        const [updated] = await db.update(contactSubmissions).set(updateData).where(eq(contactSubmissions.id, id)).returning();
        return updated;
      }
      // Testimonials updates
      async getActiveTestimonials() {
        return await db.select().from(testimonials).where(eq(testimonials.isActive, true)).orderBy(desc(sql2`COALESCE(${testimonials.featured}, ${testimonials.createdAt})`));
      }
      // Packages operations
      async getPackages() {
        return await db.select().from(packages).orderBy(desc(packages.createdAt));
      }
      async getActivePackages() {
        return await db.select().from(packages).where(eq(packages.isActive, true)).orderBy(desc(packages.createdAt));
      }
      async getPackagesByCategory(category) {
        return await db.select().from(packages).where(sql2`${packages.category} = ${category} AND ${packages.isActive} = true`).orderBy(desc(packages.createdAt));
      }
      async getPackage(id) {
        const [pkg] = await db.select().from(packages).where(eq(packages.id, id));
        return pkg || void 0;
      }
      async createPackage(pkg) {
        const [newPackage] = await db.insert(packages).values(pkg).returning();
        return newPackage;
      }
      async updatePackage(id, pkg) {
        const [updatedPackage] = await db.update(packages).set(pkg).where(eq(packages.id, id)).returning();
        return updatedPackage;
      }
      async archivePackage(id) {
        const [archivedPackage] = await db.update(packages).set({ isActive: false }).where(eq(packages.id, id)).returning();
        return archivedPackage;
      }
      async deletePackage(id) {
        const hasPayments = await this.hasPaymentsForPackage(id);
        if (hasPayments) {
          throw new Error("PACKAGE_HAS_PAYMENTS");
        }
        await db.delete(packages).where(eq(packages.id, id));
      }
      async hasPaymentsForPackage(id) {
        const result = await db.select({ count: sql2`count(*)` }).from(payments).where(eq(payments.packageId, id));
        return result[0]?.count > 0;
      }
      // Customize Plans operations
      async getCustomizePlans() {
        return await db.select().from(customizePlans).orderBy(customizePlans.displayOrder);
      }
      async getActiveCustomizePlans() {
        return await db.select().from(customizePlans).where(eq(customizePlans.isActive, true)).orderBy(customizePlans.displayOrder);
      }
      async getCustomizePlan(id) {
        const [plan] = await db.select().from(customizePlans).where(eq(customizePlans.id, id));
        return plan || void 0;
      }
      async createCustomizePlan(plan) {
        const [newPlan] = await db.insert(customizePlans).values(plan).returning();
        return newPlan;
      }
      async updateCustomizePlan(id, plan) {
        const [updatedPlan] = await db.update(customizePlans).set(plan).where(eq(customizePlans.id, id)).returning();
        return updatedPlan;
      }
      async deleteCustomizePlan(id) {
        await db.delete(customizePlans).where(eq(customizePlans.id, id));
      }
      // Payments operations
      async getPayments() {
        return await db.select().from(payments).orderBy(desc(payments.createdAt));
      }
      async getPayment(id) {
        const [payment] = await db.select().from(payments).where(eq(payments.id, id));
        return payment || void 0;
      }
      async getPaymentByOrderId(orderId) {
        const [payment] = await db.select().from(payments).where(eq(payments.razorpayOrderId, orderId));
        return payment || void 0;
      }
      async createPayment(payment) {
        const [newPayment] = await db.insert(payments).values(payment).returning();
        return newPayment;
      }
      async updatePayment(id, payment) {
        const [updatedPayment] = await db.update(payments).set(payment).where(eq(payments.id, id)).returning();
        return updatedPayment;
      }
      async updatePaymentStatus(id, status, paymentDetails) {
        const updateData = {
          status,
          paidAt: status === "success" ? /* @__PURE__ */ new Date() : null
        };
        if (paymentDetails) {
          if (paymentDetails.paymentId) updateData.razorpayPaymentId = paymentDetails.paymentId;
          if (paymentDetails.signature) updateData.razorpaySignature = paymentDetails.signature;
          if (paymentDetails.method) updateData.paymentMethod = paymentDetails.method;
        }
        const [updatedPayment] = await db.update(payments).set(updateData).where(eq(payments.id, id)).returning();
        return updatedPayment;
      }
      // Photo Gallery operations
      async getPhotoGalleryItems() {
        return await db.select().from(photoGallery).orderBy(photoGallery.displayOrder, desc(photoGallery.createdAt));
      }
      async getActivePhotoGalleryItems() {
        return await db.select().from(photoGallery).where(eq(photoGallery.isActive, true)).orderBy(photoGallery.displayOrder, desc(photoGallery.createdAt));
      }
      async createPhotoGalleryItem(photo) {
        const [newPhoto] = await db.insert(photoGallery).values(photo).returning();
        return newPhoto;
      }
      async deletePhotoGalleryItem(id) {
        await db.delete(photoGallery).where(eq(photoGallery.id, id));
      }
      // Workshop Bookings
      async getWorkshopBookings() {
        return await db.select().from(workshopBookings).orderBy(desc(workshopBookings.createdAt));
      }
      async getWorkshopBooking(id) {
        const [booking] = await db.select().from(workshopBookings).where(eq(workshopBookings.id, id));
        return booking || void 0;
      }
      async createWorkshopBooking(booking) {
        const [newBooking] = await db.insert(workshopBookings).values(booking).returning();
        return newBooking;
      }
      async updateWorkshopBookingStatus(id, status, adminNotes) {
        const [updatedBooking] = await db.update(workshopBookings).set({ status, adminNotes }).where(eq(workshopBookings.id, id)).returning();
        return updatedBooking;
      }
      async deleteWorkshopBooking(id) {
        await db.delete(workshopBookings).where(eq(workshopBookings.id, id));
      }
    };
    storage = new DatabaseStorage();
  }
});

// server/objectStorage.ts
var objectStorage_exports = {};
__export(objectStorage_exports, {
  ObjectNotFoundError: () => ObjectNotFoundError,
  ObjectStorageService: () => ObjectStorageService,
  objectStorageClient: () => objectStorageClient
});
import { Storage } from "@google-cloud/storage";
function parseObjectPath(path4) {
  if (!path4.startsWith("/")) {
    path4 = `/${path4}`;
  }
  const pathParts = path4.split("/");
  if (pathParts.length < 3) {
    throw new Error("Invalid path: must contain at least a bucket name");
  }
  const bucketName = pathParts[1];
  const objectName = pathParts.slice(2).join("/");
  return {
    bucketName,
    objectName
  };
}
var REPLIT_SIDECAR_ENDPOINT, objectStorageClient, ObjectNotFoundError, ObjectStorageService;
var init_objectStorage = __esm({
  "server/objectStorage.ts"() {
    "use strict";
    REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";
    objectStorageClient = new Storage({
      credentials: {
        audience: "replit",
        subject_token_type: "access_token",
        token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
        type: "external_account",
        credential_source: {
          url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
          format: {
            type: "json",
            subject_token_field_name: "access_token"
          }
        },
        universe_domain: "googleapis.com"
      },
      projectId: ""
    });
    ObjectNotFoundError = class _ObjectNotFoundError extends Error {
      constructor() {
        super("Object not found");
        this.name = "ObjectNotFoundError";
        Object.setPrototypeOf(this, _ObjectNotFoundError.prototype);
      }
    };
    ObjectStorageService = class {
      constructor() {
      }
      getPublicObjectSearchPaths() {
        const pathsStr = process.env.PUBLIC_OBJECT_SEARCH_PATHS || "";
        const paths = Array.from(
          new Set(
            pathsStr.split(",").map((path4) => path4.trim()).filter((path4) => path4.length > 0)
          )
        );
        if (paths.length === 0) {
          throw new Error(
            "PUBLIC_OBJECT_SEARCH_PATHS not set. Create a bucket in 'Object Storage' tool and set PUBLIC_OBJECT_SEARCH_PATHS env var (comma-separated paths)."
          );
        }
        return paths;
      }
      async searchPublicObject(filePath) {
        const normalizedPath = filePath.startsWith("public/") ? filePath.substring(7) : filePath;
        for (const searchPath of this.getPublicObjectSearchPaths()) {
          const fullPath = `${searchPath}/${normalizedPath}`;
          const { bucketName, objectName } = parseObjectPath(fullPath);
          const bucket = objectStorageClient.bucket(bucketName);
          const file = bucket.file(objectName);
          const [exists] = await file.exists();
          if (exists) {
            return file;
          }
        }
        return null;
      }
      async downloadObject(file, res, cacheTtlSec = 3600) {
        try {
          const [metadata] = await file.getMetadata();
          res.set({
            "Content-Type": metadata.contentType || "application/octet-stream",
            "Content-Length": metadata.size,
            "Cache-Control": `public, max-age=${cacheTtlSec}`
          });
          const stream = file.createReadStream();
          stream.on("error", (err) => {
            console.error("Stream error:", err);
            if (!res.headersSent) {
              res.status(500).json({ error: "Error streaming file" });
            }
          });
          stream.pipe(res);
        } catch (error) {
          console.error("Error downloading file:", error);
          if (!res.headersSent) {
            res.status(500).json({ error: "Error downloading file" });
          }
        }
      }
      async uploadFile(localPath, storagePath) {
        const { bucketName, objectName } = parseObjectPath(storagePath);
        const bucket = objectStorageClient.bucket(bucketName);
        await bucket.upload(localPath, {
          destination: objectName,
          metadata: {
            cacheControl: "public, max-age=31536000"
          }
        });
        return `/public-objects/${objectName}`;
      }
      async uploadBuffer(buffer, storagePath, contentType) {
        const { bucketName, objectName } = parseObjectPath(storagePath);
        const bucket = objectStorageClient.bucket(bucketName);
        const file = bucket.file(objectName);
        await file.save(buffer, {
          metadata: {
            contentType,
            cacheControl: "public, max-age=31536000"
          }
        });
        return `/public-objects/${objectName}`;
      }
    };
  }
});

// server/seed-data.ts
var seed_data_exports = {};
__export(seed_data_exports, {
  seedDatabase: () => seedDatabase
});
async function seedDatabase() {
  try {
    console.log("Checking database seed data...");
    const testimonialData = [
      {
        name: "Priya Verma",
        role: "Class 12 Student \u2192 Engineering",
        quote: "The psychometric test was incredibly insightful! It helped me understand my strengths and choose the right engineering stream. The counselors were patient and supportive throughout.",
        initial: "P",
        gradient: "bg-gradient-to-br from-pink-500 to-purple-600",
        imageUrl: "/public-objects/public/testimonials/professional_busines_21e83427.jpg",
        isActive: true
      },
      {
        name: "Amit Kumar",
        role: "MBA Graduate \u2192 Marketing Manager",
        quote: "Careerskope provided exceptional guidance during my MBA placement. The mock interviews and resume optimization helped me secure a position at a leading multinational company.",
        initial: "A",
        gradient: "bg-gradient-to-br from-orange-500 to-red-600",
        imageUrl: "/public-objects/public/testimonials/professional_busines_03b735cf.jpg",
        isActive: true
      },
      {
        name: "Sneha Kapoor",
        role: "Working Professional \u2192 Career Switch",
        quote: "After 5 years in finance, I wanted to switch to digital marketing. The career counseling sessions at Careerskope gave me the confidence and roadmap to make this transition successfully.",
        initial: "S",
        gradient: "bg-gradient-to-br from-teal-500 to-cyan-600",
        imageUrl: "/public-objects/public/testimonials/professional_busines_9c2a9400.jpg",
        isActive: true
      },
      {
        name: "Vikram Singh",
        role: "Class 10 Student \u2192 Science Stream",
        quote: "As a confused 10th grader, I did not know which stream to choose. The counselors at Careerskope helped me discover my passion for science and guided me toward the right path.",
        initial: "V",
        gradient: "bg-gradient-to-br from-indigo-500 to-blue-600",
        imageUrl: "/public-objects/public/testimonials/young_professional_s_6c8146cb.jpg",
        isActive: true
      },
      {
        name: "Neha Agarwal",
        role: "College Graduate \u2192 HR Professional",
        quote: "The professional development workshops and interview preparation were game-changers. I landed my dream HR role within weeks of completing my graduation, thanks to Careerskope!",
        initial: "N",
        gradient: "bg-gradient-to-br from-rose-500 to-pink-600",
        imageUrl: "/public-objects/public/testimonials/young_professional_s_d5c140f5.jpg",
        isActive: true
      },
      {
        name: "Rahul Patel",
        role: "Recent Graduate \u2192 Data Analyst",
        quote: "The psychometric assessment and career coaching sessions gave me clarity about my strengths and helped me land my dream job in data analytics.",
        initial: "R",
        gradient: "bg-gradient-to-br from-red-500 to-pink-600",
        imageUrl: "/public-objects/public/testimonials/professional_busines_2ee7751f.jpg",
        isActive: true
      },
      {
        name: "Ananya Sharma",
        role: "Software Engineer \u2192 Product Manager",
        quote: "Careerskope helped me transition from engineering to product management seamlessly. The career mapping and mentorship were invaluable in my journey.",
        initial: "A",
        gradient: "bg-gradient-to-br from-green-500 to-blue-600",
        imageUrl: "/public-objects/public/testimonials/professional_busines_b44588be.jpg",
        isActive: true
      },
      {
        name: "Rajiv Mishra",
        role: "Recent Graduate \u2192 Data Analyst",
        quote: "The psychometric assessment and career coaching sessions gave me clarity about my strengths and helped me land my dream job in data analytics.",
        initial: "R",
        gradient: "bg-gradient-to-br from-blue-500 to-purple-600",
        imageUrl: "/public-objects/public/testimonials/professional_busines_3c128897.jpg",
        isActive: true
      }
    ];
    const existingTestimonials = await storage.getTestimonials();
    const existingNames = new Set(existingTestimonials.map((t) => t.name.trim().toLowerCase()));
    let addedCount = 0;
    for (const testimonial of testimonialData) {
      if (!existingNames.has(testimonial.name.trim().toLowerCase())) {
        await storage.createTestimonial(testimonial);
        addedCount++;
      }
    }
    if (addedCount > 0) {
      console.log(`Added ${addedCount} new testimonials`);
    }
    if (existingTestimonials.length < testimonialData.length) {
      console.log(`Testimonials: ${existingTestimonials.length + addedCount}/${testimonialData.length} in database`);
    }
    const blogData = [
      {
        title: "Navigating Corporate Careers: How Expert Guidance Can Accelerate Your Professional Journey",
        description: "Learn how expert corporate career guidance can help students and professionals map their skills, identify opportunities, and accelerate growth in the corporate world",
        category: "professionals",
        readTime: "5 min read",
        imageUrl: "/public-objects/public/blogs/professionals-career.jpg",
        content: "In today's fast-paced corporate world, advancing your career requires more than just hard work\u2014it demands strategic planning, self-awareness, and the right guidance. Many professionals find themselves at crossroads, unsure if their current path aligns with their skills, interests, or long-term goals. This is where expert corporate career guidance can make all the difference.\n\nUnderstanding Your Strengths and Opportunities\nCorporate growth begins with a deep understanding of your unique strengths and areas for improvement. Advanced psychometric assessments help professionals gain clear insights into their personality, skillsets, and career potential, allowing them to identify opportunities that align with their natural abilities.\n\nBridging the Gap Between Talent and Opportunity\nSuccess is about knowing where and how to apply your skills. Careerskope's tailored mentorship programs guide professionals through industry trends, emerging job roles, and AI-driven transformations, ensuring that you strategically position yourself for success.\n\nPersonalized Career Roadmaps\nNavigating transitions\u2014whether moving to management, switching industries, or aiming for leadership\u2014is easier with a structured roadmap. Careerskope's career counselling framework provides actionable insights, step-by-step guidance, and coaching sessions to make informed decisions without losing momentum.\n\nProfessional Development Beyond Job Titles\nCorporate success requires more than technical expertise. Communication, leadership, networking, and personal branding are critical. Careerskope's professional development programs focus on building these essential skills to help you advance confidently.\n\nConclusion\nWhether you're a fresh graduate entering the corporate world or an experienced professional seeking new opportunities, expert career guidance can unlock doors you didn't know existed. With Careerskope, you get more than advice\u2014you gain a partner committed to your long-term success.",
        isActive: true
      },
      {
        title: "10 Essential Career Planning Tips for Students",
        description: "Discover key strategies for students to plan their career path effectively, from self-assessment to skill development and networking",
        category: "students",
        readTime: "7 min read",
        imageUrl: "/public-objects/public/blogs/students-career.jpg",
        content: "Career planning is one of the most important aspects of a student's life. Making the right decisions early can set you up for long-term success. Here are 10 essential career planning tips every student should follow:\n\n1. Start Early\nThe earlier you start thinking about your career, the better. Begin exploring different fields and industries while you're still in school.\n\n2. Understand Your Strengths\nTake psychometric tests and career assessments to understand your natural abilities, interests, and personality traits.\n\n3. Research Career Options\nDon't limit yourself to traditional career paths. Research emerging fields and opportunities that align with your interests.\n\n4. Set Clear Goals\nDefine short-term and long-term career goals. Having a clear vision helps you stay focused and motivated.\n\n5. Build Relevant Skills\nIdentify the skills required for your desired career and start developing them through courses, internships, and projects.\n\n6. Gain Practical Experience\nInternships, volunteering, and part-time jobs provide valuable hands-on experience and help you build your resume.\n\n7. Network Actively\nConnect with professionals in your field of interest. Attend career fairs, workshops, and networking events.\n\n8. Seek Mentorship\nFind mentors who can guide you through your career journey and provide valuable insights.\n\n9. Stay Flexible\nBe open to exploring different paths. Your interests and goals may evolve as you gain more experience.\n\n10. Invest in Professional Guidance\nWork with career counselors who can provide personalized advice and help you navigate important decisions.\n\nConclusion\nCareer planning is an ongoing process. By following these tips and seeking expert guidance when needed, you can build a successful and fulfilling career.",
        isActive: true
      },
      {
        title: "From Campus to Corporate: A Smooth Transition Guide",
        description: "Essential tips for recent graduates to successfully transition from campus life to the corporate world with confidence",
        category: "graduates",
        readTime: "6 min read",
        imageUrl: "/public-objects/public/blogs/graduates-career.jpg",
        content: "The transition from campus to corporate life can be both exciting and challenging. Here's your comprehensive guide to making this transition smooth and successful:\n\nUnderstanding Corporate Culture\nCorporate culture is very different from campus life. Learn about workplace etiquette, professional communication, and organizational hierarchies.\n\nDeveloping Professional Skills\nFocus on building essential professional skills like time management, teamwork, communication, and problem-solving.\n\nBuilding Your Personal Brand\nCreate a strong LinkedIn profile, maintain a professional online presence, and start networking with industry professionals.\n\nPreparing for Interviews\nPractice common interview questions, prepare your elevator pitch, and research companies thoroughly before interviews.\n\nManaging Expectations\nUnderstand that your first job might not be perfect. Focus on learning and gaining experience.\n\nSeeking Mentorship\nFind mentors within your organization who can guide you through the initial months and help you navigate corporate challenges.\n\nContinuous Learning\nStay updated with industry trends, take relevant courses, and continuously develop your skills.\n\nWork-Life Balance\nLearn to maintain a healthy work-life balance from the beginning of your career.\n\nConclusion\nWith the right mindset, preparation, and guidance, you can successfully transition from campus to corporate and build a thriving career.",
        isActive: true
      }
    ];
    const existingBlogs = await storage.getBlogArticles();
    const existingTitles = new Set(existingBlogs.map((b) => b.title.trim().toLowerCase()));
    let addedBlogCount = 0;
    for (const blog of blogData) {
      if (!existingTitles.has(blog.title.trim().toLowerCase())) {
        await storage.createBlogArticle(blog);
        addedBlogCount++;
      }
    }
    if (addedBlogCount > 0) {
      console.log(`Added ${addedBlogCount} new blog articles`);
    }
    if (existingBlogs.length < blogData.length) {
      console.log(`Blog articles: ${existingBlogs.length + addedBlogCount}/${blogData.length} in database`);
    }
    console.log("Database initialization complete");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
var init_seed_data = __esm({
  "server/seed-data.ts"() {
    "use strict";
    init_storage();
  }
});

// server/index.ts
import express2 from "express";
import session from "express-session";
import path3 from "path";

// server/routes.ts
init_storage();
init_schema();
init_objectStorage();
import { createServer } from "http";
import { z as z2 } from "zod";
import bcrypt from "bcryptjs";
import Razorpay from "razorpay";
import multer from "multer";
var upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
    // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and WebP are allowed."));
    }
  }
});
var objectStorageService = new ObjectStorageService();
var razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});
var requireAdmin = async (req, res, next) => {
  try {
    if (!req.session.adminUserId) {
      return res.status(401).json({ success: false, message: "Admin authentication required" });
    }
    const admin = await storage.getAdminUser(req.session.adminUserId);
    if (!admin || !admin.isActive) {
      req.session.destroy();
      return res.status(401).json({ success: false, message: "Admin account not found or inactive" });
    }
    req.admin = admin;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Authentication error" });
  }
};
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contactSubmission = await storage.createContactSubmission(validatedData);
      res.json({
        success: true,
        message: "Contact form submitted successfully",
        id: contactSubmission.id
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  });
  app2.get("/api/contact-submissions", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch contact submissions"
      });
    }
  });
  app2.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username already exists"
        });
      }
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword
      });
      req.session.userId = user.id;
      req.session.username = user.username;
      res.json({
        success: true,
        message: "User registered successfully",
        user: { id: user.id, username: user.username }
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid registration data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Registration failed"
        });
      }
    }
  });
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "Username and password are required"
        });
      }
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password"
        });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password"
        });
      }
      req.session.userId = user.id;
      req.session.username = user.username;
      res.json({
        success: true,
        message: "Login successful",
        user: { id: user.id, username: user.username }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Login failed"
      });
    }
  });
  app2.post("/api/auth/logout", async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Logout failed"
          });
        }
        res.clearCookie("connect.sid");
        res.json({
          success: true,
          message: "Logout successful"
        });
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Logout failed"
      });
    }
  });
  app2.get("/api/auth/me", async (req, res) => {
    try {
      const session2 = req.session;
      if (!session2.userId) {
        return res.status(401).json({
          success: false,
          message: "Not authenticated"
        });
      }
      const user = await storage.getUser(session2.userId);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found"
        });
      }
      res.json({
        success: true,
        user: { id: user.id, username: user.username }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to get user info"
      });
    }
  });
  app2.get("/api/blog-articles", async (req, res) => {
    try {
      const category = req.query.category;
      const articles = category && category !== "all" ? await storage.getBlogArticlesByCategory(category) : await storage.getBlogArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch blog articles"
      });
    }
  });
  app2.post("/api/blog-articles", async (req, res) => {
    try {
      const validatedData = insertBlogArticleSchema.parse(req.body);
      const article = await storage.createBlogArticle(validatedData);
      res.json({
        success: true,
        message: "Blog article created successfully",
        article
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid article data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  });
  app2.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials2 = await storage.getTestimonials();
      res.json(testimonials2);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch testimonials"
      });
    }
  });
  app2.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.json({
        success: true,
        message: "Testimonial created successfully",
        testimonial
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid testimonial data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  });
  app2.post("/api/create-payment-order", async (req, res) => {
    try {
      const { packageId, customizePlanId, planType, customerName, customerEmail, customerPhone, notes } = req.body;
      let itemDetails;
      let itemPrice;
      let itemName;
      if (planType === "customize" || customizePlanId) {
        const selectedPlan = await storage.getCustomizePlan(customizePlanId);
        if (!selectedPlan) {
          return res.status(404).json({
            success: false,
            message: "Customize plan not found"
          });
        }
        if (!selectedPlan.isActive) {
          return res.status(400).json({
            success: false,
            message: "This plan is no longer available for purchase"
          });
        }
        itemDetails = selectedPlan;
        itemPrice = selectedPlan.price;
        itemName = selectedPlan.name;
      } else {
        const selectedPackage = await storage.getPackage(packageId);
        if (!selectedPackage) {
          return res.status(404).json({
            success: false,
            message: "Package not found"
          });
        }
        if (!selectedPackage.isActive) {
          return res.status(400).json({
            success: false,
            message: "This package is no longer available for purchase"
          });
        }
        itemDetails = selectedPackage;
        itemPrice = selectedPackage.price;
        itemName = selectedPackage.name;
      }
      const amount = Math.round(parseFloat(itemPrice) * 100);
      const currency = "INR";
      const razorpayOrder = await razorpay.orders.create({
        amount,
        currency,
        receipt: `receipt_${Date.now()}`,
        notes: {
          ...customizePlanId ? { customizePlanId, planType: "customize" } : { packageId, planType: "package" },
          customerName,
          customerEmail,
          customerPhone,
          notes: notes || ""
        }
      });
      const paymentData = {
        razorpayOrderId: razorpayOrder.id,
        ...customizePlanId ? { customizePlanId, planType: "customize" } : { packageId, planType: "package" },
        customerName,
        customerEmail,
        customerPhone,
        amount: itemPrice,
        status: "pending",
        paymentMethod: "card",
        notes: notes || ""
      };
      await storage.createPayment(paymentData);
      res.json({
        success: true,
        orderId: razorpayOrder.id,
        amount,
        currency,
        key: process.env.RAZORPAY_KEY_ID
      });
    } catch (error) {
      console.error("Payment order creation error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create payment order"
      });
    }
  });
  app2.post("/api/verify-payment", async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      const crypto = __require("crypto");
      const generated_signature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(razorpay_order_id + "|" + razorpay_payment_id).digest("hex");
      if (generated_signature !== razorpay_signature) {
        return res.status(400).json({
          success: false,
          message: "Payment verification failed"
        });
      }
      const payments2 = await storage.getPayments();
      const payment = payments2.find((p) => p.razorpayOrderId === razorpay_order_id);
      if (!payment) {
        return res.status(404).json({
          success: false,
          message: "Payment record not found"
        });
      }
      await storage.updatePaymentStatus(razorpay_order_id, "success");
      res.json({
        success: true,
        message: "Payment verified successfully"
      });
    } catch (error) {
      console.error("Payment verification error:", error);
      res.status(500).json({
        success: false,
        message: "Payment verification failed"
      });
    }
  });
  app2.post("/api/admin/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password required" });
      }
      const admin = await storage.getAdminUserByUsername(username);
      if (!admin || !admin.isActive) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
      await storage.updateAdminLastLogin(admin.id);
      req.session.adminUserId = admin.id;
      req.session.adminUsername = admin.username;
      res.json({
        success: true,
        message: "Login successful",
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Login failed" });
    }
  });
  app2.post("/api/admin/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Logout failed" });
      }
      res.json({ success: true, message: "Logged out successfully" });
    });
  });
  app2.get("/api/admin/auth/me", requireAdmin, (req, res) => {
    const admin = req.admin;
    res.json({
      success: true,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  });
  app2.patch("/api/admin/contacts/:id/status", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const statusData = updateContactStatusSchema.parse(req.body);
      if (statusData.respondedBy === void 0 && statusData.status === "responded") {
        statusData.respondedBy = req.admin.username;
      }
      const updated = await storage.updateContactStatus(id, statusData);
      res.json({ success: true, data: updated, message: "Contact status updated" });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ success: false, message: "Invalid status data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to update contact status" });
      }
    }
  });
  app2.get("/api/admin/blog-articles", requireAdmin, async (req, res) => {
    try {
      const articles = await storage.getBlogArticles();
      res.json({ success: true, data: articles });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch blog articles" });
    }
  });
  app2.put("/api/admin/blog-articles/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertBlogArticleSchema.partial().parse(req.body);
      const article = await storage.updateBlogArticle(id, validatedData);
      res.json({ success: true, data: article, message: "Blog article updated successfully" });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ success: false, message: "Invalid article data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to update blog article" });
      }
    }
  });
  app2.delete("/api/admin/blog-articles/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteBlogArticle(id);
      res.json({ success: true, message: "Blog article deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete blog article" });
    }
  });
  app2.post("/api/admin/upload", requireAdmin, upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }
      const { type } = req.body;
      if (!type || !["testimonial", "blog"].includes(type)) {
        return res.status(400).json({ success: false, message: "Invalid upload type. Must be 'testimonial' or 'blog'" });
      }
      const bucketId = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID;
      if (!bucketId) {
        return res.status(500).json({ success: false, message: "Object storage not configured" });
      }
      const timestamp2 = Date.now();
      const extension = req.file.originalname.split(".").pop()?.toLowerCase() || "jpg";
      const sanitizedName = req.file.originalname.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, "-").toLowerCase().slice(0, 30);
      const filename = `${sanitizedName}-${timestamp2}.${extension}`;
      const folder = type === "testimonial" ? "testimonials" : "blogs";
      const storagePath = `/${bucketId}/public/${folder}/${filename}`;
      const url = await objectStorageService.uploadBuffer(
        req.file.buffer,
        storagePath,
        req.file.mimetype
      );
      res.json({
        success: true,
        url,
        message: "Image uploaded successfully"
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ success: false, message: "Failed to upload image" });
    }
  });
  app2.get("/api/admin/testimonials", requireAdmin, async (req, res) => {
    try {
      const testimonials2 = await storage.getTestimonials();
      res.json({ success: true, data: testimonials2 });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch testimonials" });
    }
  });
  app2.post("/api/admin/testimonials", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.json({ success: true, data: testimonial, message: "Testimonial created successfully" });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ success: false, message: "Invalid testimonial data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to create testimonial" });
      }
    }
  });
  app2.put("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertTestimonialSchema.partial().parse(req.body);
      const testimonial = await storage.updateTestimonial(id, validatedData);
      res.json({ success: true, data: testimonial, message: "Testimonial updated successfully" });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ success: false, message: "Invalid testimonial data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to update testimonial" });
      }
    }
  });
  app2.delete("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteTestimonial(id);
      res.json({ success: true, message: "Testimonial deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete testimonial" });
    }
  });
  app2.get("/api/admin/packages", requireAdmin, async (req, res) => {
    try {
      const packages2 = await storage.getPackages();
      res.json({ success: true, data: packages2 });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch packages" });
    }
  });
  app2.post("/api/admin/packages", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertPackageSchema.parse(req.body);
      const pkg = await storage.createPackage(validatedData);
      res.json({ success: true, data: pkg, message: "Package created successfully" });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ success: false, message: "Invalid package data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to create package" });
      }
    }
  });
  app2.put("/api/admin/packages/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertPackageSchema.partial().parse(req.body);
      const pkg = await storage.updatePackage(id, validatedData);
      res.json({ success: true, data: pkg, message: "Package updated successfully" });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ success: false, message: "Invalid package data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to update package" });
      }
    }
  });
  app2.delete("/api/admin/packages/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const hardDelete = req.query.hard === "true";
      if (hardDelete) {
        try {
          await storage.deletePackage(id);
          res.json({ success: true, message: "Package permanently deleted" });
        } catch (error) {
          if (error.message === "PACKAGE_HAS_PAYMENTS") {
            await storage.archivePackage(id);
            res.status(409).json({
              success: false,
              code: "PACKAGE_HAS_PAYMENTS",
              message: "Cannot delete package with existing payments. The package has been archived instead."
            });
          } else {
            throw error;
          }
        }
      } else {
        await storage.archivePackage(id);
        res.json({ success: true, message: "Package archived successfully" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete package" });
    }
  });
  app2.post("/api/admin/seed-packages", requireAdmin, async (req, res) => {
    try {
      const seedPackages = [
        {
          name: "Discover",
          description: "Basic career guidance for students and beginners",
          price: "2999",
          category: "8-9-students",
          features: [
            "Career interest assessment",
            "Psychometric evaluation",
            "1 Careerskope's expert career counseling session",
            "Career roadmap",
            "Email support"
          ],
          isPopular: false,
          isActive: true
        },
        {
          name: "Discover+",
          description: "Comprehensive career guidance with personalized coaching",
          price: "5999",
          category: "10-12-students",
          features: [
            "Career interest & aptitude assessment",
            "Psychometric evaluation",
            "3 Careerskope's expert career counseling sessions",
            "Detailed career roadmap",
            "LinkedIn profile optimization",
            "Mock interview",
            "WhatsApp & email support"
          ],
          isPopular: true,
          isActive: true
        },
        {
          name: "Professional Development",
          description: "Career advancement for working professionals",
          price: "7999",
          category: "working-professionals",
          features: [
            "Career transition assessment",
            "Leadership evaluation",
            "2 Careerskope's expert career counseling sessions",
            "Career advancement strategy",
            "Resume optimization",
            "Interview preparation",
            "Priority support"
          ],
          isPopular: false,
          isActive: true
        },
        {
          name: "Graduate Success",
          description: "Placement readiness for college graduates",
          price: "4999",
          category: "college-graduates",
          features: [
            "Career assessment",
            "Psychometric evaluation",
            "2 Careerskope's expert career counseling sessions",
            "Placement readiness coaching",
            "Resume & portfolio review",
            "Company-specific interview prep",
            "Email support"
          ],
          isPopular: false,
          isActive: true
        }
      ];
      let createdCount = 0;
      const existingPackages = await storage.getPackages();
      for (const pkg of seedPackages) {
        const exists = existingPackages.some((p) => p.name.toLowerCase() === pkg.name.toLowerCase());
        if (!exists) {
          await storage.createPackage(pkg);
          createdCount++;
        }
      }
      res.json({
        success: true,
        message: `Seeding complete. Created ${createdCount} new packages.`,
        created: createdCount,
        total: existingPackages.length + createdCount
      });
    } catch (error) {
      console.error("Seed packages error:", error);
      res.status(500).json({ success: false, message: "Failed to seed packages" });
    }
  });
  app2.get("/api/admin/payments", requireAdmin, async (req, res) => {
    try {
      const payments2 = await storage.getPayments();
      res.json({ success: true, data: payments2 });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch payments" });
    }
  });
  app2.get("/api/packages", async (req, res) => {
    try {
      const { category } = req.query;
      const packages2 = category && category !== "all" ? await storage.getPackagesByCategory(category) : await storage.getActivePackages();
      res.json(packages2);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch packages" });
    }
  });
  app2.get("/api/customize-plans", async (req, res) => {
    try {
      const plans = await storage.getActiveCustomizePlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch customize plans" });
    }
  });
  app2.get("/api/admin/customize-plans", requireAdmin, async (req, res) => {
    try {
      const plans = await storage.getCustomizePlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch customize plans" });
    }
  });
  app2.post("/api/admin/customize-plans", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertCustomizePlanSchema.parse(req.body);
      const plan = await storage.createCustomizePlan(validatedData);
      res.json({ success: true, plan });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({ success: false, message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to create customize plan" });
      }
    }
  });
  app2.put("/api/admin/customize-plans/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const plan = await storage.updateCustomizePlan(id, req.body);
      res.json({ success: true, plan });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to update customize plan" });
    }
  });
  app2.delete("/api/admin/customize-plans/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteCustomizePlan(id);
      res.json({ success: true, message: "Customize plan deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete customize plan" });
    }
  });
  app2.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials2 = await storage.getActiveTestimonials();
      res.json(testimonials2);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch testimonials"
      });
    }
  });
  app2.post("/api/create-payment-order", async (req, res) => {
    try {
      const { packageId, customerName, customerEmail, customerPhone, notes } = req.body;
      if (!packageId || !customerName || !customerEmail || !customerPhone) {
        return res.status(400).json({
          success: false,
          message: "Package ID, name, email and phone are required"
        });
      }
      const pkg = await storage.getPackage(packageId);
      if (!pkg || !pkg.isActive) {
        return res.status(404).json({
          success: false,
          message: "Package not found or inactive"
        });
      }
      const paymentData = {
        packageId,
        customerName,
        customerEmail,
        customerPhone,
        amount: pkg.price,
        currency: "INR",
        status: "pending",
        notes: notes || `Payment for ${pkg.name} package`
      };
      const payment = await storage.createPayment(paymentData);
      res.json({
        success: true,
        orderId: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        message: "Payment order created successfully"
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to create payment order" });
    }
  });
  app2.get("/api/photo-gallery", async (req, res) => {
    try {
      const photos = await storage.getActivePhotoGalleryItems();
      res.json(photos);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch photos" });
    }
  });
  app2.get("/api/admin/photo-gallery", requireAdmin, async (req, res) => {
    try {
      const photos = await storage.getPhotoGalleryItems();
      res.json({ success: true, data: photos });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch photos" });
    }
  });
  app2.post("/api/admin/photo-gallery", requireAdmin, async (req, res) => {
    try {
      const photo = await storage.createPhotoGalleryItem(req.body);
      res.status(201).json({ success: true, message: "Photo added successfully", photo });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to add photo" });
    }
  });
  app2.delete("/api/admin/photo-gallery/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deletePhotoGalleryItem(id);
      res.json({ success: true, message: "Photo deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete photo" });
    }
  });
  app2.post("/api/workshop-bookings", async (req, res) => {
    try {
      const validatedData = insertWorkshopBookingSchema.parse(req.body);
      const booking = await storage.createWorkshopBooking(validatedData);
      res.json({
        success: true,
        message: "Workshop booking submitted successfully",
        id: booking.id
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error"
        });
      }
    }
  });
  app2.get("/api/workshop-bookings", requireAdmin, async (req, res) => {
    try {
      const bookings = await storage.getWorkshopBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch workshop bookings"
      });
    }
  });
  app2.patch("/api/workshop-bookings/:id/status", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { status, adminNotes } = req.body;
      const updatedBooking = await storage.updateWorkshopBookingStatus(id, status, adminNotes);
      res.json({ success: true, booking: updatedBooking });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update booking status"
      });
    }
  });
  app2.delete("/api/workshop-bookings/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteWorkshopBooking(id);
      res.json({ success: true, message: "Workshop booking deleted successfully" });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete workshop booking"
      });
    }
  });
  app2.get("/public-objects/:filePath(*)", async (req, res) => {
    const filePath = req.params.filePath;
    const { ObjectStorageService: ObjectStorageService2 } = await Promise.resolve().then(() => (init_objectStorage(), objectStorage_exports));
    const objectStorageService2 = new ObjectStorageService2();
    try {
      const file = await objectStorageService2.searchPublicObject(filePath);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      objectStorageService2.downloadObject(file, res);
    } catch (error) {
      console.error("Error searching for public object:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  app2.post("/api/admin/reset-seed-data", requireAdmin, async (req, res) => {
    try {
      const { seedDatabase: seedDatabase2 } = await Promise.resolve().then(() => (init_seed_data(), seed_data_exports));
      const existingBlogs = await storage.getBlogArticles();
      const existingTestimonials = await storage.getTestimonials();
      for (const blog of existingBlogs) {
        await storage.deleteBlogArticle(blog.id);
      }
      for (const testimonial of existingTestimonials) {
        await storage.deleteTestimonial(testimonial.id);
      }
      await seedDatabase2();
      res.json({
        success: true,
        message: "Seed data reset successfully",
        details: {
          blogsDeleted: existingBlogs.length,
          testimonialsDeleted: existingTestimonials.length
        }
      });
    } catch (error) {
      console.error("Error resetting seed data:", error);
      res.status(500).json({
        success: false,
        message: "Failed to reset seed data",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  base: "/",
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
init_seed_data();
var app = express2();
var assetsPath = path3.resolve(import.meta.dirname, "..", "attached_assets");
app.use("/attached_assets", express2.static(assetsPath));
app.use(express2.json({ limit: "50mb" }));
app.use(express2.urlencoded({ extended: false, limit: "50mb" }));
app.use(session({
  secret: process.env.SESSION_SECRET || "your-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1e3
    // 24 hours
  }
}));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  await seedDatabase();
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
