"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TransitionLink } from "./page-transition";

// Must match navbar: mt-6(24) + py-3.5*2(28) + logo-height(44) + border(2) = ~98px
const NAV_HEIGHT = "h-[100px]";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "#386BB4" }}
    >
      {/* Background Watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: "linear" }}
        className="absolute bottom-0 left-0 w-full pointer-events-none select-none overflow-hidden z-0"
        style={{ willChange: "opacity" }}
      >
        <h2 className="text-[22vw] font-black text-white/5 leading-none tracking-tighter uppercase whitespace-nowrap">
          VEESHA
        </h2>
      </motion.div>

      {/* Spacer that clears the fixed navbar exactly */}
      <div className={`${NAV_HEIGHT} shrink-0`} />

      {/* Main content — fills remaining height, text anchors to bottom on lg */}
      <div className="relative z-10 flex-1 flex items-end">
        <div className="w-full container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full">

            {/* ── Left: Text Content ── */}
            <div className="flex flex-col justify-end pb-10 sm:pb-14 lg:pb-24 px-2 sm:px-4 lg:pl-10 lg:pr-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: "transform, opacity" }}
                className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-4 sm:mb-6 lg:mb-8"
              >
                Veesha Wellness
                <br />
                Where Care Meets
                <br />
                <span className="text-white/80">Convenience</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: "transform, opacity" }}
                className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed mb-6 sm:mb-8 lg:mb-10 max-w-xs sm:max-w-sm md:max-w-lg font-sans"
              >
                Reliable tablets, syrups, and wellness products for you and your
                loved ones
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: "transform, opacity" }}
              >
                <TransitionLink
                  href="/contact"
                  className="bg-white hover:bg-gray-100 px-8 sm:px-10 py-3 sm:py-3.5 lg:py-4 rounded-full font-bold text-sm sm:text-base lg:text-lg inline-flex items-center justify-center transition-all shadow-xl active:scale-95 font-sans"
                  style={{ color: "#386BB4" }}
                >
                  Contact Us
                </TransitionLink>
              </motion.div>
            </div>

            {/* ── Right: Hero Image ── */}
            <div className="relative w-full">
              {/* Mobile / tablet */}
              <div className="block lg:hidden relative w-full h-64 sm:h-80 md:h-96 mt-6">
                <Image
                  src="/hero.svg"
                  alt="Health Illustration"
                  fill
                  className="object-contain object-bottom"
                  priority
                />
              </div>

              {/* Desktop — anchored to section bottom */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: "transform, opacity" }}
                className="hidden lg:block absolute bottom-0 right-0 w-full h-[85vh] pointer-events-none"
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
      </div>
    </section>
  );
}