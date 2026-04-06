"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function FeaturesSection() {
  const ref = useScrollReveal()

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Previsão de risco com IA",
      description: "Algoritmo treinado no seu histórico individual — não em médias. Quanto mais você usa, mais preciso fica.",
      tag: "IA proprietária",
      color: "#22c55e",
      size: "large",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Botão de alívio imediato",
      description: "Acesse técnicas de relaxamento, respiração e mindfulness com um toque — exatamente quando você mais precisa.",
      tag: "Acesso rápido",
      color: "#f472b6",
      size: "small",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Relatório para o médico",
      description: "Exporte um PDF com seu histórico de dor, padrões e triggers — em um formato que o seu médico realmente lê.",
      tag: "Compartilhável",
      color: "#818cf8",
      size: "small",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
          <path d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Interface de baixo esforço",
      description: "Projetada para dias de crise. Fontes grandes, botões amplos, sem excesso de informação.",
      tag: "Acessibilidade",
      color: "#facc15",
      size: "small",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Rede de apoio",
      description: "Compartilhe alertas e seu estado em tempo real com familiares e cuidadores de confiança.",
      tag: "Comunidade",
      color: "#34d399",
      size: "small",
    },
  ]

  return (
    <section id="diferenciais" className="py-28" style={{ background: "var(--background)" }}>
      <div ref={ref} className="scroll-reveal max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--primary)" }}>
            Diferenciais
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-balance" style={{ color: "var(--foreground)" }}>
            Feito para quem sente na pele
          </h2>
          <p className="mt-4 text-base leading-relaxed max-w-xl mx-auto" style={{ color: "var(--foreground-muted)" }}>
            Cada detalhe foi co-desenhado com pessoas que vivem com fibromialgia.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          {/* Large card */}
          <div
            className="sm:col-span-2 lg:col-span-1 lg:row-span-2 p-8 rounded-2xl flex flex-col gap-6 transition-all duration-300 hover:scale-[1.01]"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: `rgba(34,197,94,0.12)`, color: "#22c55e" }}
            >
              {features[0].icon}
            </div>
            <div>
              <span
                className="text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                style={{ background: "rgba(34,197,94,0.1)", color: "#22c55e" }}
              >
                {features[0].tag}
              </span>
              <h3 className="mt-3 text-xl font-bold" style={{ color: "var(--foreground)" }}>{features[0].title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                {features[0].description}
              </p>
            </div>

            {/* Mini chart */}
            <div className="mt-auto rounded-xl p-4" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border)" }}>
              <p className="text-xs font-semibold mb-3" style={{ color: "var(--foreground-muted)" }}>Previsão próximos 7 dias</p>
              <div className="flex items-end gap-1.5 h-14">
                {[2, 3, 7, 8, 5, 2, 3].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t transition-all"
                      style={{
                        height: `${v * 10}%`,
                        background: v >= 7 ? "rgba(239,68,68,0.7)" : v >= 5 ? "rgba(250,204,21,0.7)" : "rgba(34,197,94,0.7)",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((d) => (
                  <span key={d} className="text-[9px]" style={{ color: "#475569" }}>{d}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Small cards */}
          {features.slice(1).map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02]"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${f.color}18`, color: f.color }}
              >
                {f.icon}
              </div>
              <div>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: `${f.color}18`, color: f.color }}
                >
                  {f.tag}
                </span>
                <h3 className="mt-2 text-sm font-bold" style={{ color: "var(--foreground)" }}>{f.title}</h3>
                <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
