import React from 'react';
import { BrainCircuit } from 'lucide-react';

const Footer = () => (
  <footer className="py-24 border-t border-white/5 text-center bg-black/20">
    <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-2 opacity-80">
          <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
            <BrainCircuit className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400">CareerMap AI Labs</span>
        </div>
        
        <div className="flex gap-8 text-xs font-medium text-gray-500 uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </div>

        <p className="text-gray-600 text-sm italic">Engineered at the intersection of Ambition and Intelligence.</p>
        <p className="text-gray-700 text-[10px] mt-4 tracking-tighter uppercase font-medium">© 2026 QUANTUM CAREER ENGINE. ALL RIGHTS RESERVED.</p>
    </div>
  </footer>
);

export default Footer;
