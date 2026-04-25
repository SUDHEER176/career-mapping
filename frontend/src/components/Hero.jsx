import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Cpu, Code2 } from 'lucide-react';

const Hero = () => (
  <section className="max-w-7xl mx-auto px-8 py-24 flex flex-col md:flex-row items-center gap-16">
    <div className="flex-1 text-center md:text-left">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold mb-6">
          <Sparkles className="w-3 h-3" />
          NEW: GENAI 1.5 INTEGRATION
        </div>
        <h1 className="text-6xl md:text-8xl font-black leading-[1.1] mb-8 text-white">
          Navigate the <br />
          <span className="gradient-text">Future of Work.</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-xl mb-12 leading-relaxed">
          The traditional career ladder is dead. Welcome to the career web. 
          Let AI bridge your passions with tomorrow's possibilities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a href="#analyze" className="btn-primary flex items-center justify-center gap-2">
            Start Analysis <ArrowRight className="w-5 h-5" />
          </a>
          <button className="btn-secondary flex items-center justify-center gap-2">
            View Sample Roadmaps
          </button>
        </div>
      </motion.div>
    </div>

    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex-1 relative"
    >
      <div className="relative w-full aspect-square max-w-md mx-auto">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative z-10 w-full h-full p-4 border-2 border-dashed border-white/10 rounded-full flex items-center justify-center"
        >
          <div className="w-[80%] h-[80%] bg-gradient-to-tr from-primary via-secondary to-accent rounded-full shadow-2xl shadow-primary/40 animate-float" />
        </motion.div>
        
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-4 -right-4 p-4 glass-card shadow-xl">
          <Cpu className="w-8 h-8 text-primary" />
        </motion.div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }} className="absolute bottom-10 -left-10 p-4 glass-card shadow-xl">
          <Code2 className="w-8 h-8 text-secondary" />
        </motion.div>
      </div>
    </motion.div>
  </section>
);

export default Hero;
