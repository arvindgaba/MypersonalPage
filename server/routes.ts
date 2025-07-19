import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProfileContentSchema, insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all profile content
  app.get("/api/profile", async (req, res) => {
    try {
      const content = await storage.getAllProfileContent();
      const formattedContent = content.reduce((acc, item) => {
        acc[item.section] = item.content;
        return acc;
      }, {} as Record<string, any>);
      res.json(formattedContent);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch profile content" });
    }
  });

  // Get specific section content
  app.get("/api/profile/:section", async (req, res) => {
    try {
      const { section } = req.params;
      const content = await storage.getProfileContent(section);
      if (!content) {
        return res.status(404).json({ message: "Section not found" });
      }
      res.json(content.content);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch section content" });
    }
  });

  // Update profile content
  app.put("/api/profile/:section", async (req, res) => {
    try {
      const { section } = req.params;
      const updateData = {
        section,
        content: req.body,
        updatedAt: new Date().toISOString()
      };

      const validation = insertProfileContentSchema.safeParse(updateData);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid content format",
          errors: validation.error.errors 
        });
      }

      const updatedContent = await storage.updateProfileContent(validation.data);
      res.json(updatedContent);
    } catch (error) {
      res.status(500).json({ message: "Failed to update content" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validation = insertContactSubmissionSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid contact form data",
          errors: validation.error.errors 
        });
      }

      const submission = await storage.createContactSubmission(validation.data);
      
      // TODO: Implement email notification here
      // You could use nodemailer to send email notifications
      
      res.json({ 
        message: "Contact form submitted successfully",
        id: submission.id 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Get contact submissions (admin only)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  // Download resume endpoint
  app.get("/api/resume/download", async (req, res) => {
    try {
      // For now, return a link to the PDF or generate one
      // This could be enhanced to generate a PDF from the profile data
      res.json({ 
        message: "Resume download link",
        downloadUrl: "/api/resume/arvind-gaba-resume.pdf"
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to generate resume download" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
