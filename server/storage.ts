import { 
  users, 
  contactSubmissions, 
  blogArticles,
  testimonials,
  packages,
  payments,
  adminUsers,
  photoGallery,
  type User, 
  type InsertUser, 
  type ContactSubmission, 
  type InsertContact,
  type BlogArticle,
  type InsertBlogArticle,
  type Testimonial,
  type InsertTestimonial,
  type Package,
  type InsertPackage,
  type Payment,
  type InsertPayment,
  type AdminUser,
  type InsertAdminUser,
  type PhotoGallery,
  type InsertPhotoGallery,
  type UpdateContactStatus
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Admin user operations
  getAdminUser(id: string): Promise<AdminUser | undefined>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  getAdminUserByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(adminUser: InsertAdminUser): Promise<AdminUser>;
  updateAdminLastLogin(id: string): Promise<void>;
  
  // Contact submissions
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  updateContactStatus(id: string, status: UpdateContactStatus): Promise<ContactSubmission>;
  
  // Blog articles
  getBlogArticles(): Promise<BlogArticle[]>;
  getBlogArticlesByCategory(category: string): Promise<BlogArticle[]>;
  createBlogArticle(article: InsertBlogArticle): Promise<BlogArticle>;
  updateBlogArticle(id: string, article: Partial<InsertBlogArticle>): Promise<BlogArticle>;
  deleteBlogArticle(id: string): Promise<void>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getActiveTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial>;
  deleteTestimonial(id: string): Promise<void>;
  
  // Packages
  getPackages(): Promise<Package[]>;
  getActivePackages(): Promise<Package[]>;
  getPackagesByCategory(category: string): Promise<Package[]>;
  getPackage(id: string): Promise<Package | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;
  updatePackage(id: string, pkg: Partial<InsertPackage>): Promise<Package>;
  archivePackage(id: string): Promise<Package>;
  deletePackage(id: string): Promise<void>;
  hasPaymentsForPackage(id: string): Promise<boolean>;
  
  // Payments
  getPayments(): Promise<Payment[]>;
  getPayment(id: string): Promise<Payment | undefined>;
  getPaymentByOrderId(orderId: string): Promise<Payment | undefined>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePayment(id: string, payment: Partial<InsertPayment>): Promise<Payment>;
  updatePaymentStatus(id: string, status: string, paymentDetails?: any): Promise<Payment>;
  
  // Photo Gallery
  getPhotoGalleryItems(): Promise<PhotoGallery[]>;
  getActivePhotoGalleryItems(): Promise<PhotoGallery[]>;
  createPhotoGalleryItem(photo: InsertPhotoGallery): Promise<PhotoGallery>;
  deletePhotoGalleryItem(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const [contact] = await db
      .insert(contactSubmissions)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  // Blog articles
  async getBlogArticles(): Promise<BlogArticle[]> {
    return await db.select().from(blogArticles).orderBy(desc(blogArticles.published));
  }

  async getBlogArticlesByCategory(category: string): Promise<BlogArticle[]> {
    return await db.select().from(blogArticles)
      .where(eq(blogArticles.category, category))
      .orderBy(desc(blogArticles.published));
  }

  async createBlogArticle(article: InsertBlogArticle): Promise<BlogArticle> {
    const [newArticle] = await db
      .insert(blogArticles)
      .values(article)
      .returning();
    return newArticle;
  }

  async updateBlogArticle(id: string, article: Partial<InsertBlogArticle>): Promise<BlogArticle> {
    const [updatedArticle] = await db
      .update(blogArticles)
      .set(article)
      .where(eq(blogArticles.id, id))
      .returning();
    return updatedArticle;
  }

  async deleteBlogArticle(id: string): Promise<void> {
    await db.delete(blogArticles).where(eq(blogArticles.id, id));
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(desc(sql`COALESCE(${testimonials.featured}, ${testimonials.createdAt})`));
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db
      .insert(testimonials)
      .values(testimonial)
      .returning();
    return newTestimonial;
  }

  async updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    const [updatedTestimonial] = await db
      .update(testimonials)
      .set(testimonial)
      .where(eq(testimonials.id, id))
      .returning();
    return updatedTestimonial;
  }

  async deleteTestimonial(id: string): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }

  // Admin user operations
  async getAdminUser(id: string): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
    return admin || undefined;
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return admin || undefined;
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
    return admin || undefined;
  }

  async createAdminUser(adminUser: InsertAdminUser): Promise<AdminUser> {
    const [newAdmin] = await db
      .insert(adminUsers)
      .values(adminUser)
      .returning();
    return newAdmin;
  }

  async updateAdminLastLogin(id: string): Promise<void> {
    await db
      .update(adminUsers)
      .set({ lastLogin: new Date() })
      .where(eq(adminUsers.id, id));
  }

  // Contact submissions updates
  async updateContactStatus(id: string, status: UpdateContactStatus): Promise<ContactSubmission> {
    const updateData: any = {
      status: status.status,
      respondedAt: status.status === 'responded' ? new Date() : null,
    };
    
    if (status.adminNotes !== undefined) {
      updateData.adminNotes = status.adminNotes;
    }
    
    if (status.respondedBy !== undefined) {
      updateData.respondedBy = status.respondedBy;
    }

    const [updated] = await db
      .update(contactSubmissions)
      .set(updateData)
      .where(eq(contactSubmissions.id, id))
      .returning();
    return updated;
  }

  // Testimonials updates
  async getActiveTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials)
      .where(eq(testimonials.isActive, true))
      .orderBy(desc(sql`COALESCE(${testimonials.featured}, ${testimonials.createdAt})`));
  }

  // Packages operations
  async getPackages(): Promise<Package[]> {
    return await db.select().from(packages).orderBy(desc(packages.createdAt));
  }

  async getActivePackages(): Promise<Package[]> {
    return await db.select().from(packages)
      .where(eq(packages.isActive, true))
      .orderBy(desc(packages.createdAt));
  }

  async getPackagesByCategory(category: string): Promise<Package[]> {
    return await db.select().from(packages)
      .where(sql`${packages.category} = ${category} AND ${packages.isActive} = true`)
      .orderBy(desc(packages.createdAt));
  }

  async getPackage(id: string): Promise<Package | undefined> {
    const [pkg] = await db.select().from(packages).where(eq(packages.id, id));
    return pkg || undefined;
  }

  async createPackage(pkg: InsertPackage): Promise<Package> {
    const [newPackage] = await db
      .insert(packages)
      .values(pkg)
      .returning();
    return newPackage;
  }

  async updatePackage(id: string, pkg: Partial<InsertPackage>): Promise<Package> {
    const [updatedPackage] = await db
      .update(packages)
      .set(pkg)
      .where(eq(packages.id, id))
      .returning();
    return updatedPackage;
  }

  async archivePackage(id: string): Promise<Package> {
    const [archivedPackage] = await db
      .update(packages)
      .set({ isActive: false })
      .where(eq(packages.id, id))
      .returning();
    return archivedPackage;
  }

  async deletePackage(id: string): Promise<void> {
    const hasPayments = await this.hasPaymentsForPackage(id);
    if (hasPayments) {
      throw new Error("PACKAGE_HAS_PAYMENTS");
    }
    await db.delete(packages).where(eq(packages.id, id));
  }

  async hasPaymentsForPackage(id: string): Promise<boolean> {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(payments)
      .where(eq(payments.packageId, id));
    return result[0]?.count > 0;
  }

  // Payments operations
  async getPayments(): Promise<Payment[]> {
    return await db.select().from(payments).orderBy(desc(payments.createdAt));
  }

  async getPayment(id: string): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.id, id));
    return payment || undefined;
  }

  async getPaymentByOrderId(orderId: string): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.razorpayOrderId, orderId));
    return payment || undefined;
  }

  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [newPayment] = await db
      .insert(payments)
      .values(payment)
      .returning();
    return newPayment;
  }

  async updatePayment(id: string, payment: Partial<InsertPayment>): Promise<Payment> {
    const [updatedPayment] = await db
      .update(payments)
      .set(payment)
      .where(eq(payments.id, id))
      .returning();
    return updatedPayment;
  }

  async updatePaymentStatus(id: string, status: string, paymentDetails?: any): Promise<Payment> {
    const updateData: any = {
      status,
      paidAt: status === 'success' ? new Date() : null,
    };

    if (paymentDetails) {
      if (paymentDetails.paymentId) updateData.razorpayPaymentId = paymentDetails.paymentId;
      if (paymentDetails.signature) updateData.razorpaySignature = paymentDetails.signature;
      if (paymentDetails.method) updateData.paymentMethod = paymentDetails.method;
    }

    const [updatedPayment] = await db
      .update(payments)
      .set(updateData)
      .where(eq(payments.id, id))
      .returning();
    return updatedPayment;
  }

  // Photo Gallery operations
  async getPhotoGalleryItems(): Promise<PhotoGallery[]> {
    return await db.select().from(photoGallery)
      .orderBy(photoGallery.displayOrder, desc(photoGallery.createdAt));
  }

  async getActivePhotoGalleryItems(): Promise<PhotoGallery[]> {
    return await db.select().from(photoGallery)
      .where(eq(photoGallery.isActive, true))
      .orderBy(photoGallery.displayOrder, desc(photoGallery.createdAt));
  }

  async createPhotoGalleryItem(photo: InsertPhotoGallery): Promise<PhotoGallery> {
    const [newPhoto] = await db
      .insert(photoGallery)
      .values(photo)
      .returning();
    return newPhoto;
  }

  async deletePhotoGalleryItem(id: string): Promise<void> {
    await db.delete(photoGallery).where(eq(photoGallery.id, id));
  }
}

export const storage = new DatabaseStorage();
