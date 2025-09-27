import { 
  users, 
  contactSubmissions, 
  blogArticles,
  testimonials,
  type User, 
  type InsertUser, 
  type ContactSubmission, 
  type InsertContact,
  type BlogArticle,
  type InsertBlogArticle,
  type Testimonial,
  type InsertTestimonial
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact submissions
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Blog articles
  getBlogArticles(): Promise<BlogArticle[]>;
  getBlogArticlesByCategory(category: string): Promise<BlogArticle[]>;
  createBlogArticle(article: InsertBlogArticle): Promise<BlogArticle>;
  updateBlogArticle(id: string, article: Partial<InsertBlogArticle>): Promise<BlogArticle>;
  deleteBlogArticle(id: string): Promise<void>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial>;
  deleteTestimonial(id: string): Promise<void>;
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
}

export const storage = new DatabaseStorage();
