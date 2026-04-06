"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function BenefitsSection() {
  const ref = useScrollReveal()

  const testimonials = [
    {
      quote: "Finalmente consigo planejar minha semana sem medo de uma crise aparecer do nada.",
      name: "Carla M.",
      role: "Usuária beta, São Paulo",
      avatar: "#4f8ef7",
      initial: "C",
    },
    {
      quote: "O relatório que exportei para minha reumatologista mudou completamente a consulta. Ela entendeu meus padrões.",
      name: "Renata S.",
      role: "Usuária beta, Belo Horizonte",
      avatar: "#9c6fde",
      initial: "R",
    },
    {
      quote: "Nos dias de alerta alto, abro o app e já tenho tudo para me cuidar. Menos ansiedade, mais controle.",
      name: "Patricia L.",
      role: "Usuária beta, Rio de Janeiro",
      avatar: "#f87171",
      initial: "P",
    },
  ]

  const outcomes = [
    { value: "68%", label: "redução de crises reportadas pelos usuários beta" },
    { value: "3x", label: "mais controle percebido sobre a condição" },
    { value: "4.9★", label: "satisfação média no teste com usuários" },
  ]

  return (
    <section id="beneficios" className="py-28" style={{ background: "var(--background)" }}>
      <div ref={ref} className="scroll-reveal max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--primary)" }}>
            Benefícios
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-balance" style={{ color: "var(--foreground)" }}>
            O que muda na sua vida
          </h2>
        </div>

        {/* Outcomes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          {outcomes.map((o) => (
            <div
              key={o.value}
              className="text-center p-8 rounded-2xl"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <p className="text-4xl font-extrabold mb-2" style={{ color: "var(--primary)" }}>{o.value}</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>{o.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-4 p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 16 16" className="w-4 h-4" fill="#facc15">
                    <path d="M8 1l1.85 3.75 4.15.6-3 2.93.71 4.13L8 10.35l-3.71 1.96.71-4.13-3-2.93 4.15-.6z" />
                  </svg>
                ))}
              </div>

              <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--foreground)" }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid var(--border)" }}>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: t.avatar, color: "#fff" }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
