import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Search, Lightbulb } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="relative glass-card p-12 group overflow-hidden border-white/[0.05]"
    >
      {/* Mouse Spotlight Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 40%)`
        }}
      />

      <div className="relative z-10">
        <div className="w-14 h-14 bg-surface border border-border rounded-2xl flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-background transition-all duration-700 ease-out transform group-hover:-rotate-12 shadow-2xl">
          <Icon className="w-7 h-7" />
        </div>
        
        <h3 className="text-2xl font-black mb-6 text-white tracking-tight uppercase leading-none">
          {title}
        </h3>
        <p className="text-secondary text-lg leading-relaxed group-hover:text-white transition-colors duration-700">
          {description}
        </p>
      </div>

      {/* Aesthetic Accent */}
      <div className="absolute top-4 right-4 text-[8px] font-black tracking-widest text-secondary opacity-20 group-hover:opacity-100 transition-opacity">
        [MODULE_0{delay*10}]
      </div>
    </motion.div>
  );
};

const Features = () => (
  <section id="features" className="section-container border-t border-border/50">
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <FeatureCard 
        icon={Rocket} 
        title="Acceleration" 
        description="Propel your trajectory by 320% through targeted algorithmic skill acquisition."
        delay={0.1}
      />
      <FeatureCard 
        icon={Search} 
        title="Micro-Analysis" 
        description="A surgical inspection of your background vs. global elite competitive benchmarks."
        delay={0.2}
      />
      <FeatureCard 
        icon={Lightbulb} 
        title="Synthesis" 
        description="Deep learning models curate a path tailored to your specific cognitive strengths."
        delay={0.3}
      />
    </div>
  </section>
);

export default Features;
