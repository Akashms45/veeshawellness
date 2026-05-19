"use client";

import { Mail, Phone, Send, User, Loader2, CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!form.current) return;
    
    setIsSubmitting(true);
    setStatus("idle");
    setMessage("");

    // Replace these with your actual EmailJS credentials
    // Service ID, Template ID, Public Key
    emailjs
      .sendForm(
        "service_osdtzhp",
        "template_ljnzpid",
        form.current,
        {
          publicKey: "HAWgDx4FBh9Geuvoy",
        }
      )
      .then(
        () => {
          setStatus("success");
          setMessage("Message sent successfully! We'll get back to you soon.");
          form.current?.reset();
        },
        (error) => {
          setStatus("error");
          setMessage("Failed to send the message. Please try again later.");
          console.error("EmailJS Error:", error.text);
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

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
                href="mailto:veenaagm@gmail.com"
                className="flex items-center gap-4 group font-sans"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                >
                  <Mail size={17} className="text-white" />
                </div>
                <span className="text-white/80 text-sm sm:text-base group-hover:text-white transition-colors">
                  veenaagm@gmail.com
                </span>
              </a>

              <a href="tel:+916351259057" className="flex items-center gap-4 group font-sans">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                >
                  <Phone size={17} className="text-white" />
                </div>
                <span className="text-white/80 text-sm sm:text-base group-hover:text-white transition-colors">
                  Support: +91 635 125 9057
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

              <form ref={form} onSubmit={sendEmail} className="space-y-4 sm:space-y-5">
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
                        name="user_name"
                        type="text"
                        required
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
                        name="user_email"
                        type="email"
                        required
                        placeholder="john.doe@example.com"
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
                      name="country_code"
                      aria-label="Country Code"
                      className="px-3 py-3 rounded-xl border text-sm text-gray-700 outline-none bg-white shrink-0"
                      style={{ borderColor: "#e5e7eb" }}
                    >
                      <option value="IN">IN</option>
                      <option value="US">US</option>
                      <option value="UK">UK</option>
                    </select>
                    <input
                      id="phone"
                      name="user_phone"
                      type="tel"
                      required
                      placeholder="98765 43210"
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
                    name="message"
                    rows={4}
                    required
                    placeholder="Type your message here"
                    className="w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder:text-gray-500 outline-none transition-all focus:ring-2 resize-none font-sans"
                    style={{ borderColor: "#e5e7eb" }}
                  />
                </div>

                {status !== "idle" && (
                  <div className={`p-3 rounded-xl flex items-center gap-2 text-sm ${
                    status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}>
                    {status === "success" && <CheckCircle2 size={16} />}
                    {message}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-3 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 hover:opacity-90 disabled:opacity-70 disabled:pointer-events-none w-full sm:w-auto"
                  style={{ backgroundColor: "#2a5491" }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
} 