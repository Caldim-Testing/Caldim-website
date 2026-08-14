"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Zap, Shield, BarChart3, Cpu, GitBranch } from "lucide-react";
import { FadeUp } from "../animations/Animations";

/* ─── Animated Hero SVG Dashboard ─────────────────────────────── */
const HeroDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>("CALTIMS");

  const productTabs = [
    { id: "CALTIMS", label: "CALTIMS", fullLabel: "CALTIMS Payroll", badge: "99.8% Automated", icon: BarChart3, color: "var(--accent-light)", path: "caltims-payroll" },
    { id: "CALRIMS", label: "CALRIMS", fullLabel: "CALRIMS AI HR", badge: "Voice AI Active", icon: Cpu, color: "#F59E0B", path: "calrims-ai-recruitment" },
    { id: "CALBUY", label: "CALBUY", fullLabel: "CALBUY Sourcing", badge: "Auto-Vendor Bidding", icon: Zap, color: "#10B981", path: "calbuy-procurement" },
    { id: "Workflows", label: "Workflows", fullLabel: "Enterprise Flow", badge: "Telemetry Velocity", icon: GitBranch, color: "#A855F7", path: "workflows-automation" },
    { id: "Security", label: "Security", fullLabel: "Data Governance", badge: "256-bit Encryption", icon: Shield, color: "#3B82F6", path: "security-compliance" },
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Outer glow */}
      <div className="absolute inset-0 bg-[var(--accent)] opacity-15 blur-3xl rounded-3xl scale-95" />

      {/* Browser frame */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative rounded-2xl overflow-hidden border border-blue-400/30 shadow-2xl max-w-full w-full"
        style={{ background: "rgba(7,27,52,0.92)", backdropFilter: "blur(16px)" }}
      >
        {/* Top Product Switcher Header Bar */}
        <div className="bg-slate-950/80 px-3 py-2 border-b border-white/10 flex items-center justify-between gap-2 overflow-x-auto custom-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
          </div>

          {/* Interactive Product Tabs */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {productTabs.map((tab) => {
              const active = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                  className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-700 transition-all duration-200 cursor-pointer flex items-center gap-1.5 border ${
                    active
                      ? "bg-blue-600/90 text-white border-blue-400/50 shadow-md shadow-blue-500/30 scale-[1.03]"
                      : "text-white/60 hover:text-white hover:bg-white/10 border-transparent"
                  }`}
                >
                  <Icon size={12} className={active ? "text-white" : "text-white/60"} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-1 text-[10px] font-mono text-white/50 bg-white/5 px-2.5 py-1 rounded-md border border-white/10 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>portal.caldim.software/{productTabs.find(t => t.id === activeTab)?.path}</span>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="flex flex-col sm:flex-row min-h-[340px] sm:min-h-[370px]">
          {/* Sidebar */}
          <div className="w-full sm:w-44 border-b sm:border-b-0 sm:border-r border-white/10 p-2 sm:p-3 flex sm:flex-col items-center sm:items-stretch gap-1.5 shrink-0 bg-white/[0.02] overflow-x-auto custom-scrollbar">
            <div className="hidden sm:flex items-center gap-2 px-2 py-1.5 mb-2">
              <div className="w-5 h-5 rounded bg-[var(--accent)] flex items-center justify-center shadow-sm shadow-[var(--accent)]/50">
                <span className="text-white text-xs font-bold">C</span>
              </div>
              <span className="text-white text-xs font-700 tracking-wide">CALDIM Suite</span>
            </div>
            <div className="flex sm:flex-col gap-1.5 w-full">
              {productTabs.map(({ icon: Icon, label, id, badge }) => {
                const active = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    type="button"
                    className={`flex items-center justify-between px-2.5 py-1.5 sm:py-2 rounded-lg text-xs transition-all duration-200 cursor-pointer shrink-0 ${
                      active
                        ? "bg-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/30 font-600 scale-[1.02]"
                        : "text-white/50 hover:text-white/85 hover:bg-white/8 font-500"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Icon size={13} className={active ? "text-white" : "text-white/60"} />
                      <span className="text-[11px] sm:text-xs">{label}</span>
                    </div>
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm shadow-white animate-pulse hidden sm:inline-block" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-3 sm:p-4 flex flex-col gap-3.5 overflow-hidden">
            {activeTab === "CALTIMS" && (
              <motion.div
                key="CALTIMS"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3.5 h-full"
              >
                {/* Metric cards row */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                  {[
                    { label: "CALTIMS Sync", fullLabel: "CALTIMS Payroll", value: "99.8%", delta: "Automated Timesheets", color: "var(--accent-light)" },
                    { label: "CALBUY Savings", fullLabel: "CALBUY Sourcing", value: "12%", delta: "Vendor Bidding", color: "#10B981" },
                    { label: "CALRIMS Hiring", fullLabel: "CALRIMS Pipeline", value: "1,240", delta: "Candidates Audited", color: "#F59E0B" },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-lg p-1.5 sm:p-2.5 transition-all hover:bg-white/8 text-center sm:text-left overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <div className="text-white/50 text-[9px] sm:text-[11px] mb-0.5 truncate">{metric.fullLabel}</div>
                      <div className="text-white font-700 text-sm sm:text-lg leading-none truncate">{metric.value}</div>
                      <div className="text-[8px] sm:text-[10px] mt-1 font-600 truncate" style={{ color: metric.color }}>{metric.delta}</div>
                    </div>
                  ))}
                </div>

                {/* Activity chart (SVG sparkline) */}
                <div
                  className="rounded-lg p-3 flex-1 flex flex-col justify-between"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-xs font-700 flex items-center gap-1.5">
                      <BarChart3 size={13} className="text-[var(--accent-light)]" />
                      CALDIM Digitalization Telemetry Velocity
                    </span>
                    <span className="text-[10px] font-700 text-[#10B981] bg-[#10B981]/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                      Live Feed
                    </span>
                  </div>
                  <svg viewBox="0 0 200 50" className="w-full h-14">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,42 C20,38 30,18 50,22 S80,10 100,15 S140,28 160,18 S190,5 200,8"
                      stroke="var(--accent-light)"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0,42 C20,38 30,18 50,22 S80,10 100,15 S140,28 160,18 S190,5 200,8 L200,50 L0,50 Z"
                      fill="url(#chartGrad)"
                    />
                    <motion.circle
                      cx="160"
                      cy="18"
                      r="3.5"
                      fill="var(--accent-light)"
                      animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </svg>
                </div>

                {/* Live log feed */}
                <div
                  className="rounded-lg p-3"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="text-white/70 text-[11px] font-700 mb-2 flex items-center justify-between">
                    <span>Live CALDIM Product Operations</span>
                    <span className="text-white/40 font-mono text-[9px]">UTC 14:28:09</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { status: "CALBUY PO", msg: "PO #9912 generated: 15 Tons TMT Steel from primary vendor", color: "#10B981" },
                      { status: "CALTIMS PAY", msg: "Processed monthly payroll for 480 workforce members", color: "var(--accent-light)" },
                      { status: "CALRIMS HR", msg: "Voice screening completed for Lead Mechanical Engineer", color: "#F59E0B" },
                    ].map((log) => (
                      <div key={log.msg} className="flex items-center gap-2 text-[11px]">
                        <span
                          className="px-1.5 py-0.5 rounded text-white text-[9px] font-800 shrink-0 tracking-wider"
                          style={{ background: `${log.color}30`, color: log.color, border: `1px solid ${log.color}40` }}
                        >
                          {log.status}
                        </span>
                        <span className="text-white/60 truncate">{log.msg}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "CALRIMS" && (
              <motion.div
                key="CALRIMS"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3.5 h-full"
              >
                {/* Metric cards row */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                  {[
                    { fullLabel: "Voice AI Screened", value: "1,240", delta: "Candidates Audited", color: "#F59E0B" },
                    { fullLabel: "Time-to-Hire", value: "-65%", delta: "Automated Shortlist", color: "#10B981" },
                    { fullLabel: "Voice Accuracy", value: "98.4%", delta: "Technical Speech AI", color: "var(--accent-light)" },
                  ].map((metric) => (
                    <div
                      key={metric.fullLabel}
                      className="rounded-lg p-1.5 sm:p-2.5 transition-all hover:bg-white/8 text-center sm:text-left overflow-hidden bg-white/5 border border-white/10"
                    >
                      <div className="text-white/50 text-[9px] sm:text-[11px] mb-0.5 truncate">{metric.fullLabel}</div>
                      <div className="text-white font-700 text-sm sm:text-lg leading-none truncate">{metric.value}</div>
                      <div className="text-[8px] sm:text-[10px] mt-1 font-600 truncate" style={{ color: metric.color }}>{metric.delta}</div>
                    </div>
                  ))}
                </div>

                {/* CALRIMS AI Voice Pipeline Box */}
                <div className="rounded-lg p-3 flex-1 flex flex-col justify-between bg-white/4 border border-white/6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-xs font-700 flex items-center gap-1.5">
                      <Cpu size={13} className="text-[#F59E0B]" />
                      CALRIMS Autonomous Voice & Resume Pipeline
                    </span>
                    <span className="text-[10px] font-700 text-[#F59E0B] bg-[#F59E0B]/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-ping" />
                      Voice AI Active
                    </span>
                  </div>

                  <div className="space-y-2 py-1">
                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-amber-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                        <div>
                          <div className="text-white font-700 text-xs">Voice AI Assessment: Sr. Mechanical Engineer</div>
                          <div className="text-white/50 text-[10px]">Analyzing 48 technical competency indicators...</div>
                        </div>
                      </div>
                      <span className="text-amber-400 font-mono font-700 text-xs">88.5% Score</span>
                    </div>

                    <div className="bg-slate-950/40 p-2 rounded-lg border border-white/5 flex items-center justify-between text-[11px]">
                      <span className="text-white/70">Candidate #1042: Shortlist recommendation ready</span>
                      <span className="text-emerald-400 font-600 text-[10px]">Auto-Scheduled</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "CALBUY" && (
              <motion.div
                key="CALBUY"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3.5 h-full"
              >
                {/* Metric cards row */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                  {[
                    { fullLabel: "Procurement Savings", value: "12%", delta: "Vendor Auto-Bidding", color: "#10B981" },
                    { fullLabel: "Active PO Volume", value: "₹4.2Cr", delta: "15 Tons TMT Steel", color: "var(--accent-light)" },
                    { fullLabel: "Compliance Score", value: "100%", delta: "Automated Auditing", color: "#F59E0B" },
                  ].map((metric) => (
                    <div
                      key={metric.fullLabel}
                      className="rounded-lg p-1.5 sm:p-2.5 transition-all hover:bg-white/8 text-center sm:text-left overflow-hidden bg-white/5 border border-white/10"
                    >
                      <div className="text-white/50 text-[9px] sm:text-[11px] mb-0.5 truncate">{metric.fullLabel}</div>
                      <div className="text-white font-700 text-sm sm:text-lg leading-none truncate">{metric.value}</div>
                      <div className="text-[8px] sm:text-[10px] mt-1 font-600 truncate" style={{ color: metric.color }}>{metric.delta}</div>
                    </div>
                  ))}
                </div>

                {/* CALBUY Live Bidding Engine */}
                <div className="rounded-lg p-3 flex-1 flex flex-col justify-between bg-white/4 border border-white/6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-xs font-700 flex items-center gap-1.5">
                      <Zap size={13} className="text-[#10B981]" />
                      CALBUY Real-Time Vendor Sourcing & Bidding Engine
                    </span>
                    <span className="text-[10px] font-700 text-[#10B981] bg-[#10B981]/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                      Auto-Bidding Active
                    </span>
                  </div>

                  <div className="space-y-2 py-1">
                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-emerald-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <div>
                          <div className="text-white font-700 text-xs">RFQ #4092: Industrial Automation Components</div>
                          <div className="text-white/50 text-[10px]">Lowest bid received: Vendor B (Saved ₹1,45,000)</div>
                        </div>
                      </div>
                      <span className="text-emerald-400 font-mono font-700 text-xs">PO Generated</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "Workflows" && (
              <motion.div
                key="Workflows"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3.5 h-full"
              >
                {/* Metric cards row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Active Pipelines", value: "18", delta: "CALBUY, CALTIMS & CALRIMS", color: "var(--accent-light)" },
                    { label: "Automated Hours", value: "4,280h", delta: "Saved per month", color: "#10B981" },
                    { label: "Dispatch Accuracy", value: "99.8%", delta: "Zero ERP Error Margin", color: "#A855F7" },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-lg p-2.5"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <div className="text-white/50 text-[11px] mb-1">{metric.label}</div>
                      <div className="text-white font-700 text-lg leading-none">{metric.value}</div>
                      <div className="text-[10px] mt-1 font-600" style={{ color: metric.color }}>{metric.delta}</div>
                    </div>
                  ))}
                </div>

                {/* Workflow Pipeline Diagram */}
                <div
                  className="rounded-lg p-3 flex-1 flex flex-col justify-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-white/80 text-xs font-700 flex items-center gap-1.5">
                      <GitBranch size={13} className="text-[#A855F7]" />
                      CALDIM Integrated Product Pipeline
                    </span>
                    <span className="text-[10px] font-700 text-[#A855F7] bg-[#A855F7]/20 px-2 py-0.5 rounded-full">
                      Automated Flow
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-center text-center">
                    <div className="bg-white/8 border border-white/12 rounded-md p-2 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-1 text-xs font-bold">1</div>
                      <span className="text-white font-600 text-[11px]">Timesheet Sync</span>
                      <span className="text-white/40 text-[9px] mt-0.5">CALTIMS Engine • 12ms</span>
                    </div>
                    <div className="bg-white/8 border border-white/12 rounded-md p-2 flex flex-col items-center relative">
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mb-1 text-xs font-bold">2</div>
                      <span className="text-white font-600 text-[11px]">Vendor Auto-Bid</span>
                      <span className="text-white/40 text-[9px] mt-0.5">CALBUY Sourcing • 85ms</span>
                    </div>
                    <div className="bg-white/8 border border-white/12 rounded-md p-2 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-1 text-xs font-bold">3</div>
                      <span className="text-white font-600 text-[11px]">Resume Screening</span>
                      <span className="text-white/40 text-[9px] mt-0.5">CALRIMS AI • 45ms</span>
                    </div>
                  </div>
                </div>

                {/* Recent Workflow Runs */}
                <div
                  className="rounded-lg p-3"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="text-white/70 text-[11px] font-700 mb-2">CALDIM Workflow Execution Status</div>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { name: "CALTIMS Track-to-Pay #4928", status: "COMPLETED", desc: "142 timesheets synced to ledger", color: "#10B981" },
                      { name: "CALBUY Vendor Sourcing #4927", status: "RUNNING", desc: "Bidding live across 4 suppliers", color: "var(--accent-light)" },
                      { name: "CALRIMS Candidate Flow #4926", status: "SUCCESS", desc: "Offer kit & portal login created", color: "#A855F7" },
                    ].map((flow) => (
                      <div key={flow.name} className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className="px-1.5 py-0.5 rounded text-white text-[9px] font-800 tracking-wider shrink-0"
                            style={{ background: `${flow.color}30`, color: flow.color, border: `1px solid ${flow.color}40` }}
                          >
                            {flow.status}
                          </span>
                          <span className="text-white font-600 truncate">{flow.name}</span>
                        </div>
                        <span className="text-white/45 text-[10px] shrink-0">{flow.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "Security" && (
              <motion.div
                key="Security"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3.5 h-full"
              >
                {/* Metric cards row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Data Governance", value: "A+", delta: "Statutory Compliant", color: "#10B981" },
                    { label: "Access Control", value: "RBAC", delta: "Module-Level Permissions", color: "var(--accent-light)" },
                    { label: "Audit Ledger", value: "100%", delta: "Indian Tax, PF & ESI", color: "#A855F7" },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-lg p-2.5"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <div className="text-white/50 text-[11px] mb-1">{metric.label}</div>
                      <div className="text-white font-700 text-lg leading-none">{metric.value}</div>
                      <div className="text-[10px] mt-1 font-600" style={{ color: metric.color }}>{metric.delta}</div>
                    </div>
                  ))}
                </div>

                {/* Security Protection Status */}
                <div
                  className="rounded-lg p-3 flex-1"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-white/80 text-xs font-700 flex items-center gap-1.5">
                      <Shield size={13} className="text-[#10B981]" />
                      Enterprise Financial & Workforce Protection
                    </span>
                    <span className="text-[10px] font-700 text-[#10B981] bg-[#10B981]/20 px-2 py-0.5 rounded-full">
                      Zero Data Leakage
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { rule: "CALTIMS Salary Ledger", action: "ENCRYPTED", desc: "256-bit AES protection on salary & bank files", color: "#10B981" },
                      { rule: "CALBUY PO Approval", action: "AUDITED", desc: "Immutable procurement approval logs verified", color: "var(--accent-light)" },
                      { rule: "CALRIMS Candidate IAM", action: "VERIFIED", desc: "Role-based access check passed for HR team", color: "#A855F7" },
                    ].map((sec) => (
                      <div key={sec.rule} className="flex items-center gap-2 text-[11px] bg-white/[0.03] p-2 rounded border border-white/5">
                        <span
                          className="px-1.5 py-0.5 rounded text-white text-[9px] font-800 shrink-0 tracking-wider"
                          style={{ background: `${sec.color}30`, color: sec.color, border: `1px solid ${sec.color}40` }}
                        >
                          {sec.action}
                        </span>
                        <div className="truncate">
                          <span className="text-white font-600 mr-1.5">{sec.rule}:</span>
                          <span className="text-white/50 text-[10px]">{sec.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Encryption badge */}
                <div
                  className="rounded-lg p-3 flex items-center justify-between"
                  style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#10B981]/20 flex items-center justify-center text-[#10B981]">
                      <Shield size={15} />
                    </div>
                    <div>
                      <div className="text-white font-700 text-[11px]">CALDIM Enterprise Data Governance</div>
                      <div className="text-[#10B981] text-[10px]">Statutory Tax, PF, ESI & Bank File Security Active</div>
                    </div>
                  </div>
                  <span className="text-xs text-[#10B981] font-800 px-2 py-0.5 bg-[#10B981]/20 rounded">SECURE</span>
                </div>
              </motion.div>
            )}

            {activeTab === "AI Engine" && (
              <motion.div
                key="AI Engine"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3.5 h-full"
              >
                {/* Metric cards row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Active Intelligence", value: "CAL-AI", delta: "Product Core", color: "var(--accent-light)" },
                    { label: "Screening Speed", value: "180ms", delta: "Sub-Second Processing", color: "#10B981" },
                    { label: "Data Sourced", value: "4.8M", delta: "POs, Logs & Resumes", color: "#F59E0B" },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-lg p-2.5"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <div className="text-white/50 text-[11px] mb-1">{metric.label}</div>
                      <div className="text-white font-700 text-lg leading-none">{metric.value}</div>
                      <div className="text-[10px] mt-1 font-600" style={{ color: metric.color }}>{metric.delta}</div>
                    </div>
                  ))}
                </div>

                {/* AI Agents & Models Pipeline */}
                <div
                  className="rounded-lg p-3 flex-1"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-white/80 text-xs font-700 flex items-center gap-1.5">
                      <Cpu size={13} className="text-[var(--accent-light)]" />
                      CALDIM Product Sourcing & Telemetry Engine
                    </span>
                    <span className="text-[10px] font-700 text-[var(--accent-light)] bg-[var(--accent)]/30 px-2 py-0.5 rounded-full">
                      Product Intelligence v3
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { agent: "CALRIMS AI Screener", task: "Extracting candidate resume profiles & running adaptive Q&A", status: "ACTIVE", color: "var(--accent-light)" },
                      { agent: "CALBUY Smart Sourcing", task: "Analyzing vendor pricing history for optimal PO creation", status: "RUNNING", color: "#10B981" },
                      { agent: "Warehouse Telemetry", task: "Monitoring stock thresholds & auto-generating reorder alerts", status: "ONLINE", color: "#A855F7" },
                    ].map((item) => (
                      <div key={item.agent} className="flex items-center justify-between bg-white/5 rounded px-2.5 py-1.5 border border-white/8">
                        <div className="truncate pr-2">
                          <div className="text-white font-600 text-[11px]">{item.agent}</div>
                          <div className="text-white/50 text-[10px] truncate">{item.task}</div>
                        </div>
                        <span className="text-[9px] font-800 px-1.5 py-0.5 rounded shrink-0" style={{ background: `${item.color}25`, color: item.color, border: `1px solid ${item.color}40` }}>
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vector Database status */}
                <div
                  className="rounded-lg p-3 flex items-center justify-between"
                  style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-white font-600 text-[11px]">Real-Time Product Sourcing Index Active</span>
                  </div>
                  <span className="text-blue-400 font-700 text-[10px]">Sub-10ms similarity match</span>
                </div>
              </motion.div>
            )}

            {activeTab === "Automation" && (
              <motion.div
                key="Automation"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-3.5 h-full"
              >
                {/* Metric cards row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Active CALDIM Bots", value: "32 Bots", delta: "Working 24/7 autonomous", color: "var(--accent-light)" },
                    { label: "Daily Operations", value: "14.2K", delta: "Payroll, POs & Attendance", color: "#10B981" },
                    { label: "ROI Efficiency", value: "12x", delta: "Verified cost savings", color: "#A855F7" },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-lg p-2.5"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <div className="text-white/50 text-[11px] mb-1">{metric.label}</div>
                      <div className="text-white font-700 text-lg leading-none">{metric.value}</div>
                      <div className="text-[10px] mt-1 font-600" style={{ color: metric.color }}>{metric.delta}</div>
                    </div>
                  ))}
                </div>

                {/* Robotic Process & Integration Tasks */}
                <div
                  className="rounded-lg p-3 flex-1"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-white/80 text-xs font-700 flex items-center gap-1.5">
                      <Zap size={13} className="text-[#F59E0B]" />
                      CALDIM Digitalization & Process Automation
                    </span>
                    <span className="text-[10px] font-700 text-[#F59E0B] bg-[#F59E0B]/20 px-2 py-0.5 rounded-full">
                      Zero Human Error
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { name: "CALBUY ERP Integration Bot", detail: "Auto-synced purchase orders directly into enterprise ledger", status: "SUCCESS", color: "#10B981" },
                      { name: "CALTIMS Statutory Bot", detail: "Calculated monthly PF/ESI deductions for active workers", status: "COMPLETED", color: "var(--accent-light)" },
                      { name: "CALRIMS Onboarding Bot", detail: "Sent automated welcome kit & portal credentials", status: "COMPLETED", color: "#A855F7" },
                    ].map((bot) => (
                      <div key={bot.name} className="flex items-center justify-between bg-white/5 rounded px-2.5 py-1.5 border border-white/8">
                        <div className="truncate pr-2">
                          <div className="text-white font-600 text-[11px]">{bot.name}</div>
                          <div className="text-white/50 text-[10px] truncate">{bot.detail}</div>
                        </div>
                        <span className="text-[9px] font-800 px-1.5 py-0.5 rounded shrink-0" style={{ background: `${bot.color}25`, color: bot.color, border: `1px solid ${bot.color}40` }}>
                          {bot.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Autonomous processing card */}
                <div
                  className="rounded-lg p-3 flex items-center justify-between"
                  style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}
                >
                  <div className="flex items-center gap-2">
                    <Zap size={14} className="text-[#F59E0B]" />
                    <span className="text-white font-700 text-[11px]">CALDIM Autonomous Digitalization Suite</span>
                  </div>
                  <span className="text-[#F59E0B] font-700 text-[10px]">100% Unattended</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Floating cards */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute -left-20 top-12 hidden lg:block z-20"
        style={{ animation: "float 5s ease-in-out infinite" }}
      >
        <div
          className="rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl border border-white/12 backdrop-blur-md"
          style={{
            background: "rgba(7,27,52,0.9)",
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
            <Shield size={14} className="text-green-400" />
          </div>
          <div>
            <div className="text-white text-xs font-600">CALDIM Suite</div>
            <div className="text-green-400 text-[11px]">99.8% Automated Accuracy</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="absolute -right-18 bottom-20 hidden lg:block z-20"
        style={{ animation: "float 6s ease-in-out 1s infinite" }}
      >
        <div
          className="rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl border border-white/12 backdrop-blur-md"
          style={{
            background: "rgba(7,27,52,0.9)",
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Zap size={14} className="text-blue-400" />
          </div>
          <div>
            <div className="text-white text-xs font-600">CALBUY • CALTIMS • CALRIMS</div>
            <div className="text-blue-400 text-[11px]">Enterprise Digital Automation</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Hero Section ─────────────────────────────────────────────── */
export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden hero-bg pt-16 lg:pt-20"
      aria-label="Hero section"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Horizontal color-graded glow based on our theme */}
      <div className="absolute top-0 inset-x-0 h-[400px] pointer-events-none overflow-hidden z-0">
        {/* Center Blue Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-500/10 rounded-full blur-[80px]" />
        {/* Left Indigo/Purple Glow */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[250px] bg-indigo-500/8 rounded-full blur-[60px]" />
        {/* Right Cyan Glow */}
        <div className="absolute top-0 right-1/4 translate-x-1/2 w-[500px] h-[250px] bg-cyan-400/8 rounded-full blur-[60px]" />
      </div>

      {/* Spotlights */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, var(--accent) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, #60a5fa 0%, transparent 70%)",
        }}
      />

      <div className="container-wide relative z-10 py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Left: Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-start gap-1.5 mb-6"
            >
              {/* Ornamental flourish design element */}
              <div className="flex items-center gap-1.5 text-blue-500/30">
                <div className="w-6 h-px bg-current" />
                <span className="text-[8px]">✦</span>
                <div className="w-6 h-px bg-current" />
              </div>
              <span className="text-[10px] font-700 tracking-wider text-blue-600 uppercase">
                Enterprise Digital Automation Suite
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2.5 badge badge-accent mb-6 bg-blue-50/90 border border-blue-200/80 text-blue-700 px-3 sm:px-4 py-1.5 rounded-full shadow-sm max-w-full text-xs"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shrink-0" />
              <span className="font-800 tracking-wide shrink-0">CALDIM • DAS</span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="font-600 text-slate-700 text-[10px] sm:text-xs truncate">Digitalization & Automation Solutions</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-hero text-[var(--navy)] tracking-tight mb-4 sm:mb-6 leading-tight break-words"
            >
              Next-Generation Software & AI{" "}
              <span className="gradient-text">That Drives Business Growth</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-900 font-700 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mb-6 sm:mb-10 bg-white/90 backdrop-blur-md p-4 sm:px-6 sm:py-4 rounded-2xl shadow-sm border border-slate-200 w-full"
            >
              <strong className="text-blue-700 font-800">CALDIM-DAS (Digitalization & Automation Solutions)</strong> delivers enterprise software, AI solutions and industry-focused technology solutions built for modern businesses.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto max-w-full"
            >
              <Link href="/contact" className="btn btn-primary btn-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 transition-all duration-200 w-full sm:w-auto justify-center text-sm sm:text-base" id="hero-cta-primary">
                Schedule a Demo
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/services"
                className="btn btn-secondary btn-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all duration-200 w-full sm:w-auto justify-center text-sm sm:text-base"
                id="hero-cta-secondary"
              >
                Explore Our Services
                <ChevronRight size={18} />
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-200 grid grid-cols-3 gap-2 sm:gap-6"
            >
              {[
                { value: "1+", label: "Years" },
                { value: "15+", label: "Products" },
                { value: "10+", label: "Enterprise Products" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center sm:text-left flex flex-col justify-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-900 text-[var(--navy)] mb-0.5 sm:mb-1 tracking-tight">{value}</div>
                  <div className="text-slate-900 font-700 text-[10px] sm:text-xs md:text-sm leading-snug">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Dashboard visual */}
          <div className="relative">
            <HeroDashboard />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-slate-400 text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-8 bg-gradient-to-b from-slate-300 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
