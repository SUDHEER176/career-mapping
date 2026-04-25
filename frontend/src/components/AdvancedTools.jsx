import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Search, MessageSquare, DollarSign, Linkedin, Building, TrendingDown, Briefcase, Users, X, Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const toolConfigs = [
  { 
    id: 'assets', 
    name: 'Cover Letter Synthesis', 
    icon: FileText, 
    endpoint: '/generate-assets', 
    desc: 'Generate a custom cover letter and 5 ATS-optimized resume bullets.',
    fields: [{ name: 'selected_role', label: 'Specific Target Role', type: 'text', placeholder: 'e.g., Senior React Developer' }] 
  },
  { 
    id: 'resume', 
    name: 'ATS Resume Scanner', 
    icon: Search, 
    endpoint: '/scan-resume', 
    desc: 'Get a 0-100 score, missing keywords, and rewritten bullet points.',
    fields: [{ name: 'resume_text', label: 'Paste Raw Resume Text', type: 'textarea', placeholder: 'Experience: ...' }] 
  },
  { 
    id: 'interview', 
    name: 'Mock Interview Generator', 
    icon: MessageSquare, 
    endpoint: '/mock-interview', 
    desc: 'Generate 10 tiered interview questions for your role.',
    fields: [{ name: 'skill_level', label: 'Skill Level', type: 'text', placeholder: 'e.g., Mid-Level' }] 
  },
  { 
    id: 'salary', 
    name: 'Salary Intelligence', 
    icon: DollarSign, 
    endpoint: '/salary-intel', 
    desc: 'Market ranges, negotiation scripts, and red flags.',
    fields: [
      { name: 'location', label: 'Location / City', type: 'text', placeholder: 'e.g., San Francisco, CA' },
      { name: 'experience_years', label: 'Years of Experience', type: 'text', placeholder: 'e.g., 4' }
    ] 
  },
  { 
    id: 'linkedin', 
    name: 'LinkedIn Optimizer', 
    icon: Linkedin, 
    endpoint: '/optimize-linkedin', 
    desc: 'Rewrites your headline and About section for recruiters.',
    fields: [
      { name: 'current_headline', label: 'Current Headline', type: 'text', placeholder: 'e.g., Software Engineer at X' },
      { name: 'current_about', label: 'Current About Section', type: 'textarea', placeholder: 'I am a passionate developer...' }
    ] 
  },
  { 
    id: 'culture', 
    name: 'Culture Matcher', 
    icon: Building, 
    endpoint: '/culture-match', 
    desc: 'Find the top 10 companies that match your vibe.',
    fields: [
      { name: 'work_style', label: 'Work Style', type: 'text', placeholder: 'e.g., Remote, Async' },
      { name: 'environment_preference', label: 'Environment', type: 'text', placeholder: 'e.g., Startup, Fast-paced' }
    ] 
  },
  { 
    id: 'decay', 
    name: 'Skill Decay Predictor', 
    icon: TrendingDown, 
    endpoint: '/skill-decay', 
    desc: 'Predict which of your skills AI will replace in 2 years.',
    fields: [{ name: 'current_skills', label: 'Current Tech Stack/Skills', type: 'textarea', placeholder: 'e.g., React, Node, Python...' }] 
  },
  { 
    id: 'portfolio', 
    name: 'Portfolio Blueprint', 
    icon: Briefcase, 
    endpoint: '/portfolio-blueprint', 
    desc: 'Generate 3 killer project ideas to get hired.',
    fields: [{ name: 'current_skills', label: 'Current Tech Stack', type: 'text', placeholder: 'e.g., Next.js, Tailwind' }] 
  },
  { 
    id: 'network', 
    name: 'Networking Strategy', 
    icon: Users, 
    endpoint: '/networking-strategy', 
    desc: 'Communities to join and cold outreach templates.',
    fields: [{ name: 'city', label: 'Target City', type: 'text', placeholder: 'e.g., New York' }] 
  }
];

const AdvancedTools = ({ baseProfile }) => {
  const [activeTool, setActiveTool] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleOpenTool = (tool) => {
    setActiveTool(tool);
    setResult(null);
    setFormData({});
  };

  const handleClose = () => {
    setActiveTool(null);
    setResult(null);
    setFormData({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Merge user inputs with the base profile from the main form
    const payload = {
      ...formData,
      target_role: formData.selected_role || baseProfile.target_role,
      background: baseProfile.background,
      interests: baseProfile.interests
    };

    try {
      const response = await fetch(`http://localhost:8001${activeTool.endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      
      // Extract the first key from the response object
      const resultKey = Object.keys(data)[0];
      setResult(data[resultKey]);
    } catch (err) {
      setResult("An error occurred while communicating with the AI Core.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-container relative py-32 z-20">
      <div className="mb-16">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 flex items-center gap-4">
          Advanced <span className="text-secondary opacity-50">Capabilities</span> <Sparkles className="text-primary w-10 h-10" />
        </h2>
        <p className="text-xl text-secondary max-w-2xl font-medium">
          Deploy specialized AI modules to execute targeted career operations based on your synthesized profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolConfigs.map((tool) => (
          <motion.div 
            key={tool.id}
            whileHover={{ y: -5 }}
            onClick={() => handleOpenTool(tool)}
            className="glass-card p-8 cursor-pointer group hover:border-primary/50 transition-colors"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
              <tool.icon className="w-7 h-7 text-primary group-hover:text-background transition-colors" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{tool.name}</h3>
            <p className="text-secondary font-medium leading-relaxed">{tool.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Modal / Expanded View */}
      <AnimatePresence>
        {activeTool && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-zinc-950 border border-white/10 w-full max-w-3xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-zinc-900/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <activeTool.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black">{activeTool.name}</h3>
                </div>
                <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="overflow-y-auto p-6 flex-1">
                {!result ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {activeTool.fields.map((field) => (
                      <div key={field.name} className="space-y-2">
                        <label className="text-sm font-bold text-secondary uppercase tracking-widest">
                          {field.label}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea 
                            className="w-full bg-black/50 border border-white/10 focus:border-primary rounded-xl p-4 text-lg outline-none min-h-[150px]"
                            placeholder={field.placeholder}
                            value={formData[field.name] || ''}
                            onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                            required
                          />
                        ) : (
                          <input 
                            type="text"
                            className="w-full bg-black/50 border border-white/10 focus:border-primary rounded-xl p-4 text-lg outline-none"
                            placeholder={field.placeholder}
                            value={formData[field.name] || ''}
                            onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                            required
                          />
                        )}
                      </div>
                    ))}
                    
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full h-16 mt-8 bg-primary text-background text-xl font-black uppercase rounded-xl flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
                    >
                      {loading ? <><Loader2 className="w-6 h-6 animate-spin" /> Processing...</> : 'Execute Module'}
                    </button>
                  </form>
                ) : (
                  <div className="prose prose-invert prose-p:leading-relaxed prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 max-w-none">
                    <ReactMarkdown>{result}</ReactMarkdown>
                    <button 
                      onClick={() => setResult(null)}
                      className="mt-8 px-6 py-3 border border-white/20 rounded-lg font-bold hover:bg-white/5 transition-colors"
                    >
                      Run Again
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AdvancedTools;
