"use client";

import { ShieldCheck, Clock, Award, Truck, HeartHandshake, Microscope } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={32} className="text-primary" />,
    title: "Certified Quality",
    description: "WHO-GMP and PIC/S certified facilities ensuring the highest standards of safety and efficacy.",
  },
  {
    icon: <Microscope size={32} className="text-primary" />,
    title: "Advanced Research",
    description: "State-of-the-art laboratories dedicated to developing superior and innovative healthcare solutions.",
  },
  {
    icon: <Award size={32} className="text-primary" />,
    title: "Award-Winning Care",
    description: "Recognized industry-wide for excellence in pharmaceutical manufacturing and patient satisfaction.",
  },
  {
    icon: <HeartHandshake size={32} className="text-primary" />,
    title: "Patient-Centric Approach",
    description: "We prioritize human health with compassionate, reliable, and accessible medical care.",
  },
  {
    icon: <Truck size={32} className="text-primary" />,
    title: "Global Reach",
    description: "Trusted exporter and government tenderer, delivering essential medicines worldwide.",
  },
  {
    icon: <Clock size={32} className="text-primary" />,
    title: "24/7 Availability",
    description: "Round-the-clock support to ensure you have access to the care you need, when you need it.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-mint-50/50 rounded-l-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
            Why Choose <span className="text-primary">Veesha Wellness?</span>
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            With over a decade of excellence, we combine modern technology with human compassion to deliver 
            accessible, high-quality healthcare solutions you can trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/40 hover:shadow-[0_8px_30px_rgb(4,120,87,0.1)] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-mint-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-display">{feature.title}</h3>
              <p className="text-muted leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
