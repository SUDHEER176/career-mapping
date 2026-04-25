import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { FileText, Download, Share2, Copy, Check, MapPin, Target, Zap, BookOpen, Compass, Award, LayoutList } from 'lucide-react';

const RoadmapDisplay = ({ roadmap }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'document'

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([roadmap], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = "Career_Roadmap_Synthesis.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(roadmap);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Parse Markdown into nodes for the Timeline View
  const parseRoadmapToNodes = (text) => {
    const nodes = [];
    let currentContent = [];
    let title = "Journey Overview";
    
    // Safety check
    if (!text || typeof text !== 'string') return [];

    const lines = text.split('\n');
    lines.forEach(line => {
      // Look for Markdown headers (## Title) or bolded numbered lists (1. **Title**)
      const headerMatch = line.match(/^#{1,3}\s+(.*)/) || line.match(/^\d+\.\s+\*\*(.*)\*\*/);
      
      if (headerMatch) {
        if (currentContent.length > 0 || title !== "Journey Overview") {
          nodes.push({ title, content: currentContent.join('\n').trim() });
          currentContent = [];
        }
        title = headerMatch[1].replace(/\*+/g, '').trim();
      } else {
        currentContent.push(line);
      }
    });
    
    if (currentContent.length > 0) {
      nodes.push({ title, content: currentContent.join('\n').trim() });
    }

    // Filter out empty/invalid nodes
    return nodes.filter(n => n.content.length > 10 || n.title !== "Journey Overview");
  };

  const nodes = parseRoadmapToNodes(roadmap);
  
  // Icons for our visual timeline stops
  const getIcon = (idx) => {
    const icons = [MapPin, Compass, Target, BookOpen, Zap, Award];
    const Icon = icons[idx % icons.length];
    return <Icon className="w-5 h-5" />;
  };

  return (
    <section className="section-container relative z-10" id="roadmap-results">
      <div className="glass-card overflow-hidden border-white/10">
        {/* Header Controls */}
        <div className="border-b border-white/5 p-6 flex flex-wrap items-center justify-between bg-black/40 backdrop-blur-xl gap-4 sticky top-0 z-50">
          <div className="flex items-center gap-3 text-white text-xs font-black uppercase tracking-[0.2em]">
            <MapPin className="w-4 h-4 text-primary animate-pulse" /> 
            AI Synthesized Roadmap
          </div>
          
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
              <button 
                onClick={() => setViewMode('timeline')}
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${viewMode === 'timeline' ? 'bg-primary text-black' : 'text-secondary hover:text-white'}`}
              >
                Visual Timeline
              </button>
              <button 
                onClick={() => setViewMode('document')}
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all flex items-center gap-2 ${viewMode === 'document' ? 'bg-primary text-black' : 'text-secondary hover:text-white'}`}
              >
                <FileText className="w-3 h-3" /> Raw Doc
              </button>
            </div>

            <div className="h-6 w-px bg-white/10 hidden md:block"></div>

            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 text-secondary hover:text-white transition-all text-xs font-bold bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/5"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? "COPIED" : "COPY"}</span>
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 text-black hover:scale-105 transition-all text-xs font-black bg-primary px-4 py-2 rounded-lg"
            >
              <Download className="w-4 h-4" /> 
              <span className="hidden sm:inline">EXPORT PDF</span>
            </button>
          </div>
        </div>
        
        {/* Document View */}
        {viewMode === 'document' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 md:p-16 prose prose-invert max-w-none 
            prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase
            prose-h2:text-3xl prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4 prose-h2:text-white
            prose-h3:text-primary prose-strong:text-white prose-li:text-secondary prose-p:text-secondary prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
          >
            <ReactMarkdown>{roadmap}</ReactMarkdown>
          </motion.div>
        )}

        {/* Visual Timeline View */}
        {viewMode === 'timeline' && (
          <div className="p-8 md:p-16 relative bg-gradient-to-b from-transparent to-black/20">
            {nodes.length <= 1 ? (
              <div className="text-center text-secondary py-20">
                <LayoutList className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Unable to parse timeline structure automatically.</p>
                <button 
                  onClick={() => setViewMode('document')}
                  className="mt-4 text-primary underline text-sm"
                >
                  Switch to Document View
                </button>
              </div>
            ) : (
              <div className="relative max-w-5xl mx-auto py-10">
                
                {/* The Central Glowing Road Line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-white to-transparent shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                  />
                </div>

                {nodes.map((node, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 50, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: idx * 0.15 }}
                      key={idx} 
                      className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 mb-24 last:mb-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
                    >
                      {/* Timeline Node Marker */}
                      <div className="absolute left-6 md:left-1/2 w-12 h-12 rounded-full bg-black border-2 border-primary text-primary flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-110 hover:bg-primary hover:text-black transition-all cursor-pointer group">
                        {getIcon(idx)}
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>

                      {/* Content Card */}
                      <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 text-left'}`}>
                        <div className="glass-card p-8 group hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:-translate-y-1 relative overflow-hidden text-left">
                          
                          {/* Card background gradient */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          
                          <div className="relative z-10">
                            <span className="text-primary font-black text-[10px] tracking-[0.2em] uppercase mb-2 block">
                              Phase 0{idx + 1}
                            </span>
                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 text-white group-hover:text-primary transition-colors leading-tight">
                              {node.title}
                            </h3>
                            <div className="prose prose-invert max-w-none prose-sm 
                              prose-p:text-secondary/80 prose-li:text-secondary/80 prose-strong:text-white prose-a:text-primary 
                              prose-ul:pl-4 prose-ul:my-2 prose-p:my-2 prose-p:leading-relaxed text-left">
                              <ReactMarkdown>{node.content}</ReactMarkdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default RoadmapDisplay;
