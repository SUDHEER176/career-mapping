import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RadialOrbitalTimeline = ({ timelineData }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const radius = 160;
  const centerX = 250;
  const centerY = 250;

  return (
    <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-2xl">
        <defs>
          <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <motion.stop 
               offset="0%" 
               animate={{ stopColor: ["#0ea5e9", "#22c55e", "#6366f1", "#0ea5e9"] }} 
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.stop 
               offset="100%" 
               animate={{ stopColor: ["#6366f1", "#0ea5e9", "#22c55e", "#6366f1"] }} 
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Orbital Rings */}
        <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <circle cx={centerX} cy={centerY} r={radius - 40} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        
        {/* Scanning Pulse with Color Edge */}
        <motion.circle 
          cx={centerX} cy={centerY}
          initial={{ r: 0, opacity: 0.8 }}
          animate={{ r: 250, opacity: 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
          stroke="url(#coreGradient)"
          fill="none"
          strokeWidth="2"
          style={{ filter: 'blur(2px)' }}
        />

        {/* Rotational Container */}
        <motion.g
          animate={{ rotate: hoveredId ? 0 : 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "250px 250px" }}
        >
          {timelineData.map((item, index) => {
            const angle = (index / timelineData.length) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            const Icon = item.icon;

            return (
              <motion.g 
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="cursor-pointer"
              >
                <motion.g
                   animate={{ rotate: hoveredId ? 0 : -360 }}
                   transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                   style={{ transformOrigin: `${x}px ${y}px` }}
                >
                  {/* Living Node with Color Shift */}
                  <motion.circle
                    initial={{ r: 4 }}
                    animate={{ 
                      r: hoveredId === item.id ? 26 : 8,
                      fill: hoveredId === item.id ? "white" : "rgba(255,255,255,0.1)",
                      stroke: hoveredId === item.id ? "white" : "url(#coreGradient)",
                    }}
                    transition={{ duration: 0.5 }}
                    cx={x} cy={y}
                    strokeWidth="2"
                    style={hoveredId === item.id ? { filter: 'url(#glow)' } : {}}
                  />

                  {/* Icon with Color Pulse */}
                  <AnimatePresence>
                    {hoveredId === item.id && (
                      <foreignObject x={x - 12} y={y - 12} width="24" height="24" className="pointer-events-none">
                        <motion.div 
                          className="flex items-center justify-center text-background"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Icon size={14} strokeWidth={3} />
                        </motion.div>
                      </foreignObject>
                    )}
                  </AnimatePresence>
                </motion.g>

                {/* Connection Lines */}
                <AnimatePresence>
                  {hoveredId === item.id && item.relatedIds.map(relatedId => {
                    const targetIndex = timelineData.findIndex(t => t.id === relatedId);
                    const targetAngle = (targetIndex / timelineData.length) * 2 * Math.PI;
                    const tx = centerX + radius * Math.cos(targetAngle);
                    const ty = centerY + radius * Math.sin(targetAngle);
                    
                    return (
                      <motion.line
                        key={`line-${item.id}-${relatedId}`}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        x1={x} y1={y} x2={tx} y2={ty}
                        stroke="url(#coreGradient)" strokeWidth="2" strokeDasharray="4 2"
                      />
                    );
                  })}
                </AnimatePresence>
              </motion.g>
            );
          })}
        </motion.g>

        {/* Central Core with Breathing Gradient */}
        <motion.circle 
          cx={centerX} cy={centerY} r="65" 
          fill="url(#coreGradient)"
          className="opacity-10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.circle 
          cx={centerX} cy={centerY} r="50" 
          fill="background"
          className="stroke-white/10"
          strokeWidth="1"
        />
        
        <text 
          x={centerX} y={centerY} 
          textAnchor="middle" alignmentBaseline="middle" 
          className="fill-white text-[12px] font-black uppercase tracking-[0.3em] pointer-events-none"
          style={{ filter: hoveredId ? 'url(#glow)' : 'none' }}
        >
          {hoveredId ? timelineData.find(t => t.id === hoveredId).category : "SYST.02"}
        </text>
      </svg>

      {/* Info Card with Unified Colors */}
      <AnimatePresence>
        {hoveredId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute bottom-4 left-4 right-4 glass-card p-6 bg-background/95 border-primary/20 shadow-2xl overflow-hidden"
          >
            {/* Animated Progress Bar under the title */}
            <motion.div 
               className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500"
               initial={{ width: 0 }}
               animate={{ width: "100%" }}
               transition={{ duration: 1 }}
            />
            
            <div className="flex justify-between items-start mb-2 pt-2">
              <h4 className="text-white font-black uppercase tracking-tighter text-2xl leading-none italic">
                {timelineData.find(t => t.id === hoveredId).title}
              </h4>
              <span className="text-[10px] font-black text-background bg-white px-3 py-1 rounded-sm uppercase tracking-widest leading-none">
                {timelineData.find(t => t.id === hoveredId).date}
              </span>
            </div>
            <p className="text-sm text-secondary leading-relaxed font-semibold">
              {timelineData.find(t => t.id === hoveredId).content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RadialOrbitalTimeline;
