"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function ProblemSection() {
  const ref = useScrollReveal()

  const stats = [
    { value: "10M+", label: "brasileiros com fibromialgia" },
    { value: "3–5", label: "anos para diagnóstico médio" },
    { value: "72%", label: "relatam dor imprevisível" },
  ]

  const painPoints = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
          <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Dor imprevisível",
      description: "As crises surgem sem aviso, destruindo planos, compromissos e a confiança no próprio corpo.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Tratamentos isolados",
      description: "Médicos, fisioterapeutas e psicólogos trabalham separados, sem uma visão unificada da sua saúde.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
          <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Ansiedade antecipatória",
      description: "O medo constante de uma crise limita atividades e deteriora a qualidade de vida mesmo nos dias bons.",
    },
  ]

  return (
    <section
      id="problema"
      className="py-28"
      style={{ background: "var(--surface)" }}
    >
      <div ref={ref} className="scroll-reveal max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--primary)" }}>
            O problema
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-balance" style={{ color: "var(--foreground)" }}>
            Viver com fibromialgia é lutar contra o invisível
          </h2>
          <p className="mt-4 text-base leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--foreground-muted)" }}>
            A dor crônica não é linear. Ela aparece e desaparece sem padrão aparente — mas na verdade{" "}
            <strong style={{ color: "var(--foreground)" }}>há sinais. Eles só precisam ser lidos corretamente.</strong>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {stats.map((s) => (
            <div
              key={s.value}
              className="flex flex-col items-center text-center p-8 rounded-2xl"
              style={{ background: "var(--surface-elevated)", border: "1px solid var(--border)" }}
            >
              <span className="text-4xl font-extrabold mb-2" style={{ color: "var(--primary)" }}>{s.value}</span>
              <span className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Pain points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((p) => (
            <div
              key={p.title}
              className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "var(--background)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}
              >
                {p.icon}
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: "var(--foreground)" }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
