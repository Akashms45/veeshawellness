"use client";

import { Mail, MapPin, Phone, Send, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-mint-50/20">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-[60px] overflow-hidden shadow-2xl border border-border/50">
          <div className="grid lg:grid-cols-2">
            {/* Contact Info */}
            <div className="bg-primary p-12 lg:p-20 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              
              <h2 className="font-display text-4xl font-bold mb-8 relative z-10">
                Get In Touch
              </h2>
              <p className="text-white/80 text-lg mb-12 relative z-10">
                Have questions about a prescription or our wellness products? Our team is here to help you 24/7.
              </p>

              <div className="space-y-8 relative z-10">
                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Phone</p>
                    <p className="text-xl font-bold">+1 (234) 567-890</p>
                  </div>
                </div>

                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Email</p>
                    <p className="text-xl font-bold">hello@veeshawellness.com</p>
                  </div>
                </div>

                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Address</p>
                    <p className="text-xl font-bold">123 Wellness Blvd, Healthcare City</p>
                  </div>
                </div>

                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Opening Hours</p>
                    <p className="text-xl font-bold">Mon - Sun: 08:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-12 lg:p-20">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/60 uppercase">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-border focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/60 uppercase">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-border focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/60 uppercase">Subject</label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-border focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none appearance-none">
                    <option>General Inquiry</option>
                    <option>Prescription Question</option>
                    <option>Product Availability</option>
                    <option>Feedback</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/60 uppercase">Message</label>
                  <textarea
                    rows={4}
                    placeholder="How can we help you today?"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-border focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary/90 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-secondary/20 hover:shadow-secondary/40 active:scale-[0.98]"
                >
                  Send Message
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
