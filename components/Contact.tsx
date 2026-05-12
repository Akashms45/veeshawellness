"use client";

import { Mail, Phone, Send, User } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{ backgroundColor: "#386BB4" }}
    >
      {/* Subtle radial glow bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 sm:px-12 lg:px-24 xl:px-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center">

          {/* ── Left: Info ── */}
          <div className="text-white order-2 lg:order-1">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-4 sm:mb-6 tracking-tight font-display">
              Contact Us
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-10 sm:mb-14 max-w-sm font-sans">
              Not sure what you need? The team at Veesha Wellness will be happy
              to listen to you and suggest the right products you hadn't
              considered.
            </p>

            <div className="flex flex-col gap-5 sm:gap-6">
              
              <a
                href="mailto:hello@veeshawellness.com"
                className="flex items-center gap-4 group font-sans"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                >
                  <Mail size={17} className="text-white" />
                </div>
                <span className="text-white/80 text-sm sm:text-base group-hover:text-white transition-colors">
                  hello@veeshawellness.com
                </span>
              </a>

              <a href="tel:+12345678900" className="flex items-center gap-4 group font-sans">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                >
                  <Phone size={17} className="text-white" />
                </div>
                <span className="text-white/80 text-sm sm:text-base group-hover:text-white transition-colors">
                  Support: (+1) 234 567 890
                </span>
              </a>
            </div>
          </div>

          {/* ── Right: Card + Form ── */}
          <div className="order-1 lg:order-2 relative lg:-ml-10 xl:-ml-20">
            {/* Decorative concentric arcs — top right of card */}
            <div className="absolute -top-6 -right-4 w-28 sm:w-36 h-28 sm:h-36 pointer-events-none overflow-hidden rounded-tr-3xl">
              {[0, 12, 24, 36, 48].map((offset) => (
                <div
                  key={offset}
                  className="absolute rounded-full border"
                  style={{
                    width: `${120 + offset * 8}px`,
                    height: `${120 + offset * 8}px`,
                    top: `-${offset * 4}px`,
                    right: `-${offset * 4}px`,
                    borderColor: "rgba(61,53,102,0.15)",
                  }}
                />
              ))}
            </div>

            <div className="bg-white rounded-3xl sm:rounded-[32px] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
              <h3 className="text-xl sm:text-2xl lg:text-[1.6rem] font-black text-gray-900 leading-snug mb-6 sm:mb-8 font-display">
                We'd love to hear from you!
                <br />
                Let's get in touch
              </h3>

              <form className="space-y-4 sm:space-y-5">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className="text-xs font-semibold text-gray-600">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        id="fullName"
                        type="text"
                        placeholder="Enter your name"
                        className="w-full pl-9 pr-4 py-3 rounded-xl border text-sm text-gray-900 placeholder:text-gray-500 outline-none transition-all focus:ring-2"
                        style={{
                          borderColor: "#e5e7eb",
                          // @ts-ignore
                          "--tw-ring-color": "#3d356620",
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-gray-600">
                      Email
                    </label>
                    <div className="relative">
                      <Mail
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        id="email"
                        type="email"
                        placeholder="olivia@untitled.com"
                        className="w-full pl-9 pr-4 py-3 rounded-xl border text-sm text-gray-900 placeholder:text-gray-500 outline-none transition-all focus:ring-2"
                        style={{ borderColor: "#e5e7eb" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-xs font-semibold text-gray-600">
                    Phone number
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="countryCode"
                      aria-label="Country Code"
                      className="px-3 py-3 rounded-xl border text-sm text-gray-700 outline-none bg-white shrink-0"
                      style={{ borderColor: "#e5e7eb" }}
                    >
                      <option>IN</option>
                      <option>US</option>
                      <option>UK</option>
                    </select>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="flex-1 px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder:text-gray-500 outline-none transition-all focus:ring-2"
                      style={{ borderColor: "#e5e7eb" }}
                    />
                  </div>
                </div>



                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-gray-600 font-sans">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Type your message here"
                    className="w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder:text-gray-500 outline-none transition-all focus:ring-2 resize-none font-sans"
                    style={{ borderColor: "#e5e7eb" }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="px-7 py-3 rounded-xl text-white text-sm font-bold flex items-center gap-2 transition-all active:scale-95 hover:opacity-90"
                  style={{ backgroundColor: "#2a5491" }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
} 