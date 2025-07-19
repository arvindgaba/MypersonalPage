import { 
  users, 
  profileContent,
  contactSubmissions,
  type User, 
  type InsertUser,
  type ProfileContent,
  type InsertProfileContent,
  type ContactSubmission,
  type InsertContactSubmission
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProfileContent(section: string): Promise<ProfileContent | undefined>;
  getAllProfileContent(): Promise<ProfileContent[]>;
  updateProfileContent(content: InsertProfileContent): Promise<ProfileContent>;
  
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private profileContent: Map<string, ProfileContent>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private currentUserId: number;
  private currentContentId: number;
  private currentSubmissionId: number;

  constructor() {
    this.users = new Map();
    this.profileContent = new Map();
    this.contactSubmissions = new Map();
    this.currentUserId = 1;
    this.currentContentId = 1;
    this.currentSubmissionId = 1;
    
    // Initialize with Arvind's profile data
    this.initializeProfileData();
  }

  private initializeProfileData() {
    const defaultContent = [
      {
        section: "personal",
        content: {
          name: "Arvind Gaba",
          title: "Digital Technology & AI Transformation Leader",
          subtitle: "Deputy General Manager - IT",
          location: "Dubai, UAE",
          experience: "20+",
          email: "arvindgaba.ae+profile@gmail.com",
          phone: "+971 5634500",
          linkedin: "linkedin.com/in/arvindgaba"
        }
      },
      {
        section: "hero",
        content: {
          description: "Accomplished IT leader with over 20 years of global experience driving digital transformation, enterprise architecture strategy, and high-performance IT operations across complex, multinational organizations.",
          stats: {
            experience: "20+",
            awards: "6",
            projects: "50+"
          }
        }
      },
      {
        section: "achievements",
        content: [
          {
            title: "AI Virtual Advisor",
            subtitle: "WhatsApp Business Integration",
            description: "Implemented AI-powered Retail Virtual Advisor Agent with CRM integration, achieving 15% increase in qualified leads and 30% reduction in call center volume.",
            metrics: ["+15% Leads", "-30% Call Volume"],
            icon: "robot"
          },
          {
            title: "Cloud Migration",
            subtitle: "Microsoft Azure Infrastructure",
            description: "Led cloud migration initiative moving 70% of legacy systems to Azure, improving system uptime by 25% and reducing infrastructure overhead.",
            metrics: ["+25% Uptime", "70% Migrated"],
            icon: "cloud"
          },
          {
            title: "Process Automation",
            subtitle: "RPA & Intelligent Workflows",
            description: "Implemented RPA and intelligent workflows reducing manual effort by 20% and HR support tickets by 40% through bilingual process automation.",
            metrics: ["-20% Manual Effort", "-40% HR Tickets"],
            icon: "cogs"
          },
          {
            title: "Budget Optimization",
            subtitle: "$5M IT Portfolio Management",
            description: "Managed $5 million IT budget, optimizing vendor contracts and achieving 15% cost savings while maintaining service levels and SLA adherence.",
            metrics: ["$5M Budget", "15% Savings"],
            icon: "dollar-sign"
          },
          {
            title: "Low Code Platform",
            subtitle: "20+ Business Applications",
            description: "Launched Low Code initiative delivering 20+ applications including Expense Management, Vendor Onboarding, and Customer Management systems.",
            metrics: ["20+ Apps", "Hours vs Days"],
            icon: "code"
          },
          {
            title: "Security & Compliance",
            subtitle: "ISO 27001 & GDPR Alignment",
            description: "Established robust IT governance frameworks ensuring alignment with ISO 27001, GDPR, and ITIL standards with comprehensive disaster recovery SOPs.",
            metrics: ["ISO 27001", "GDPR Ready"],
            icon: "shield-alt"
          }
        ]
      },
      {
        section: "timeline",
        content: [
          {
            title: "Deputy General Manager - IT",
            company: "Sharaf DG LLC",
            period: "2018 - Present",
            description: "Led digital transformation initiatives, AI-powered automation, and cloud migration strategies across multinational retail operations.",
            icon: "crown"
          },
          {
            title: "Delivery Associate Director",
            company: "NTT Data Services",
            period: "2011 - 2018",
            description: "Directed $60M IT service delivery portfolio, achieved 99% SLA compliance, and pioneered cloud-first strategies for global customers.",
            icon: "network-wired"
          },
          {
            title: "Systems Manager",
            company: "UBS India Service",
            period: "2007 - 2011",
            description: "Led Windows Security Patch Management and architected the One User Platform project for global Windows 7 deployment.",
            icon: "server"
          },
          {
            title: "Technology Foundation",
            company: "Accenture & Convergys",
            period: "2003 - 2007",
            description: "Built foundational expertise in enterprise systems management, security implementations, and global IT operations.",
            icon: "rocket"
          }
        ]
      },
      {
        section: "awards",
        content: [
          {
            title: "Top DT100 Leader",
            organization: "UAE - 2025",
            description: "Digital Transformation Excellence Award",
            icon: "trophy"
          },
          {
            title: "Best AI & Automation",
            organization: "UAE Retail - 2024",
            description: "AI-Powered Retail Innovation",
            icon: "robot"
          },
          {
            title: "IT Innovation Award",
            organization: "Best Employee - 2023",
            description: "Outstanding Technology Innovation",
            icon: "lightbulb"
          },
          {
            title: "Leadership Excellence",
            organization: "Gold Award - 2021",
            description: "Best Performance in Leadership Role",
            icon: "medal"
          },
          {
            title: "People Manager",
            organization: "NTT Data - 2018",
            description: "Best People Management Excellence",
            icon: "users"
          },
          {
            title: "Silver Excellence",
            organization: "Dell Award - 2016",
            description: "Outstanding Service Delivery",
            icon: "award"
          },
          {
            title: "Bronze Award Winner",
            organization: "Dell - July 2012",
            description: "Outstanding Team Performance",
            icon: "award"
          },
          {
            title: "$100M Revenue Milestone",
            organization: "APJ Region - 2011",
            description: "Key Contributor to Major Revenue Achievement",
            icon: "trophy"
          },
          {
            title: "India Sub-Region Lead",
            organization: "Leadership Role - 2011",
            description: "Regional Technology Leadership",
            icon: "crown"
          },
          {
            title: "IT Tech Wiz Award",
            organization: "October 2010",
            description: "Technical Excellence Recognition",
            icon: "lightbulb"
          },
          {
            title: "Best Performer",
            organization: "UBS - May 2008 & 2009",
            description: "Consecutive Years Excellence",
            icon: "medal"
          },
          {
            title: "Instant Karma Award",
            organization: "Accenture - 2007",
            description: "Best Quarterly Performance",
            icon: "star"
          },
          {
            title: "SME & Functional Lead",
            organization: "Metrics & Reporting - 2013",
            description: "Subject Matter Expert for Analytics",
            icon: "chart-line"
          }
        ]
      }
    ];

    defaultContent.forEach(item => {
      const content: ProfileContent = {
        id: this.currentContentId++,
        section: item.section,
        content: item.content,
        updatedAt: new Date().toISOString()
      };
      this.profileContent.set(item.section, content);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProfileContent(section: string): Promise<ProfileContent | undefined> {
    return this.profileContent.get(section);
  }

  async getAllProfileContent(): Promise<ProfileContent[]> {
    return Array.from(this.profileContent.values());
  }

  async updateProfileContent(content: InsertProfileContent): Promise<ProfileContent> {
    const existing = this.profileContent.get(content.section);
    const updated: ProfileContent = {
      id: existing?.id || this.currentContentId++,
      section: content.section,
      content: content.content,
      updatedAt: new Date().toISOString()
    };
    this.profileContent.set(content.section, updated);
    return updated;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentSubmissionId++;
    const contactSubmission: ContactSubmission = {
      ...submission,
      id,
      submittedAt: new Date().toISOString()
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }
}

export const storage = new MemStorage();
