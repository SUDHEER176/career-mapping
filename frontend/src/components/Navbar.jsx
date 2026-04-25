import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
    <div className="max-w-7xl mx-auto flex items-center justify-between glass-card px-8 py-4 !rounded-full">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-background">C</div>
        <span className="text-xl font-bold tracking-tighter text-white">CAREERMAP</span>
      </div>
      
      <div className="hidden md:flex items-center gap-10">
        <a href="#features" className="nav-link">Features</a>
        <a href="#analyze" className="nav-link">Synthesize</a>
        
      </div>

      <button className="hidden md:flex btn-primary !h-10 !px-6 !text-xs !font-black uppercase tracking-widest">
        Get Started
      </button>
    </div>
  </nav>
);

export default Navbar;
