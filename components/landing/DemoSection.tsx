"use client"

import { useState } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const SCREENS = [
  {
    id: "dashboard",
    label: "Dashboard",
    content: (
      <div className="px-5 pt-4 flex flex-col gap-3">
        <div>
          <p className="text-xs mb-0.5" style={{ color: "#94a3b8" }}>Bom dia, Ana</p>
          <h3 className="text-sm font-bold" style={{ color: "#f1f5f9" }}>Monitoramento ativo</h3>
        </div>
        <div className="rounded-2xl p-3" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
          <div className="flex justify-between mb-2">
            <span className="text-xs font-semibold" style={{ color: "#22c55e" }}>Risco hoje</span>
            <span className="text-sm font-extrabold" style={{ color: "#22c55e" }}>Baixo</span>
          </div>
          <div className="w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div className="h-1.5 rounded-full" style={{ width: "28%", background: "#22c55e" }} />
          </div>
          <p className="text-[10px] mt-1" style={{ color: "#94a3b8" }}>Score 2.8 — ótimo dia!</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { l: "Sono", v: "7h", c: "#818cf8" },
            { l: "HRV", v: "62ms", c: "#f472b6" },
            { l: "Stress", v: "32%", c: "#facc15" },
          ].map((m) => (
            <div key={m.l} className="rounded-xl p-2 text-center" style={{ background: "#1e293b" }}>
              <p className="text-xs font-bold" style={{ color: m.c }}>{m.v}</p>
              <p className="text-[9px]" style={{ color: "#94a3b8" }}>{m.l}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-3" style={{ background: "#1e293b" }}>
          <p className="text-[10px] font-semibold mb-2" style={{ color: "#f1f5f9" }}>Semana</p>
          <div className="flex items-end gap-1 h-8">
            {[3, 6, 4, 7, 2, 5, 3].map((v, i) => (
              <div key={i} className="flex-1 rounded-t" style={{ height: `${v * 14}%`, background: v >= 6 ? "rgba(239,68,68,0.7)" : v >= 4 ? "rgba(250,204,21,0.7)" : "rgba(34,197,94,0.7)" }} />
            ))}
          </div>
        </div>
        <button className="w-full py-2.5 rounded-2xl text-xs font-bold" style={{ background: "#22c55e", color: "#0f172a" }}>
          Alívio imediato
        </button>
      </div>
    ),
  },
  {
    id: "alert",
    label: "Alerta",
    content: (
      <div className="px-5 pt-4 flex flex-col gap-3">
        <div className="rounded-2xl p-3" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)" }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "rgba(239,68,68,0.2)" }}>
              <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5" stroke="#ef4444" strokeWidth="1.5"><path d="M6 2v4M6 8.5h.01" strokeLinecap="round"/></svg>
            </div>
            <span className="text-xs font-bold" style={{ color: "#ef4444" }}>Alerta preventivo</span>
          </div>
          <p className="text-[11px] leading-snug" style={{ color: "#94a3b8" }}>Alta probabilidade de crise amanhã entre 12h–16h.</p>
          <div className="mt-2 w-full h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div className="h-1.5 rounded-full" style={{ width: "81%", background: "#ef4444" }} />
          </div>
          <p className="text-[10px] mt-1" style={{ color: "#ef4444" }}>Score 8.1 / 10</p>
        </div>
        <p className="text-xs font-semibold" style={{ color: "#f1f5f9" }}>Fatores identificados</p>
        {["Sono fragmentado (4h23m)", "HRV abaixo de 40ms", "Frente fria prevista"].map((t) => (
          <div key={t} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "#1e293b" }}>
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#ef4444" }} />
            <span className="text-[11px]" style={{ color: "#94a3b8" }}>{t}</span>
          </div>
        ))}
        <button className="w-full py-2.5 rounded-2xl text-xs font-bold" style={{ background: "#22c55e", color: "#0f172a" }}>
          Iniciar protocolo preventivo
        </button>
        <button className="w-full py-2 rounded-2xl text-xs" style={{ color: "#94a3b8", border: "1px solid #2d3f55" }}>
          Avisar minha rede de apoio
        </button>
      </div>
    ),
  },
  {
    id: "relief",
    label: "Alívio",
    content: (
      <div className="px-5 pt-4 flex flex-col items-center gap-4">
        <div>
          <p className="text-xs text-center" style={{ color: "#94a3b8" }}>Sessão de alívio</p>
          <h3 className="text-sm font-bold text-center" style={{ color: "#f1f5f9" }}>Respiração 4-7-8</h3>
        </div>
        <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
          <div className="absolute rounded-full animate-breathe-ring" style={{ inset: 0, background: "rgba(34,197,94,0.06)" }} />
          <div className="absolute rounded-full" style={{ inset: 10, background: "rgba(34,197,94,0.08)" }} />
          <div className="w-20 h-20 rounded-full flex items-center justify-center animate-breathe" style={{ background: "rgba(34,197,94,0.15)", border: "1.5px solid rgba(34,197,94,0.4)" }}>
            <span className="text-xs font-semibold" style={{ color: "#22c55e" }}>Inspire</span>
          </div>
        </div>
        <p className="text-2xl font-extrabold" style={{ color: "#22c55e" }}>04</p>
        <div className="w-full flex flex-col gap-1.5">
          {[
            { label: "Inspire", secs: 4, active: true },
            { label: "Segure", secs: 7, active: false },
            { label: "Expire", secs: 8, active: false },
          ].map((ph) => (
            <div key={ph.label} className="flex items-center justify-between px-3 py-2 rounded-xl"
              style={{ background: ph.active ? "rgba(34,197,94,0.1)" : "#1e293b", border: ph.active ? "1px solid rgba(34,197,94,0.2)" : "1px solid transparent" }}>
              <span className="text-[11px] font-medium" style={{ color: ph.active ? "#22c55e" : "#94a3b8" }}>{ph.label}</span>
              <span className="text-[11px]" style={{ color: ph.active ? "#22c55e" : "#475569" }}>{ph.secs}s</span>
            </div>
          ))}
        </div>
        <button className="w-full py-2.5 rounded-2xl text-xs font-bold" style={{ background: "#22c55e", color: "#0f172a" }}>
          Pausar
        </button>
      </div>
    ),
  },
  {
    id: "data",
    label: "Dados",
    content: (
      <div className="px-5 pt-4 flex flex-col gap-3">
        <p className="text-sm font-bold" style={{ color: "#f1f5f9" }}>Seus dados</p>
        <div className="rounded-2xl p-3" style={{ background: "#1e293b" }}>
          <p className="text-[10px] font-semibold mb-2" style={{ color: "#94a3b8" }}>Intensidade da dor — 7 dias</p>
          <div className="flex items-end gap-1 h-12">
            {[3, 6, 4, 8, 2, 5, 3].map((v, i) => (
              <div key={i} className="flex-1 rounded-t" style={{ height: `${v * 12}%`, background: v >= 6 ? "rgba(239,68,68,0.7)" : v >= 4 ? "rgba(250,204,21,0.7)" : "rgba(34,197,94,0.7)" }} />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {["S", "T", "Q", "Q", "S", "S", "D"].map((d, i) => (
              <span key={i} className="text-[9px]" style={{ color: "#475569" }}>{d}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { l: "Média dor", v: "4.2", sub: "esta semana", c: "#facc15" },
            { l: "Crises evitadas", v: "3", sub: "este mês", c: "#22c55e" },
            { l: "Melhor dia", v: "Sábado", sub: "padrão", c: "#818cf8" },
            { l: "HRV médio", v: "58ms", sub: "últimos 7d", c: "#f472b6" },
          ].map((m) => (
            <div key={m.l} className="rounded-xl p-3" style={{ background: "#1e293b" }}>
              <p className="text-xs font-bold" style={{ color: m.c }}>{m.v}</p>
              <p className="text-[10px] font-semibold" style={{ color: "#f1f5f9" }}>{m.l}</p>
              <p className="text-[9px]" style={{ color: "#94a3b8" }}>{m.sub}</p>
            </div>
          ))}
        </div>
        <button className="w-full py-2.5 rounded-2xl text-xs font-bold" style={{ color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.06)" }}>
          Exportar para o médico
        </button>
      </div>
    ),
  },
]

export function DemoSection() {
  const [active, setActive] = useState(0)
  const ref = useScrollReveal()

  return (
    <section id="demo" className="py-28" style={{ background: "var(--surface)" }}>
      <div ref={ref} className="scroll-reveal max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--primary)" }}>
            Demonstração
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-balance" style={{ color: "var(--foreground)" }}>
            Explore o app
          </h2>
          <p className="mt-4 text-base leading-relaxed max-w-xl mx-auto" style={{ color: "var(--foreground-muted)" }}>
            Navegue pelas telas principais e veja como é simples ter controle sobre sua saúde.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 justify-center">
          {/* Tab navigation */}
          <div className="flex lg:flex-col gap-3 order-2 lg:order-1">
            {SCREENS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className="flex items-center gap-3 px-5 py-3.5 rounded-2xl text-left transition-all duration-200"
                style={{
                  background: i === active ? "rgba(34,197,94,0.1)" : "var(--background)",
                  border: i === active ? "1px solid rgba(34,197,94,0.25)" : "1px solid var(--border)",
                  color: i === active ? "var(--primary)" : "var(--foreground-muted)",
                  minWidth: 140,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 transition-all"
                  style={{ background: i === active ? "var(--primary)" : "var(--border)" }}
                />
                <span className="text-sm font-semibold">{s.label}</span>
              </button>
            ))}
          </div>

          {/* Phone mockup */}
          <div
            className="relative order-1 lg:order-2 rounded-[36px] overflow-hidden"
            style={{
              width: 260,
              background: "#1e293b",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(34,197,94,0.06)",
              padding: "10px",
              flexShrink: 0,
            }}
          >
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full z-10" style={{ background: "#0f172a" }} />
            <div className="rounded-[28px] overflow-hidden" style={{ background: "#0f172a", height: 520 }}>
              {/* Status bar */}
              <div className="flex items-center justify-between px-5 pt-7 pb-1">
                <span className="text-[10px] font-medium" style={{ color: "#94a3b8" }}>9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-3.5 h-2 rounded-sm border" style={{ borderColor: "#94a3b8" }}>
                    <div className="h-full rounded-sm" style={{ width: "80%", background: "#22c55e" }} />
                  </div>
                </div>
              </div>
              {/* Screen content with transition */}
              <div
                key={active}
                style={{
                  animation: "fade-in 0.3s ease both",
                }}
              >
                {SCREENS[active].content}
              </div>
            </div>
          </div>

          {/* Description panel */}
          <div className="order-3 max-w-xs">
            <div
              className="p-6 rounded-2xl"
              style={{ background: "var(--background)", border: "1px solid var(--border)" }}
            >
              <span
                className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                style={{ background: "rgba(34,197,94,0.1)", color: "var(--primary)" }}
              >
                {SCREENS[active].label}
              </span>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                {[
                  "Acompanhe seu score de risco diário, métricas do corpo e histórico de dor em um só lugar. Claro, limpo e direto.",
                  "Receba alertas com horas de antecedência, entenda os fatores que contribuem e inicie um protocolo preventivo antes que a crise chegue.",
                  "Com um toque, inicie sessões de respiração, relaxamento muscular progressivo e meditação guiada — calibradas para dor crônica.",
                  "Veja tendências, identifique padrões e exporte um relatório completo para compartilhar com seu médico ou fisioterapeuta.",
                ][active]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
