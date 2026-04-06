"use client"

import { useEffect, useRef } from "react"

interface HeroSectionProps {
  onCTAClick: () => void
}

export function HeroSection({ onCTAClick }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("hero-visible")
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{ background: "var(--background)" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, rgba(34,197,94,0.08) 0%, transparent 60%),
            linear-gradient(rgba(45,63,85,0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45,63,85,0.25) 1px, transparent 1px)`,
          backgroundSize: "100% 100%, 64px 64px, 64px 64px",
        }}
      />

      {/* Glow orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
        }}
      />

      <div
        ref={heroRef}
        className="relative max-w-6xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-16 lg:gap-20"
        style={{ opacity: 0, transition: "opacity 0.8s ease, transform 0.8s ease", transform: "translateY(24px)" }}
      >
        {/* Text column */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", color: "var(--primary)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--primary)" }} />
            MVP em desenvolvimento — lista aberta
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-balance mb-6"
            style={{ color: "var(--foreground)" }}
          >
            Preveja crises de dor{" "}
            <span style={{ color: "var(--primary)" }}>antes que elas</span>{" "}
            aconteçam
          </h1>

          <p
            className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
            style={{ color: "var(--foreground-muted)" }}
          >
            A Fibrosync usa dados do seu corpo para identificar riscos e te ajudar
            a agir antes da dor piorar. Menos crises, mais controle.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <button
              onClick={onCTAClick}
              className="group relative flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                boxShadow: "0 0 32px rgba(34,197,94,0.3), 0 4px 24px rgba(0,0,0,0.4)",
              }}
            >
              Entrar na lista de espera
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 px-6 py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-80"
              style={{ color: "var(--foreground-muted)", border: "1px solid var(--border)" }}
            >
              Ver como funciona
            </button>
          </div>

          {/* Social proof */}
          <div className="mt-10 flex items-center gap-4 justify-center lg:justify-start">
            <div className="flex -space-x-2">
              {["#4f8ef7", "#9c6fde", "#f87171", "#fb923c", "#34d399"].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                  style={{ background: color, borderColor: "var(--background)", color: "#fff" }}
                >
                  {["A", "M", "L", "R", "C"][i]}
                </div>
              ))}
            </div>
            <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
              <span className="font-semibold" style={{ color: "var(--foreground)" }}>+340 pessoas</span> já na lista
            </p>
          </div>
        </div>

        {/* App mockup column */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <AppMockup />
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
        style={{ color: "var(--foreground-muted)" }}
      >
        <span className="text-xs">scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 3v10M4 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <style>{`
        .hero-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  )
}

function AppMockup() {
  return (
    <div className="relative select-none" style={{ width: 280 }}>
      {/* Phone frame */}
      <div
        className="relative rounded-[36px] overflow-hidden"
        style={{
          background: "#1e293b",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(34,197,94,0.08)",
          padding: "12px",
        }}
      >
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full z-10" style={{ background: "#0f172a" }} />

        {/* Screen */}
        <div className="rounded-[28px] overflow-hidden" style={{ background: "#0f172a", height: 560 }}>
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-8 pb-2">
            <span className="text-xs font-medium" style={{ color: "#94a3b8" }}>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2.5 rounded-sm border" style={{ borderColor: "#94a3b8" }}>
                <div className="w-3/4 h-full rounded-sm" style={{ background: "#22c55e" }} />
              </div>
            </div>
          </div>

          {/* App content */}
          <div className="px-5 pt-2">
            {/* Greeting */}
            <p className="text-xs mb-0.5" style={{ color: "#94a3b8" }}>Bom dia, Ana</p>
            <h3 className="text-base font-bold mb-4" style={{ color: "#f1f5f9" }}>Como você está?</h3>

            {/* Risk card */}
            <div
              className="rounded-2xl p-4 mb-3"
              style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold" style={{ color: "#22c55e" }}>Risco de crise</span>
                <span className="text-lg font-extrabold" style={{ color: "#22c55e" }}>Baixo</span>
              </div>
              <div className="w-full h-2 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="h-2 rounded-full" style={{ width: "28%", background: "#22c55e" }} />
              </div>
              <p className="text-xs mt-2" style={{ color: "#94a3b8" }}>Score: 2.8 / 10 — ótimo dia</p>
            </div>

            {/* Metrics row */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { label: "Sono", value: "7h 20m", icon: "🌙", color: "#818cf8" },
                { label: "HRV", value: "62ms", icon: "💓", color: "#f472b6" },
                { label: "Estresse", value: "32%", icon: "⚡", color: "#facc15" },
              ].map((m) => (
                <div key={m.label} className="rounded-xl p-2.5 flex flex-col gap-1" style={{ background: "#1e293b" }}>
                  <span className="text-sm">{m.icon}</span>
                  <span className="text-xs font-bold" style={{ color: "#f1f5f9" }}>{m.value}</span>
                  <span className="text-[10px]" style={{ color: "#94a3b8" }}>{m.label}</span>
                </div>
              ))}
            </div>

            {/* Quick relief button */}
            <button
              className="w-full py-3 rounded-2xl text-sm font-bold"
              style={{ background: "var(--primary)", color: "#0f172a" }}
            >
              Iniciar alívio agora
            </button>

            {/* Chart preview */}
            <div className="mt-3 rounded-2xl p-3" style={{ background: "#1e293b" }}>
              <p className="text-xs font-semibold mb-2" style={{ color: "#f1f5f9" }}>Dor esta semana</p>
              <div className="flex items-end gap-1 h-10">
                {[3, 6, 4, 7, 2, 5, 3].map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t"
                    style={{
                      height: `${v * 10}%`,
                      background: v >= 6
                        ? "rgba(239,68,68,0.6)"
                        : v >= 4
                        ? "rgba(250,204,21,0.6)"
                        : "rgba(34,197,94,0.6)",
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {["S", "T", "Q", "Q", "S", "S", "D"].map((d, i) => (
                  <span key={`${d}-${i}`} className="text-[9px]" style={{ color: "#475569" }}>{d}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating notification card */}
      <div
        className="absolute -right-8 top-24 rounded-2xl px-4 py-3 w-44"
        style={{
          background: "rgba(30,41,59,0.95)",
          border: "1px solid rgba(34,197,94,0.2)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs" style={{ background: "rgba(34,197,94,0.15)" }}>
            <span style={{ color: "#22c55e" }}>!</span>
          </div>
          <span className="text-[11px] font-semibold" style={{ color: "#22c55e" }}>Alerta preventivo</span>
        </div>
        <p className="text-[10px]" style={{ color: "#94a3b8" }}>Padrão de estresse detectado. Faça uma pausa agora.</p>
      </div>

      {/* Floating stats card */}
      <div
        className="absolute -left-8 bottom-32 rounded-2xl px-4 py-3 w-40"
        style={{
          background: "rgba(30,41,59,0.95)",
          border: "1px solid rgba(45,63,85,0.6)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <p className="text-[10px] mb-1" style={{ color: "#94a3b8" }}>Crises evitadas</p>
        <p className="text-xl font-extrabold" style={{ color: "#22c55e" }}>-68%</p>
        <p className="text-[10px]" style={{ color: "#94a3b8" }}>últimos 30 dias</p>
      </div>
    </div>
  )
}
