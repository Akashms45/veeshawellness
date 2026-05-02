"use client";

import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Sarah Johnson",
    role: "Regular Customer",
    content: "Veesha Wellness has been my go-to for all healthcare needs. Their pharmacists are incredibly knowledgeable and always take the time to explain everything.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Local Resident",
    content: "The fast delivery service is a lifesaver. I ordered my medications in the morning and they were at my doorstep before lunch. Truly premium service!",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Health Enthusiast",
    content: "I love their selection of organic supplements. It's hard to find such high-quality products elsewhere. The store atmosphere is also very welcoming.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-foreground text-white relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
            Testimonials
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Trusted by Thousands of <br />
            <span className="text-secondary italic">Happy Customers</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-lg p-8 rounded-[40px] border border-white/10 relative group hover:bg-white/10 transition-all"
            >
              <Quote className="text-primary/40 mb-6" size={40} />
              
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#047857" className="text-primary" />
                ))}
              </div>

              <p className="text-xl leading-relaxed mb-8 text-white/80 italic">
                &quot;{review.content}&quot;
              </p>

              <div>
                <p className="font-bold text-xl">{review.name}</p>
                <p className="text-primary font-medium text-sm">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          {/* Mock Brand Logos */}
          <span className="font-display text-2xl font-black">MEDICARE</span>
          <span className="font-display text-2xl font-black">HEALTH+</span>
          <span className="font-display text-2xl font-black">TRUSTCARE</span>
          <span className="font-display text-2xl font-black">WELLNESS CO.</span>
        </div>
      </div>
    </section>
  );
}
