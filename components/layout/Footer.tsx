import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { DataNodeDivider } from "../shared/DataNodeDivider";

const footerLinks = {
  COMPANY: [
    { label: "About CALDIM", href: "/about" },
    { label: "Our Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Contact Us", href: "/contact" },
  ],
  PRODUCTS: [
    { label: "CALTIMS", href: "/products/caltims" },
    { label: "CALRIMS", href: "/products/calrims" },
    { label: "CALBUY", href: "/products/calbuy" },
    { label: "CALTRACK", href: "/products/caltrack" },
    { label: "View All", href: "/products" },
  ],
  SERVICES: [
    { label: "Enterprise Software", href: "/services#enterprise" },
    { label: "AI & ML Solutions", href: "/services#ai" },
    { label: "ERP & Automation", href: "/services#erp" },
    { label: "Consulting", href: "/services#consulting" },
  ],
  RESOURCES: [
    { label: "Book Consultation", href: "/contact" },
    { label: "Industries", href: "/industries" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--navy)] text-white relative overflow-hidden" aria-label="Site footer">
      <DataNodeDivider />

      <div className="container-wide py-10 sm:py-14">
        {/* Top Footer Row: Brand, 4-Category Navigation Grid, & D-U-N-S Seal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 items-start mb-8">
          
          {/* Brand Column (3 cols on desktop) */}
          <div className="lg:col-span-3">
            <Link
              href="/"
              className="flex items-center gap-3 mb-4 font-display font-900 text-xl tracking-tight text-white group"
              aria-label="CALDIM home"
            >
              <div className="relative h-9 w-14 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-md group-hover:bg-blue-500/40 transition-all duration-500" />
                <img
                  src="/logo/image.png"
                  alt="CALDIM CD Logo"
                  className="relative h-8 w-auto max-w-none object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="text-white group-hover:text-blue-100 transition-colors">
                CALDIM <span className="font-400 text-white">- DAS</span>
              </span>
            </Link>

            <p className="text-white/65 text-xs sm:text-sm leading-relaxed mb-4">
              Engineering-grade digital solutions for modern enterprises. Digitalization and automation solutions built for the industrial age.
            </p>

            {/* Direct Contact Links */}
            <div className="flex flex-col gap-2 pt-2">
              <a
                href="mailto:support@caldimdas.com"
                className="flex items-center gap-2 text-xs text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Mail size={13} className="text-blue-400 shrink-0" />
                <span>support@caldimdas.com</span>
              </a>
              <a
                href="tel:+918925862845"
                className="flex items-center gap-2 text-xs text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Phone size={13} className="text-blue-400 shrink-0" />
                <span>+91 8925862845 | +91 4344-6100737</span>
              </a>
            </div>
          </div>

          {/* Navigation Links Columns (6 cols on desktop) */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-white font-800 text-[10px] sm:text-xs mb-2.5 sm:mb-3.5 uppercase tracking-wider text-blue-300">{category}</h3>
                <ul className="flex flex-col gap-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-white/60 text-xs sm:text-sm hover:text-white transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Far Right: D-U-N-S® Registered Business Seal Card (3 cols on desktop) */}
          <div className="lg:col-span-3 flex justify-start lg:justify-end">
            <Link
              href="/about#credentials"
              className="bg-blue-950/40 border border-blue-500/25 rounded-2xl p-4 w-full max-w-[240px] flex flex-col items-center justify-center text-center shadow-lg hover:border-blue-400/60 hover:bg-blue-900/30 transition-all group"
            >
              <span className="text-[10px] font-800 text-blue-400 uppercase tracking-widest mb-2">
                D-U-N-S® Registered Business
              </span>

              {/* D-U-N-S Circular Badge Graphic */}
              <div className="relative w-24 h-24 my-1 flex items-center justify-center bg-white rounded-2xl p-2 shadow-md border border-white/20 overflow-hidden">
                <Image
                  src="/credentials/duns-badge-seal.png"
                  alt="D-U-N-S Registered Seal"
                  fill
                  className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* D-U-N-S Number */}
              <div className="mt-2">
                <div className="text-[10px] font-700 uppercase tracking-wider text-slate-400">
                  D-U-N-S® Number
                </div>
                <div className="text-base font-900 text-blue-400 tracking-tight group-hover:text-blue-300 transition-colors">
                  86-039-9952
                </div>
              </div>
            </Link>
          </div>

        </div>

        {/* Prominent & Attractive Office Locations Showcase Section */}
        <div className="border-t border-blue-500/25 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-400/40 shadow-inner">
                <MapPin size={18} className="animate-bounce" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm md:text-base font-900 uppercase tracking-wider text-white">
                  OUR CORPORATE OFFICES & LOCATIONS
                </h3>
                <p className="text-[11px] text-blue-300/80 font-500">
                  Headquarters in Chennai & Regional Branch in Hosur
                </p>
              </div>
            </div>
            <span className="text-[10px] sm:text-[11px] font-700 bg-blue-950/80 text-blue-300 px-2 sm:px-3 py-1 rounded-full border border-blue-500/30 shadow-sm">
              📍 Direct Contact & On-Site Consultation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chennai Head Office Card */}
            <div className="group bg-gradient-to-br from-slate-900/95 via-blue-950/70 to-slate-900/95 rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-blue-500/40 shadow-2xl hover:border-blue-400 hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/15 rounded-full blur-2xl group-hover:bg-blue-500/25 transition-all pointer-events-none" />
              
              <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                  <h4 className="text-xs sm:text-sm font-900 text-white tracking-wide">
                    INDIA — HEAD OFFICE
                  </h4>
                </div>
                <span className="text-[9px] sm:text-[10px] font-800 text-blue-200 bg-blue-600/30 border border-blue-400/50 px-2 sm:px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Headquarters
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-500 mb-4 pl-3.5 border-l-2 border-blue-400 relative z-10">
                Minimac Center #118, First Floor, Arcot Road, Valasaravakkam, TamilNadu, Chennai – 600087
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-blue-500/20 text-xs relative z-10">
                <span className="text-slate-300 font-600">Office Telephone:</span>
                <a
                  href="tel:2484553855"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-800 transition-all border border-blue-300/40 shadow-md hover:scale-105"
                >
                  <Phone size={13} className="text-white" />
                  <span>248-455 3855</span>
                </a>
              </div>
            </div>

            {/* Hosur Branch Office Card */}
            <div className="group bg-gradient-to-br from-slate-900/95 via-blue-950/70 to-slate-900/95 rounded-xl sm:rounded-2xl p-4 sm:p-5 border-2 border-blue-500/40 shadow-2xl hover:border-blue-400 hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/15 rounded-full blur-2xl group-hover:bg-blue-500/25 transition-all pointer-events-none" />
              
              <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                  </span>
                  <h4 className="text-xs sm:text-sm font-900 text-white tracking-wide">
                    INDIA — BRANCH OFFICE
                  </h4>
                </div>
                <span className="text-[9px] sm:text-[10px] font-800 text-blue-200 bg-blue-600/30 border border-blue-400/50 px-2 sm:px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Branch Office
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-500 mb-4 pl-3.5 border-l-2 border-blue-400 relative z-10">
                Plot No. 22, 23, 24, 2nd Floor, Durga Bhavani Towers, Thirsul Layout, Near RTO Check Post, NH 207, Bagalur Road, TamilNadu, Hosur – 635103
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-blue-500/20 text-xs relative z-10">
                <span className="text-slate-300 font-600">Office Telephone:</span>
                <a
                  href="tel:04344610637"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-800 transition-all border border-blue-300/40 shadow-md hover:scale-105"
                >
                  <Phone size={13} className="text-white" />
                  <span>04344610637</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/10 bg-slate-950/40">
        <div className="container-wide py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            &copy; {currentYear} CALDIM Software Division. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/caldim-engineering/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CALDIM on LinkedIn"
              className="text-white/40 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/caldim_engineering?igsh=a3NpaDZ0aGZlcnQ0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CALDIM on Instagram"
              className="text-white/40 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
