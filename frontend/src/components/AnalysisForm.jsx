import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, MessageSquare, Sparkles, Terminal } from 'lucide-react';

const TerminalLoading = () => {
  const [text, setText] = useState("");
  const lines = [
    "> INITIALIZING_NEURAL_CORE...",
    "> SCANNING_PROFILE_INPUTS...",
    "> SYMBOLIC_REASONING_ACTIVE...",
    "> CROSS_REFERENCING_ECON_DATA...",
    "> SYNTHESIZING_TRAJECTORY...",
    "> GENERATION_COMPLETE."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      setText(prev => prev + lines[currentLine] + "\n");
      currentLine++;
      if (currentLine >= lines.length) clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-primary text-sm p-4 h-48 overflow-hidden bg-black/40 border border-border rounded-xl">
      <pre className="whitespace-pre-wrap">{text}</pre>
      <motion.div 
        animate={{ opacity:[0, 1] }} 
        transition={{ repeat: Infinity, duration: 0.5 }}
        className="w-2 h-4 bg-primary inline-block ml-1"
      />
    </div>
  );
};

const AnalysisForm = ({ onSubmit, loading, formData, setFormData }) => (
  <section id="analyze" className="section-container relative">
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="glass-card bg-surface/20 backdrop-blur-3xl overflow-hidden"
    >
      <div className="p-8 md:p-24">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-12 mb-16 md:mb-20">
          <div>
            <h2 className="text-5xl md:text-[80px] font-black tracking-tighter leading-[0.8] uppercase mb-6 md:mb-8">
              DATA <br /> <span className="text-secondary opacity-30">INGESTION</span>
            </h2>
            <p className="text-lg md:text-xl text-secondary max-w-md font-medium">Input your raw cognitive parameters for narrative extraction.</p>
          </div>
          <div className="p-6 border border-border rounded-2xl flex items-center gap-4 bg-black/20">
            <Terminal className="text-primary w-8 h-8" />
            <div className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">
              Status: <span className="text-primary">Ready for input</span>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-16">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <label className="text-xs font-black text-secondary uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" /> Interests
              </label>
              <textarea 
                className="w-full h-32 bg-transparent border-b-2 border-border focus:border-primary outline-none transition-all py-4 text-2xl font-bold placeholder:text-zinc-800 resize-none"
                placeholder="What defines you?"
                value={formData.interests}
                onChange={(e) => setFormData({...formData, interests: e.target.value})}
                required
              />
            </div>
            <div className="space-y-6">
              <label className="text-xs font-black text-secondary uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" /> Background
              </label>
              <textarea 
                className="w-full h-32 bg-transparent border-b-2 border-border focus:border-primary outline-none transition-all py-4 text-2xl font-bold placeholder:text-zinc-800 resize-none"
                placeholder="Where have you been?"
                value={formData.background}
                onChange={(e) => setFormData({...formData, background: e.target.value})}
                required
              />
            </div>
            <div className="space-y-6">
              <label className="text-xs font-black text-secondary uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" /> Target Career Goal
              </label>
              <input 
                type="text"
                className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none transition-all py-4 text-2xl font-bold placeholder:text-zinc-800"
                placeholder="What do you want to achieve?"
                value={formData.target_role}
                onChange={(e) => setFormData({...formData, target_role: e.target.value})}
                required
              />
            </div>
            <div className="space-y-6">
              <label className="text-xs font-black text-secondary uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" /> Time Commitment
              </label>
              <input 
                type="text"
                className="w-full bg-transparent border-b-2 border-border focus:border-primary outline-none transition-all py-4 text-2xl font-bold placeholder:text-zinc-800"
                placeholder="e.g., 10 hours/week, Full-time"
                value={formData.time_commitment}
                onChange={(e) => setFormData({...formData, time_commitment: e.target.value})}
                required
              />
            </div>
          </div>
          
          <AnimatePresence>
            {loading && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                <TerminalLoading />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button 
            type="submit" 
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full h-24 bg-primary text-background text-3xl font-black uppercase tracking-tighter rounded-2xl flex items-center justify-center gap-4 hover:bg-white transition-colors"
          >
            {loading ? "PROCESSING..." : "Synthesize Future"} <Sparkles className="w-8 h-8" />
          </motion.button>
        </form>
      </div>
    </motion.div>
  </section>
);

export default AnalysisForm;
