import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSchema, 
  insertBlogArticleSchema, 
  insertTestimonialSchema, 
  insertUserSchema,
  insertAdminUserSchema,
  insertPackageSchema,
  insertPaymentSchema,
  updateContactStatusSchema
} from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import Razorpay from "razorpay";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Admin middleware
const requireAdmin = async (req: any, res: any, next: any) => {
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

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contactSubmission = await storage.createContactSubmission(validatedData);
      
      res.json({ 
        success: true, 
        message: "Contact form submitted successfully",
        id: contactSubmission.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
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

  // Get all contact submissions (for admin use)
  app.get("/api/contact-submissions", async (req, res) => {
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

  // Authentication API
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: "Username already exists" 
        });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      
      // Create user
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword
      });
      
      // Set session
      (req.session as any).userId = user.id;
      (req.session as any).username = user.username;
      
      res.json({ 
        success: true, 
        message: "User registered successfully",
        user: { id: user.id, username: user.username }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
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

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ 
          success: false, 
          message: "Username and password are required" 
        });
      }
      
      // Find user
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: "Invalid username or password" 
        });
      }
      
      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ 
          success: false, 
          message: "Invalid username or password" 
        });
      }
      
      // Set session
      (req.session as any).userId = user.id;
      (req.session as any).username = user.username;
      
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

  app.post("/api/auth/logout", async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ 
            success: false, 
            message: "Logout failed" 
          });
        }
        res.clearCookie('connect.sid');
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

  app.get("/api/auth/me", async (req, res) => {
    try {
      const session = req.session as any;
      if (!session.userId) {
        return res.status(401).json({ 
          success: false, 
          message: "Not authenticated" 
        });
      }
      
      const user = await storage.getUser(session.userId);
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

  // Blog Articles API
  app.get("/api/blog-articles", async (req, res) => {
    try {
      const category = req.query.category as string;
      const articles = category && category !== "all" 
        ? await storage.getBlogArticlesByCategory(category)
        : await storage.getBlogArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch blog articles" 
      });
    }
  });

  app.post("/api/blog-articles", async (req, res) => {
    try {
      const validatedData = insertBlogArticleSchema.parse(req.body);
      const article = await storage.createBlogArticle(validatedData);
      res.json({ 
        success: true, 
        message: "Blog article created successfully",
        article 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
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

  // Testimonials API
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testimonials" 
      });
    }
  });

  app.post("/api/testimonials", async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.json({ 
        success: true, 
        message: "Testimonial created successfully",
        testimonial 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
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

  // ===============================
  // PAYMENT ROUTES
  // ===============================

  // Create Razorpay Order
  app.post("/api/create-payment-order", async (req, res) => {
    try {
      const { packageId, customerName, customerEmail, customerPhone, notes } = req.body;
      
      // Get package details
      const packages = await storage.getPackages();
      const selectedPackage = packages.find(pkg => pkg.id === packageId);
      
      if (!selectedPackage) {
        return res.status(404).json({
          success: false,
          message: "Package not found"
        });
      }

      // Create Razorpay order
      const amount = Math.round(parseFloat(selectedPackage.price) * 100); // Amount in paise
      const currency = "INR";
      
      const razorpayOrder = await razorpay.orders.create({
        amount,
        currency,
        receipt: `receipt_${Date.now()}`,
        notes: {
          packageId,
          customerName,
          customerEmail,
          customerPhone,
          notes: notes || ""
        }
      });

      // Store payment record in database
      const paymentData = {
        razorpayOrderId: razorpayOrder.id,
        packageId,
        customerName,
        customerEmail,
        customerPhone,
        amount: selectedPackage.price,
        status: "pending" as const,
        paymentMethod: "card" as const,
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

  // Payment verification
  app.post("/api/verify-payment", async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      
      // Verify signature
      const crypto = require('crypto');
      const generated_signature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex');

      if (generated_signature !== razorpay_signature) {
        return res.status(400).json({
          success: false,
          message: "Payment verification failed"
        });
      }

      // Update payment status
      const payments = await storage.getPayments();
      const payment = payments.find(p => p.razorpayOrderId === razorpay_order_id);
      
      if (!payment) {
        return res.status(404).json({
          success: false,
          message: "Payment record not found"
        });
      }

      // Update payment record
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

  // ===============================
  // ADMIN AUTHENTICATION ROUTES
  // ===============================

  // Admin login
  app.post("/api/admin/auth/login", async (req, res) => {
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
      
      // Update last login
      await storage.updateAdminLastLogin(admin.id);
      
      // Set session
      (req.session as any).adminUserId = admin.id;
      (req.session as any).adminUsername = admin.username;
      
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

  // Admin logout
  app.post("/api/admin/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Logout failed" });
      }
      res.json({ success: true, message: "Logged out successfully" });
    });
  });

  // Get current admin user
  app.get("/api/admin/auth/me", requireAdmin, (req: any, res) => {
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

  // ===============================
  // ADMIN CONTACT MANAGEMENT
  // ===============================

  // Update contact submission status
  app.patch("/api/admin/contacts/:id/status", requireAdmin, async (req: any, res) => {
    try {
      const { id } = req.params;
      const statusData = updateContactStatusSchema.parse(req.body);
      
      if (statusData.respondedBy === undefined && statusData.status === 'responded') {
        statusData.respondedBy = req.admin.username;
      }
      
      const updated = await storage.updateContactStatus(id, statusData);
      res.json({ success: true, data: updated, message: "Contact status updated" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid status data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to update contact status" });
      }
    }
  });

  // ===============================
  // ADMIN BLOG MANAGEMENT
  // ===============================

  // Admin get all blog articles
  app.get("/api/admin/blog-articles", requireAdmin, async (req, res) => {
    try {
      const articles = await storage.getBlogArticles();
      res.json({ success: true, data: articles });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch blog articles" });
    }
  });

  // Admin update blog article
  app.put("/api/admin/blog-articles/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertBlogArticleSchema.partial().parse(req.body);
      const article = await storage.updateBlogArticle(id, validatedData);
      res.json({ success: true, data: article, message: "Blog article updated successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid article data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to update blog article" });
      }
    }
  });

  // Admin delete blog article
  app.delete("/api/admin/blog-articles/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteBlogArticle(id);
      res.json({ success: true, message: "Blog article deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete blog article" });
    }
  });

  // ===============================
  // ADMIN TESTIMONIALS MANAGEMENT
  // ===============================

  // Admin get all testimonials
  app.get("/api/admin/testimonials", requireAdmin, async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json({ success: true, data: testimonials });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch testimonials" });
    }
  });

  // Admin create testimonial
  app.post("/api/admin/testimonials", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.json({ success: true, data: testimonial, message: "Testimonial created successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid testimonial data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to create testimonial" });
      }
    }
  });

  // Admin update testimonial
  app.put("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertTestimonialSchema.partial().parse(req.body);
      const testimonial = await storage.updateTestimonial(id, validatedData);
      res.json({ success: true, data: testimonial, message: "Testimonial updated successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid testimonial data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to update testimonial" });
      }
    }
  });

  // Admin delete testimonial
  app.delete("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteTestimonial(id);
      res.json({ success: true, message: "Testimonial deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete testimonial" });
    }
  });

  // ===============================
  // ADMIN PACKAGES MANAGEMENT
  // ===============================

  // Admin get all packages
  app.get("/api/admin/packages", requireAdmin, async (req, res) => {
    try {
      const packages = await storage.getPackages();
      res.json({ success: true, data: packages });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch packages" });
    }
  });

  // Admin create package
  app.post("/api/admin/packages", requireAdmin, async (req, res) => {
    try {
      const validatedData = insertPackageSchema.parse(req.body);
      const pkg = await storage.createPackage(validatedData);
      res.json({ success: true, data: pkg, message: "Package created successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid package data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to create package" });
      }
    }
  });

  // Admin update package
  app.put("/api/admin/packages/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertPackageSchema.partial().parse(req.body);
      const pkg = await storage.updatePackage(id, validatedData);
      res.json({ success: true, data: pkg, message: "Package updated successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid package data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Failed to update package" });
      }
    }
  });

  // Admin delete package
  app.delete("/api/admin/packages/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deletePackage(id);
      res.json({ success: true, message: "Package deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete package" });
    }
  });

  // ===============================
  // ADMIN PAYMENTS MANAGEMENT
  // ===============================

  // Admin get all payments
  app.get("/api/admin/payments", requireAdmin, async (req, res) => {
    try {
      const payments = await storage.getPayments();
      res.json({ success: true, data: payments });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch payments" });
    }
  });

  // ===============================
  // PUBLIC PACKAGE ROUTES
  // ===============================

  // Get active packages for frontend
  app.get("/api/packages", async (req, res) => {
    try {
      const { category } = req.query;
      const packages = category && category !== "all" 
        ? await storage.getPackagesByCategory(category as string)
        : await storage.getActivePackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch packages" });
    }
  });

  // Update frontend testimonials route to use active testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getActiveTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testimonials" 
      });
    }
  });

  // Create payment order
  app.post("/api/create-payment-order", async (req, res) => {
    try {
      const { packageId, customerName, customerEmail, customerPhone, notes } = req.body;
      
      if (!packageId || !customerName || !customerEmail || !customerPhone) {
        return res.status(400).json({ 
          success: false, 
          message: "Package ID, name, email and phone are required" 
        });
      }
      
      // Get package details
      const pkg = await storage.getPackage(packageId);
      if (!pkg || !pkg.isActive) {
        return res.status(404).json({ 
          success: false, 
          message: "Package not found or inactive" 
        });
      }
      
      // Create payment record
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
      
      // For now, return the payment ID as order ID since we're not integrating actual Razorpay yet
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

  const httpServer = createServer(app);
  return httpServer;
}
