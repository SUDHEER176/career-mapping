import React from "react";
import { motion } from "framer-motion";

const SectionWithMockup = ({
    title,
    description,
    primaryImageSrc,
    secondaryImageSrc,
    customContent,
    reverseLayout = false,
}) => {
    return (
        <section className="section-container">
            <div className={`grid md:grid-cols-2 gap-20 items-center ${reverseLayout ? 'md:grid-flow-col-dense' : ''}`}>
                <motion.div 
                    initial={{ opacity: 0, x: reverseLayout ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={reverseLayout ? 'md:col-start-2' : ''}
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 md:mb-8 leading-[0.95] md:leading-[0.9] uppercase">
                        {title}
                    </h2>
                    <p className="text-lg md:text-xl text-secondary leading-relaxed max-w-lg italic">
                        "{description}"
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {customContent ? (
                        <div className="relative aspect-square rounded-3xl overflow-hidden glass-card border-2">
                           {customContent}
                        </div>
                    ) : (
                        <div className="relative aspect-square rounded-3xl overflow-hidden glass-card border-2">
                           <img src={primaryImageSrc} alt="Analysis View" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                        </div>
                    )}
                    {secondaryImageSrc && (
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-2xl overflow-hidden border-8 border-background shadow-2xl glass-card">
                            <img src={secondaryImageSrc} alt="Data View" className="w-full h-full object-cover" />
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default SectionWithMockup;
