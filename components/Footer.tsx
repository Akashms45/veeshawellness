import { TransitionLink } from "./page-transition";

const productLinks = [
  { label: "View All", href: "/allproducts" },
  { label: "Ayurvedic Products", href: "/allproducts" },
  { label: "Wellness Kits", href: "/allproducts" },
  { label: "Daily Supplements", href: "/allproducts" },
];

const quickLinks = [
  { label: "Home", href: "/", sectionId: "home" },
  { label: "About Us", href: "/", sectionId: "about" },
  { label: "Our Products", href: "/", sectionId: "products" },
  { label: "Testimonials", href: "/", sectionId: "testimonials" },
  { label: "Contact Us", href: "/", sectionId: "contact" },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden font-sans"
      style={{ backgroundColor: "#f8f8f8" }}
    >
      {/* ── Main content grid ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-[75%] lg:max-w-[70%]">
        <div className="flex flex-col lg:flex-row">

          {/* ── LEFT COLUMN: Logo / Contact / Copyright ── */}
          <div
            className="flex flex-col justify-between py-10 sm:py-12 lg:py-14 pr-0 lg:pr-12 xl:pr-16 shrink-0
                        w-full lg:w-[260px] xl:w-[300px]
                        border-b lg:border-b-0 lg:border-r border-gray-300/60"
          >
            {/* Logo */}
            <div>
              <TransitionLink href="/" className="inline-flex items-center gap-2 mb-8 sm:mb-10">
                <img src="/logo.svg" alt="Veesha Wellness" width="200" height="50" className="h-10 sm:h-11 w-auto" />
              </TransitionLink>
            </div>

            <div className="mt-auto space-y-3">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-gray-900">Address: </span>
                <span className="text-gray-500">
                  123 Wellness Circle, Health Park, <br />
                  Mumbai, Maharashtra 400001
                </span>
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                © 2026 Veesha Wellness Pvt Ltd. All rights reserved.
              </p>
            </div>
          </div>

          {/* ── RIGHT SECTION ── */}
          <div className="flex-1 flex flex-col pl-0 lg:pl-10 xl:pl-14 py-10 sm:py-12 lg:py-14">

            <div className="grid grid-cols-2 gap-8 sm:gap-6">

              {/* Quick Links */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-4 sm:mb-5 tracking-wide uppercase">
                  Menu
                </h4>
                <ul className="space-y-2.5 sm:space-y-3">
                  {quickLinks.map(({ label, href, sectionId }) => (
                    <li key={label}>
                      <TransitionLink
                        href={href}
                        sectionId={sectionId}
                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        {label}
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* All Products */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-4 sm:mb-5 tracking-wide uppercase">
                  All Products
                </h4>
                <ul className="space-y-2.5 sm:space-y-3">
                  {productLinks.map(({ label, href }) => (
                    <li key={label}>
                      <TransitionLink
                        href={href}
                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        {label}
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── Watermark — bleeds out at the bottom exactly like the reference ── */}
      <div
        className="w-full overflow-hidden pointer-events-none select-none border-t border-gray-300/40 mt-2"
        aria-hidden="true"
      >
        <p
          className="text-[18vw] sm:text-[16vw] font-black leading-[0.82] tracking-tighter uppercase whitespace-nowrap text-center"
          style={{ color: "rgba(56, 107, 180, 0.08)" }}
        >
          VEESHA
        </p>
      </div>
    </footer>
  );
}