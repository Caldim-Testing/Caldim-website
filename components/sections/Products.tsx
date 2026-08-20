"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "../animations/Animations";
import { getIconComponent } from "@/utils/iconHelper";
import staticProducts from "@/data/products.json";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  contents: string;
  color: string;
  iconName: string;
}

export const ProductsSection: React.FC = () => {
  const [productsList, setProductsList] = useState<Product[]>(staticProducts as unknown as Product[]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch("/api/admin/products")
      .then(res => {
        if (res.ok) return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          setProductsList(data);
        }
      })
      .catch(err => console.error("Error syncing products:", err));
  }, []);

  const activeProduct = productsList[activeIndex] || productsList[0];

  if (!activeProduct) return null;

  const ActiveIcon = getIconComponent(activeProduct.iconName);

  return (
    <section className="section-padding bg-[#020c1b] relative overflow-hidden border-b border-slate-900" id="products">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-wide relative z-10">
        <FadeUp className="mb-10 md:mb-16 lg:mb-24">
          <div className="badge badge-accent mb-4 uppercase tracking-widest text-xs border-blue-900/50 bg-blue-900/20 text-blue-300">Enterprise Product Suite</div>
          <h2 id="products-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-900 text-white tracking-tight mb-3 sm:mb-4 max-w-3xl">
            Software Built for Industrial Scale
          </h2>
          <p className="text-slate-200 font-600 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
            A specialized suite of enterprise-grade applications covering HR, procurement, logistics, and resource management. Hover to explore capabilities.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 items-start min-h-0 lg:min-h-[600px]">

          {/* Left Column: Interactive List */}
          <div className="lg:col-span-5 lg:h-[600px] lg:overflow-y-auto lg:pr-3 flex flex-row lg:flex-col gap-2 relative overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 custom-scrollbar">
            {/* Vertical timeline line — desktop only */}
            <div className="absolute left-[22px] top-4 bottom-4 w-px bg-slate-800 hidden lg:block" />

            {productsList.map((product, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={product.id}
                  className="relative cursor-pointer group py-3 lg:py-4 px-4 lg:pl-16 lg:pr-6 rounded-2xl transition-all duration-300 shrink-0 min-w-[140px] lg:min-w-0"
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                >
                  {/* Active Indicator Dot — desktop only */}
                  <div className="absolute left-[17px] top-[26px] w-3 h-3 rounded-full transition-all duration-500 z-10 hidden lg:block"
                    style={{
                      background: isActive ? product.color : '#1e293b',
                      boxShadow: isActive ? `0 0 15px ${product.color}` : 'none',
                      transform: isActive ? 'scale(1)' : 'scale(0.7)'
                    }}
                  />

                  {/* Active Background Highlighting */}
                  {isActive && (
                    <motion.div
                      layoutId="activeProductBg"
                      className="absolute inset-0 bg-white/[0.03] border border-white/[0.08] rounded-2xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="relative z-10 flex flex-col gap-0.5 lg:gap-1">
                    <div className="flex items-center gap-3">
                      {/* Mobile color dot */}
                      <div className="w-2 h-2 rounded-full shrink-0 lg:hidden" style={{ background: isActive ? product.color : '#1e293b' }} />
                      <h3 className={`text-sm lg:text-xl font-800 transition-colors duration-300 whitespace-nowrap lg:whitespace-normal ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                        {product.name}
                      </h3>
                    </div>
                    <p className={`text-xs font-600 transition-colors duration-300 hidden lg:block ${isActive ? 'text-slate-200' : 'text-slate-400'}`}>
                      {product.category}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Canvas Preview */}
          <div className="lg:col-span-7 h-[380px] sm:h-[450px] lg:h-[600px] relative lg:sticky lg:top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0 rounded-2xl lg:rounded-3xl border border-white/[0.08] bg-[#0a1128] overflow-hidden shadow-2xl flex flex-col"
              >
                {/* Tech grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_20%,#000_20%,transparent_100%)] pointer-events-none" />

                {/* Glowing top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${activeProduct.color}, transparent)` }} />

                <div className="flex-1 p-5 sm:p-6 md:p-8 flex flex-col relative z-10 justify-between">
                  <div>
                    {/* Big Icon */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 sm:mb-5 relative" style={{ background: `${activeProduct.color}15`, border: `1px solid ${activeProduct.color}30` }}>
                      <div className="absolute inset-0 blur-xl opacity-50" style={{ background: activeProduct.color }} />
                      <ActiveIcon size={24} style={{ color: activeProduct.color }} className="relative z-10 sm:[&]:!w-[28px] sm:[&]:!h-[28px] lg:[&]:!w-[30px] lg:[&]:!h-[30px]" />
                    </div>

                    <h3 className="text-lg sm:text-xl lg:text-2xl font-900 text-white mb-2 sm:mb-3 tracking-tight">{activeProduct.name}</h3>
                    <p className="text-slate-200 font-600 text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-md">
                      {activeProduct.description}
                    </p>
                  </div>

                  {/* Product Overview Text Block */}
                  <div className="mt-3 sm:mt-4 flex flex-col gap-2 sm:gap-2.5 text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeProduct.color }} />
                      <span className="text-[9px] font-mono tracking-widest uppercase text-slate-500">Overview</span>
                    </div>
                    <p className="text-[11px] sm:text-xs font-550 leading-relaxed text-slate-300 line-clamp-3 sm:line-clamp-none">
                      {activeProduct.contents}
                    </p>
                  </div>

                  <div className="mt-4 sm:mt-6 flex items-center gap-4">
                    <Link href={`/products/${activeProduct.id}`} className="btn text-white hover:opacity-90 transition-opacity border-none font-bold text-xs sm:text-sm" style={{ background: activeProduct.color }}>
                      Explore {activeProduct.name} <ArrowRight size={14} className="sm:[&]:!w-4 sm:[&]:!h-4" />
                    </Link>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
