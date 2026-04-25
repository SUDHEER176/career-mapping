import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, ArrowRight, Github, Code, Cpu, Binary, Search, Brain, Layout, Rocket, Shield, Crosshair } from 'lucide-react';
import Navbar from './components/Navbar';
import Features from './components/Features';
import AnalysisForm from './components/AnalysisForm';
import RoadmapDisplay from './components/RoadmapDisplay';
import SectionWithMockup from './components/SectionWithMockup';
import RadialOrbitalTimeline from './components/ui/RadialOrbitalTimeline';
import AdvancedTools from './components/AdvancedTools';

const timelineData = [
  { id: 1, title: "Skill Synthesis", date: "Phase 01", content: "Deep-scanning your technical DNA and cross-referencing with 10k+ industry benchmarks.", category: "Analysis", icon: Search, relatedIds: [2], energy: 100 },
  { id: 2, title: "Market Alignment", date: "Phase 02", content: "Synthesizing your profile against emerging market gaps and high-growth sectors.", category: "Mapping", icon: Brain, relatedIds: [1, 3], energy: 90 },
  { id: 3, title: "Trajectory Modeling", date: "Phase 03", content: "Building a high-fidelity 10-year career path using our proprietary Llama-3 models.", category: "Synthesis", icon: Layout, relatedIds: [2, 4], energy: 60 },
  { id: 4, title: "Growth Velocity", date: "Phase 04", content: "Calculating the fastest route to seniority through strategic project selection.", category: "Velocity", icon: Rocket, relatedIds: [3, 5], energy: 30 },
  { id: 5, title: "Future Guarding", date: "Phase 05", content: "Predicting AI-automation risks and layering in resilience skills to protect your role.", category: "Security", icon: Shield, relatedIds: [4], energy: 10 },
];

const App = () => {
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [formData, setFormData] = useState({ interests: '', background: '', target_role: '', time_commitment: '' });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRoadmap(null);
    try {
      const response = await fetch('https://career-mapping.onrender.com/generate-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setRoadmap(data.roadmap);
    } catch (err) {
      setRoadmap("## 🎯 Top Career Paths\n\n1. **AI Experience Designer**: Merging human psychology with machine intelligence.\n2. **Full-Stack Creative Developer**: Building the digital cathedrals of tomorrow.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative selection:bg-white selection:text-black overflow-x-hidden pt-20">
      {/* Cinematic Effects */}
      <div className="noise-overlay" />
      <div className="vignette" />
      
      <Navbar />

      <main className="relative z-10 px-6">
        {/* Animated Hero Section */}
        <section className="section-container relative min-h-[80vh] flex flex-col justify-center py-20">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center">
            <h1 className="text-6xl md:text-[10vw] font-black tracking-tighter leading-[0.85] md:leading-[0.75] mb-8 md:mb-12 gradient-text select-none uppercase">
              CAREER <br /> <span className="opacity-20 italic">MAP AI.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-secondary max-w-xl mx-auto leading-relaxed mb-12 md:mb-20 font-medium px-4">
              The intelligent career narrator. Navigate the future of your professional life with algorithmic precision and high-fidelity roadmaps.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <button onClick={() => document.getElementById('analyze').scrollIntoView({ behavior: 'smooth' })} className="btn-primary group">
                Synthesize Pathway <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
              <div className="text-[10px] font-black text-secondary tracking-widest uppercase opacity-40">
                [V.1.0_Llama-3_Core]
              </div>
            </div>
          </motion.div>
        </section>

        <SectionWithMockup 
          title={<>Technical <br /> Resolution</>}
          description="A surgical resolution of your future profile, extracted from current economic meta-data and market shifts."
          customContent={<RadialOrbitalTimeline timelineData={timelineData} />}
        />

        <Features />

        <AnalysisForm 
          onSubmit={handleSubmit}
          loading={loading}
          formData={formData}
          setFormData={setFormData}
        />

        <AnimatePresence>
          {roadmap && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <RoadmapDisplay roadmap={roadmap} />
              <AdvancedTools baseProfile={formData} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-white/5 py-40 relative z-20 bg-background text-center">
        <div className="section-container flex flex-col items-center gap-12">
          <div className="font-black text-white tracking-tighter text-5xl">CM.AI</div>
          <div className="w-full max-w-lg h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <p className="text-secondary text-xs font-mono uppercase tracking-[0.8em] opacity-40">
            Engineered for the elite 1%
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
