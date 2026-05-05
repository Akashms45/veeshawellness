"use client";

import Image from "next/image";
import { ArrowRight, ShieldCheck, Truck, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { TransitionLink } from "./page-transition";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen lg:h-screen flex items-end pt-32 lg:pt-0 overflow-hidden" style={{ backgroundColor: '#386BB4' }}>
      {/* Background Watermark */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: "linear" }}
        className="absolute bottom-[-2%] left-0 w-full pointer-events-none select-none overflow-hidden z-0"
        style={{ willChange: "opacity" }}
      >
        <h2 className="text-[22vw] font-black text-white/5 leading-none tracking-tighter uppercase whitespace-nowrap">
          VEESHA
        </h2>
      </motion.div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 h-full flex items-center lg:items-end pb-10 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 w-full items-end">
          {/* Left Content */}
          <div className="flex flex-col justify-end lg:pl-10">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "transform, opacity" }}
              className="font-display text-4xl md:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6 lg:mb-8"
            >
              Veesha Wellness<br />
              Where Care Meets<br />
              <span className="text-white/80">Convenience</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "transform, opacity" }}
              className="text-base md:text-lg text-white/70 leading-relaxed mb-8 lg:mb-10 max-w-lg"
            >
              Reliable tablets, syrups, and wellness products for you and your loved ones
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "transform, opacity" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <TransitionLink
                href="/contact"
                className="bg-white hover:bg-gray-100 px-10 py-3.5 lg:py-4 rounded-full font-bold text-base lg:text-lg flex items-center justify-center transition-all shadow-xl active:scale-95"
                style={{ color: '#386BB4' }}
              >
                Contact Us
              </TransitionLink>
            </motion.div>
          </div>

          {/* Right Image Content - Sit at absolute bottom */}
          <div className="relative lg:static h-[350px] lg:h-full flex items-end">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "transform, opacity" }}
              className="lg:absolute bottom-0 right-0 w-full lg:w-[45%] h-full lg:h-[85vh] pointer-events-none"
            >
              <Image
                src="/hero.svg"
                alt="Health Illustration"
                fill
                className="object-contain object-bottom"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
