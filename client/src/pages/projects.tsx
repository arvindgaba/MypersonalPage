import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

const projectsData = [
  {
    id: 1,
    category: "AI & Automation",
    title: "AI-Powered Retail Virtual Advisor",
    description: "Implemented WhatsApp Business-integrated AI advisor with CRM connectivity for lead qualification and appointment booking.",
    businessImpact: "15% increase in qualified leads, 30% reduction in call center volume, improved customer engagement ROI",
    technologies: ["WhatsApp Business API", "CRM Integration", "AI/NLP", "Real-time Analytics"],
    metrics: {
      leadIncrease: "15%",
      callReduction: "30%",
      processTime: "Real-time"
    },
    icon: "robot",
    gradient: "from-purple-600 to-cyan-500"
  },
  {
    id: 2,
    category: "Low-Code Platform",
    title: "Enterprise Low-Code Ecosystem",
    description: "Launched comprehensive Low-Code platform delivering 20+ business applications including Expense Management, Vendor Onboarding, and Customer Management.",
    businessImpact: "Reduced approval cycles from days to hours, processed 2400+ requests, enabled real-time analytics across operations",
    technologies: ["Power Platform", "Microsoft Dynamics", "Workflow Automation", "Real-time Dashboards"],
    metrics: {
      applications: "20+",
      requests: "2400+",
      timeReduction: "Days to Hours"
    },
    icon: "code",
    gradient: "from-blue-600 to-purple-500"
  },
  {
    id: 3,
    category: "Cloud Migration",
    title: "Azure Infrastructure Transformation",
    description: "Led comprehensive cloud migration moving 70% of legacy systems to Microsoft Azure with enhanced security and compliance.",
    businessImpact: "25% improvement in system uptime, reduced infrastructure overhead, enhanced disaster recovery capabilities",
    technologies: ["Microsoft Azure", "VM Migration", "Cloud Security", "Backup Solutions"],
    metrics: {
      systemsMigrated: "70%",
      uptimeImprovement: "25%",
      dataProtected: "56TB"
    },
    icon: "cloud",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    id: 4,
    category: "Process Automation",
    title: "RPA & Intelligent Workflows",
    description: "Implemented comprehensive RPA solution with bilingual (EN/AR) HR Process Agent using SOP-Agent architecture.",
    businessImpact: "40% reduction in HR support tickets, 20% decrease in manual effort, improved policy compliance",
    technologies: ["RPA Bots", "Process Mining", "SOP-Agent Architecture", "Intelligent Automation"],
    metrics: {
      ticketReduction: "40%",
      effortSaving: "20%",
      processesAutomated: "50+"
    },
    icon: "cogs",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    id: 5,
    category: "B2B Platform",
    title: "Digital B2B Marketplace",
    description: "Spearheaded end-to-end B2B marketplace implementation with SAP ERP, OMS, PIM, and payment gateway integrations.",
    businessImpact: "Streamlined supplier onboarding, automated order processing, enhanced customer acquisition tracking",
    technologies: ["SAP ERP", "Order Management System", "Payment Gateways", "Google Analytics"],
    metrics: {
      integrations: "4 Major Systems",
      automation: "100%",
      tracking: "Real-time KPIs"
    },
    icon: "store",
    gradient: "from-green-500 to-teal-500"
  },
  {
    id: 6,
    category: "CRM Transformation",
    title: "Multi-Instance CRM Optimization",
    description: "Deployed and optimized three CRM instances with unified lead capture from multiple channels and process standardization.",
    businessImpact: "Centralized lead visibility, improved sales responsiveness, enhanced pipeline tracking and win ratio analysis",
    technologies: ["Zoho CRM", "Multi-channel Integration", "Workflow Automation", "Analytics Dashboards"],
    metrics: {
      crmInstances: "3",
      leadChannels: "Multiple",
      visibility: "Centralized"
    },
    icon: "users-cog",
    gradient: "from-indigo-500 to-purple-600"
  },
  {
    id: 7,
    category: "Cost Optimization",
    title: "Infrastructure Cost Optimization",
    description: "Led comprehensive cost optimization initiative including password management self-hosting, GFI migration to on-premises, and licensing strategy optimization.",
    businessImpact: "Achieved AED 1,440 annual savings from password management, AED 4,000 monthly savings from GFI migration, AED 5,658 saved from PDF editor licensing shift",
    technologies: ["Self-hosted Solutions", "On-premises Migration", "License Management", "Cost Analytics"],
    metrics: {
      annualSavings: "AED 1,440",
      monthlySavings: "AED 4,000", 
      licensingSavings: "AED 5,658"
    },
    icon: "chart-line-up",
    gradient: "from-emerald-500 to-green-600"
  },
  {
    id: 8,
    category: "Security & Compliance",
    title: "Enterprise Security Framework",
    description: "Implemented comprehensive security framework with MDM, endpoint protection, and compliance alignment with ISO 27001 and GDPR.",
    businessImpact: "Enhanced security posture, ensured regulatory compliance, reduced security incident risk",
    technologies: ["Microsoft Intune", "Sophos Protection", "Cisco Umbrella", "ISO 27001 Framework"],
    metrics: {
      devicesSecured: "Enterprise-wide",
      compliance: "ISO 27001",
      incidents: "Zero Breaches"
    },
    icon: "shield-check",
    gradient: "from-red-500 to-pink-500"
  },
  {
    id: 9,
    category: "Data Management",
    title: "Data Architecture & Backup Strategy",
    description: "Designed unified backup strategy across cloud and on-premises environments with comprehensive data governance.",
    businessImpact: "Protected 56TB of critical data, improved disaster recovery capabilities, reduced backup costs",
    technologies: ["Azure Backup", "On-premises NAS", "Data Governance", "Disaster Recovery"],
    metrics: {
      dataProtected: "56TB",
      environments: "Hybrid",
      costReduction: "Significant"
    },
    icon: "database",
    gradient: "from-violet-500 to-purple-600"
  },
  {
    id: 10,
    category: "Team Leadership",
    title: "Strategic Talent Development",
    description: "Led talent retention strategy with proactive performance management and succession planning for 55+ team members.",
    businessImpact: "Reduced talent flight risk, improved team performance, enhanced skill development and career progression",
    technologies: ["Performance Management", "Succession Planning", "Skills Development", "Team Analytics"],
    metrics: {
      teamMembers: "55+",
      retentionRate: "High",
      development: "Continuous"
    },
    icon: "users",
    gradient: "from-amber-500 to-yellow-500"
  },
  {
    id: 11,
    category: "Delivery Optimization",
    title: "FarEye Routing & Address Accuracy",
    description: "Implemented FarEye delivery routing automation with Google Maps API integration for precise address selection and 5G router backup connectivity.",
    businessImpact: "Reduced delivery failures, minimized fuel costs, ensured business continuity with 99% POS uptime in unreliable connectivity areas",
    technologies: ["FarEye Platform", "Google Maps API", "5G Routers", "Routing Automation"],
    metrics: {
      deliveryAccuracy: "Improved",
      fuelSavings: "Significant",
      posUptime: "99%"
    },
    icon: "route",
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: 12,
    category: "E-Commerce Innovation",
    title: "PunchOut Catalog & E-Invoicing",
    description: "Facilitated B2B procurement with OCI/cXML PunchOut integration and implemented SAP-ClearTax-ZATCA integration for real-time invoice processing.",
    businessImpact: "Streamlined B2B procurement experience, achieved compliance with KSA regulations, enabled real-time invoice processing",
    technologies: ["OCI/cXML", "PunchOut Integration", "SAP", "ClearTax", "ZATCA Fatura"],
    metrics: {
      integration: "Seamless B2B",
      compliance: "KSA Certified", 
      processing: "Real-time"
    },
    icon: "file-invoice",
    gradient: "from-teal-500 to-cyan-500"
  }
];

const getIconClass = (icon: string) => {
  const iconMap: Record<string, string> = {
    'robot': 'fas fa-robot',
    'code': 'fas fa-code',
    'cloud': 'fas fa-cloud',
    'cogs': 'fas fa-cogs',
    'store': 'fas fa-store',
    'users-cog': 'fas fa-users-cog',
    'chart-line-up': 'fas fa-chart-line',
    'shield-check': 'fas fa-shield-alt',
    'database': 'fas fa-database',
    'users': 'fas fa-users',
    'route': 'fas fa-route',
    'file-invoice': 'fas fa-file-invoice'
  };
  return iconMap[icon] || 'fas fa-project-diagram';
};

export default function Projects() {
  const { data: personalData } = useQuery({
    queryKey: ['/api/profile/personal'],
  });

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 relative overflow-hidden">
      <title>Projects & Implementations - Arvind Gaba</title>
      <meta name="description" content="Comprehensive portfolio of technology projects, implementations, and business impact achievements by Arvind Gaba" />
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="particle" style={{ top: '10%', animationDelay: '0s' }}></div>
        <div className="particle" style={{ top: '30%', animationDelay: '3s' }}></div>
        <div className="particle" style={{ top: '50%', animationDelay: '6s' }}></div>
        <div className="particle" style={{ top: '70%', animationDelay: '2s' }}></div>
        <div className="particle" style={{ top: '90%', animationDelay: '8s' }}></div>
      </div>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gradient hover:opacity-80 transition-opacity">
            Arvind Gaba
          </Link>
          <Link href="/">
            <Button variant="outline" className="glass-effect hover:bg-white/10 border-slate-600">
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>
      
      {/* Header Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              Digital Transformation Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-4xl mx-auto">
              Comprehensive showcase of strategic technology initiatives delivering measurable business impact across enterprise operations
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="glass-effect px-6 py-3 rounded-full">
                <i className="fas fa-project-diagram text-cyan-400 mr-2"></i>
                {projectsData.length} Major Implementations
              </div>
              <div className="glass-effect px-6 py-3 rounded-full">
                <i className="fas fa-chart-trending-up text-yellow-500 mr-2"></i>
                Proven ROI & Cost Savings
              </div>
              <div className="glass-effect px-6 py-3 rounded-full">
                <i className="fas fa-trophy text-purple-400 mr-2"></i>
                Award-Winning Solutions
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="py-16 bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projectsData.map((project) => (
              <div key={project.id} className="glass-effect rounded-2xl p-8 hover:bg-white/5 transition-all transform hover:scale-[1.02]">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${project.gradient} rounded-xl flex items-center justify-center mr-4 shadow-lg`}>
                      <i className={`${getIconClass(project.icon)} text-white text-2xl`}></i>
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2 bg-slate-700 text-slate-200">
                        {project.category}
                      </Badge>
                      <h3 className="text-2xl font-semibold text-cyan-400">{project.title}</h3>
                    </div>
                  </div>
                </div>
                
                {/* Project Description */}
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Business Impact */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-yellow-500 mb-2">
                    <i className="fas fa-chart-bar mr-2"></i>Business Impact
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {project.businessImpact}
                  </p>
                </div>
                
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(project.metrics).map(([key, value], index) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl font-bold text-gradient mb-1">{value}</div>
                      <div className="text-xs text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                    </div>
                  ))}
                </div>
                
                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-purple-400 mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
            Ready to Drive Your Digital Transformation?
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Let's discuss how these proven strategies and implementations can accelerate your organization's technology goals
          </p>
          <Link href="/#contact">
            <Button className="px-8 py-4 neural-gradient hover:opacity-90 rounded-xl text-white font-semibold transition-all transform hover:scale-105 shadow-lg">
              <i className="fas fa-rocket mr-2"></i>
              Start Your Transformation Journey
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-slate-400">
              © {new Date().getFullYear()} {personalData?.name || "Arvind Gaba"}. Strategic Technology Leadership & Digital Transformation.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}