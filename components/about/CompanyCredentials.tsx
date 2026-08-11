"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import { ExternalLink, ShieldCheck, CheckCircle2, X, Eye, Award, Maximize2 } from "lucide-react";
import { FadeUp } from "@/components/animations/Animations";

interface CredentialItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  keyLabel: string;
  keyValue: string;
  image: string;
  pdfUrl?: string | null;
  details: { label: string; value: string }[];
}

const credentialsData: CredentialItem[] = [
  {
    id: "duns-cert",
    title: "D-U-N-S® Registration Certificate",
    badge: "Official Certificate",
    description:
      "CALDIM ENGINEERING PRIVATE LIMITED is officially registered with Dun & Bradstreet (D&B) and has been assigned a unique D-U-N-S® Number.",
    keyLabel: "D-U-N-S® Number",
    keyValue: "86-039-9952",
    image: "/credentials/duns-certificate.png",
    pdfUrl: "/credentials/duns-certificate.pdf",
    details: [
      { label: "Registered Entity", value: "CALDIM ENGINEERING PRIVATE LIMITED" },
      { label: "D-U-N-S® Number", value: "86-039-9952" },
      { label: "Validity Period", value: "July 2026 – July 2027" },
      { label: "GST Number", value: "33AAGCC4916J1ZP" },
      { label: "Place of Issue", value: "Mumbai" },
      {
        label: "Registered Address",
        value: "First Floor, 118, Minimac Business Centre, Arcot Road, Ramapuram, Chennai - 600087, Tamil Nadu, India",
      },
    ],
  },
];

export function CompanyCredentials() {
  const [selectedCredential, setSelectedCredential] = useState<CredentialItem | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Lock background scroll whenever modal or fullscreen image is active
  useEffect(() => {
    if (selectedCredential || fullscreenImage) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      document.body.style.touchAction = "none";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overflow = "";
    };
  }, [selectedCredential, fullscreenImage]);

  return (
    <>
      {/* Official Dun & Bradstreet Live Verification & QR Code Scripts */}
      <Script src="https://dunsregistered.dnb.com" strategy="lazyOnload" />
      <Script src="https://dunsregistered.dnb.com/QRcode.js?QRW=100&QRH=100" strategy="lazyOnload" />

      <FadeUp delay={0.15} className="mt-12">
        <div id="credentials" className="bg-[var(--navy)] text-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-blue-400/20 relative overflow-hidden">
          {/* Ambient background decorative glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-10 relative z-10">
            <div className="badge font-700 uppercase tracking-widest text-[11px] px-3.5 py-1 mb-3 bg-blue-500/20 text-blue-300 border border-blue-400/30 inline-flex items-center gap-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Company Credentials
            </div>
            <h2 className="text-2xl md:text-4xl font-900 text-white tracking-tight mb-2">
              Registered. Verified. Trusted.
            </h2>
            <div className="w-14 h-1 bg-blue-500 rounded-full mx-auto" />
          </div>

          {/* 2-Column Balanced Credentials Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
            
            {/* Left Column: Official D-U-N-S Registration Certificate Card */}
            <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl flex flex-col justify-between hover:border-blue-400/50 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-800 uppercase tracking-widest px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    Official D&B Registration
                  </span>
                  <span className="text-xs font-700 text-slate-400">Issued: Mumbai</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                  {/* Certificate Image Thumbnail */}
                  <div 
                    onClick={() => setSelectedCredential(credentialsData[0])}
                    className="relative w-full sm:w-44 h-56 rounded-2xl overflow-hidden border border-blue-500/40 bg-slate-950 shadow-xl flex-shrink-0 cursor-pointer group/img flex items-center justify-center p-2"
                  >
                    <Image
                      src="/credentials/duns-certificate.png"
                      alt="D-U-N-S Registration Certificate"
                      fill
                      className="object-contain p-2 group-hover/img:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <span className="bg-slate-900 text-white text-xs font-700 px-3 py-1.5 rounded-full shadow-lg border border-white/20 inline-flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-blue-400" />
                        Preview Document
                      </span>
                    </div>
                  </div>

                  {/* Certificate Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-900 text-white leading-snug mb-2">
                      D-U-N-S® Registration Certificate
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                      CALDIM ENGINEERING PRIVATE LIMITED is officially registered with Dun & Bradstreet (D&B) and assigned a verified global D-U-N-S® Number.
                    </p>

                    <div className="bg-slate-950/80 rounded-2xl p-4 border border-blue-500/25">
                      <div className="text-[11px] font-800 uppercase tracking-widest text-slate-400 mb-1">
                        Assigned D-U-N-S® Number
                      </div>
                      <div className="text-2xl sm:text-3xl font-900 text-blue-400 tracking-tight">
                        86-039-9952
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate Actions */}
              <div className="pt-4 border-t border-blue-500/20 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-slate-400 font-600 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Validity: July 2026 – July 2027
                </span>
                <button
                  onClick={() => setSelectedCredential(credentialsData[0])}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-700 text-sm transition-all shadow-lg hover:shadow-blue-500/25"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview Official Certificate</span>
                </button>
              </div>
            </div>

            {/* Right Column: Dun & Bradstreet Digital Verification Center Card */}
            <div className="lg:col-span-5 bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl flex flex-col justify-between hover:border-blue-400/50 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-800 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Live D&B Verification
                  </span>
                  <span className="text-xs font-700 text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    Status: Active
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5 bg-slate-950/80 rounded-2xl p-5 border border-blue-500/25 mb-6">
                  {/* Scannable D&B Emblem QR Code */}
                  <div 
                    onClick={() => setFullscreenImage("/credentials/duns-official-qr.png")}
                    className="relative w-28 h-28 bg-white rounded-2xl p-2 flex items-center justify-center shadow-xl border border-white/20 shrink-0 cursor-pointer group/qr overflow-hidden"
                    title="Click to expand QR Code"
                  >
                    <Image
                      src="/credentials/duns-official-qr.png"
                      alt="D-U-N-S Scannable QR Code"
                      fill
                      className="object-contain p-1 group-hover/qr:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* QR Details */}
                  <div className="text-center sm:text-left">
                    <h4 className="text-base font-800 text-white mb-1">
                      Official Verification QR Code
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      Scan with any smartphone camera to view CALDIM's live D&B profile.
                    </p>
                    <button
                      onClick={() => setFullscreenImage("/credentials/duns-official-qr.png")}
                      className="inline-flex items-center gap-1.5 text-xs font-700 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <span>Expand QR Code</span>
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Corporate Registration Meta Grid */}
                <div className="space-y-2.5">
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-600">Registered Entity</span>
                    <span className="text-white font-700 text-right">CALDIM ENGINEERING PVT LTD</span>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-600">GST Registration</span>
                    <span className="text-blue-400 font-700 font-mono">33AAGCC4916J1ZP</span>
                  </div>
                </div>
              </div>

              {/* Verification Footer Link */}
              <div className="pt-4 mt-6 border-t border-blue-500/20 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-600">
                  D&B Authenticated Portal
                </span>
                <button
                  onClick={() => setSelectedCredential(credentialsData[0])}
                  className="inline-flex items-center gap-1.5 text-xs font-700 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>View Full Verification Record</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </FadeUp>

      {/* Modal Dialog Component */}
      {selectedCredential && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-xl animate-fade-in overflow-hidden"
          onClick={() => setSelectedCredential(null)}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div
            className="bg-slate-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-blue-500/30 flex flex-col max-h-[85vh] relative animate-scale-up text-white z-[100000]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-slate-950/80 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/30">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-800 text-white leading-tight">{selectedCredential.title}</h3>
                  <p className="text-xs text-slate-400 font-500">Official Company Verification Record</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCredential(null)}
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-colors border border-white/10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - Scrollable inside modal only */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
              {/* Full Document Preview Box */}
              <div
                onClick={() => setFullscreenImage(selectedCredential.image)}
                className="relative w-full h-60 sm:h-72 bg-slate-950 rounded-2xl overflow-hidden border border-blue-500/30 flex items-center justify-center p-4 shadow-inner cursor-pointer group/preview"
              >
                <Image
                  src={selectedCredential.image}
                  alt={selectedCredential.title}
                  fill
                  className="object-contain p-3 group-hover/preview:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-3 right-3 bg-slate-900/90 text-blue-300 text-xs font-700 px-3 py-1.5 rounded-full border border-blue-400/40 shadow-lg flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to Expand</span>
                </div>
              </div>

              {/* Verified Specification Details */}
              <div>
                <h4 className="text-xs font-800 uppercase tracking-widest text-slate-400 mb-3">
                  Verified Corporate Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedCredential.details.map(({ label, value }) => (
                    <div key={label} className="bg-slate-800/70 p-3 rounded-xl border border-slate-700/60">
                      <div className="text-[11px] font-700 text-slate-400 uppercase tracking-wider">{label}</div>
                      <div className="text-sm font-700 text-white mt-0.5 break-all">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-slate-400 font-600 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified & Issued by Dun & Bradstreet (D&B)
              </span>
              <div className="flex items-center gap-3">
                {selectedCredential.pdfUrl && (
                  <a
                    href={selectedCredential.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-700 text-sm hover:bg-blue-500 transition-colors shadow-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview Certificate PDF</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedCredential(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-700 text-sm hover:bg-slate-700 transition-colors border border-white/10"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Document/Seal Image Lightbox Overlay */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center p-4 sm:p-8 bg-slate-950/95 backdrop-blur-xl animate-fade-in overflow-hidden"
          onClick={() => setFullscreenImage(null)}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Prominent High-Visibility Floating Close Button */}
          <button
            onClick={() => setFullscreenImage(null)}
            className="fixed top-6 right-6 sm:top-8 sm:right-12 z-[100000] p-3.5 bg-slate-900/90 text-white rounded-full hover:bg-blue-600 hover:scale-110 active:scale-95 transition-all duration-200 shadow-2xl border-2 border-blue-400/60 flex items-center justify-center group"
            aria-label="Close fullscreen preview"
            title="Close Preview (Esc)"
          >
            <X className="w-6 h-6 text-blue-300 group-hover:text-white transition-colors" />
          </button>

          <div
            className="relative w-full max-w-5xl h-[85vh] flex items-center justify-center p-2 z-[99999]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={fullscreenImage}
              alt="Fullscreen Certificate Preview"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
