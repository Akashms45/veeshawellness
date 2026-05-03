import { TransitionLink } from "./page-transition";
import { Globe, Camera, Send, Users, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <TransitionLink href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
                V
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-foreground">
                Veesha<span className="text-primary">Wellness</span>
              </span>
            </TransitionLink>
            <p className="text-muted leading-relaxed mb-8">
              Your trusted partner in health and wellness. Providing high-quality medications and expert care for over a decade.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all border border-border">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all border border-border">
                <Camera size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all border border-border">
                <Send size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all border border-border">
                <Users size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-foreground">Quick Links</h4>
            <ul className="space-y-4">
              {["Home", "About Us", "Our Products", "Testimonials", "Contact Us"].map((link) => {
                const id = link.toLowerCase().replace(" ", "");
                const sectionId = id === "home" ? "home" : id;
                return (
                  <li key={link}>
                    <TransitionLink 
                      href="/" 
                      sectionId={sectionId}
                      className="text-muted hover:text-primary transition-colors"
                    >
                      {link}
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-foreground">Services</h4>
            <ul className="space-y-4">
              {["Prescription Refill", "Online Consultation", "Home Delivery", "Health Screenings", "Wellness Kits"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-foreground">Stay Updated</h4>
            <p className="text-muted mb-6">Subscribe to our newsletter for health tips and exclusive offers.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-6 py-4 rounded-2xl bg-white border border-border focus:border-primary outline-none"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-primary text-white px-4 rounded-xl font-bold hover:bg-primary-hover transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted">
          <p>© 2026 Veesha Wellness. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Cookie Policy</a>
          </div>
          <p className="flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> for your health.
          </p>
        </div>
      </div>
    </footer>
  );
}
