"use client";

import Image from "next/image";
import { ArrowRight, ShieldCheck, Truck, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-primary/5 rounded-l-[100px] hidden lg:block" />
      <div className="absolute top-1/4 -left-20 -z-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm mb-6 uppercase tracking-wider">
            <ShieldCheck size={16} />
            Certified Trusted Pharmacy
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-[1.1] mb-6">
            Your Health, <br />
            Our <span className="text-primary italic">Priority</span>
          </h1>
          <p className="text-xl text-muted leading-relaxed mb-8 max-w-lg">
            Experience premium healthcare with Veesha Wellness. From essential medicines to specialized wellness products, we bring health to your doorstep.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#products"
              className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95"
            >
              Shop Now <ArrowRight size={20} />
            </a>
            <a
              href="#about"
              className="bg-white border-2 border-primary/20 hover:border-primary text-primary px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center transition-all active:scale-95"
            >
              Learn More
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
            <div className="flex flex-col gap-1">
              <Clock className="text-secondary mb-2" size={24} />
              <span className="font-bold text-foreground">24/7 Service</span>
              <span className="text-xs text-muted">Online Support</span>
            </div>
            <div className="flex flex-col gap-1">
              <Truck className="text-secondary mb-2" size={24} />
              <span className="font-bold text-foreground">Free Delivery</span>
              <span className="text-xs text-muted">Orders over $50</span>
            </div>
            <div className="flex flex-col gap-1">
              <ShieldCheck className="text-secondary mb-2" size={24} />
              <span className="font-bold text-foreground">100% Secure</span>
              <span className="text-xs text-muted">Genuine Medicine</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[500px] lg:h-[650px] w-full rounded-[40px] overflow-hidden shadow-2xl"
        >
          <Image
            src="/hero.png"
            alt="Veesha Wellness Pharmacy Interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          
          {/* Floating Badge */}
          <div className="absolute bottom-8 left-8 glass p-6 rounded-3xl flex items-center gap-4 max-w-xs animate-bounce-slow">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white">
              <Truck size={24} />
            </div>
            <div>
              <p className="font-bold text-foreground">Fast Delivery</p>
              <p className="text-sm text-muted">Under 30 minutes in city</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
