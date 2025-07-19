export default function ExpertiseSection() {
  const skills = [
    { name: "Cloud Platforms (Azure, O365)", level: 95, color: "from-cyan-400 to-purple-400" },
    { name: "Agentic AI & Microsoft CoPilot Studio", level: 94, color: "from-purple-400 to-pink-500" },
    { name: "Enterprise Architecture", level: 92, color: "from-purple-400 to-yellow-500" },
    { name: "Infrastructure & Network Security", level: 93, color: "from-red-500 to-orange-500" },
    { name: "Cybersecurity & Compliance (ISO 27001)", level: 91, color: "from-orange-500 to-red-600" },
    { name: "AI Automation (N8N, Process Mining)", level: 88, color: "from-yellow-500 to-cyan-400" },
    { name: "ERP/CRM (SAP, Dynamics 365)", level: 90, color: "from-blue-600 to-cyan-400" },
    { name: "Team Leadership & Strategy", level: 96, color: "from-purple-400 to-blue-600" }
  ];

  const certifications = [
    {
      title: "Azure Solutions Architect",
      subtitle: "Microsoft Certified Expert",
      icon: "fab fa-microsoft",
      color: "from-blue-600/20 to-cyan-400/20",
      borderColor: "border-cyan-400/30"
    },
    {
      title: "Azure Administrator",
      subtitle: "Microsoft Certified Associate",
      icon: "fab fa-microsoft",
      color: "from-cyan-400/20 to-blue-600/20",
      borderColor: "border-cyan-400/30"
    },
    {
      title: "Microsoft 365",
      subtitle: "Certified Fundamentals",
      icon: "fab fa-microsoft",
      color: "from-blue-600/20 to-purple-400/20",
      borderColor: "border-blue-600/30"
    },
    {
      title: "ITIL v4 Foundation", 
      subtitle: "AXELOS Certified",
      icon: "fas fa-certificate",
      color: "from-purple-400/20 to-yellow-500/20",
      borderColor: "border-purple-400/30"
    },
    {
      title: "Leadership Program",
      subtitle: "Foundations of Leadership",
      icon: "fas fa-crown",
      color: "from-yellow-500/20 to-purple-400/20",
      borderColor: "border-yellow-500/30"
    },
    {
      title: "Systems Engineer",
      subtitle: "Microsoft Certified",
      icon: "fas fa-cogs",
      color: "from-purple-400/20 to-cyan-400/20",
      borderColor: "border-purple-400/30"
    },
    {
      title: "ISO 27001 & 20001",
      subtitle: "Security & Service Mgmt",
      icon: "fas fa-shield-alt",
      color: "from-cyan-400/20 to-yellow-500/20",
      borderColor: "border-cyan-400/30"
    },
    {
      title: "Azure Fundamentals",
      subtitle: "Microsoft Certified",
      icon: "fas fa-cloud",
      color: "from-yellow-500/20 to-blue-600/20",
      borderColor: "border-yellow-500/30"
    },
    {
      title: "AI Agent Development",
      subtitle: "CoPilot Studio & N8N Expert",
      icon: "fas fa-robot",
      color: "from-purple-400/20 to-pink-500/20",
      borderColor: "border-purple-400/30"
    },
    {
      title: "Cybersecurity Framework",
      subtitle: "ISO 27001 & Security Best Practices",
      icon: "fas fa-shield-alt",
      color: "from-red-500/20 to-orange-500/20",
      borderColor: "border-red-500/30"
    }
  ];

  return (
    <section id="expertise" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Technology Expertise Matrix
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Comprehensive technology leadership across enterprise platforms, cloud infrastructure, and emerging technologies
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skills Matrix */}
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Core Technology Stack</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-200">{skill.name}</span>
                    <span className="text-yellow-500">Expert</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Certifications */}
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6 text-cyan-400">Professional Certifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br ${cert.color} p-3 rounded-lg border ${cert.borderColor}`}
                >
                  <i className={`${cert.icon} text-cyan-400 text-lg mb-2`}></i>
                  <h4 className="font-semibold text-slate-200 text-sm">{cert.title}</h4>
                  <p className="text-slate-400 text-xs">{cert.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
