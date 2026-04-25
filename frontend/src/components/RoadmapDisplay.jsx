import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { FileText, Download, Share2, Copy, Check } from 'lucide-react';

const RoadmapDisplay = ({ roadmap }) => {
  const [copied, setCopied] = React.useState(false);

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

  return (
    <section className="section-container">
      <div className="glass-card overflow-hidden">
        <div className="border-b border-border p-6 flex flex-wrap items-center justify-between bg-white/[0.02] gap-4">
          <div className="flex items-center gap-3 text-secondary text-[10px] font-black uppercase tracking-[0.2em]">
            <FileText className="w-4 h-4 text-primary" /> Generated Report v1.0
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 text-secondary hover:text-primary transition-all text-xs font-bold bg-white/5 px-4 py-2 rounded-lg"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              {copied ? "COPIED" : "COPY MD"}
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 text-primary hover:bg-primary hover:text-background transition-all text-xs font-bold bg-white/10 px-4 py-2 rounded-lg"
            >
              <Download className="w-4 h-4" /> DOWNLOAD
            </button>
            <button className="text-secondary hover:text-primary transition-colors bg-white/5 p-2 rounded-lg">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="p-8 md:p-16 prose prose-invert max-w-none 
          prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase
          prose-h2:text-3xl prose-h2:border-b prose-h2:border-border prose-h2:pb-4
          prose-strong:text-primary prose-li:text-secondary prose-p:text-secondary prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        ">
          <ReactMarkdown>{roadmap}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
};

export default RoadmapDisplay;
