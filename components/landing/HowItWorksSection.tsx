"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function HowItWorksSection() {
  const ref = useScrollReveal()

  const steps = [
    {
      number: "01",
      title: "Conecte seus dados",
      description:
        "Vincule seu smartwatch, app de sono ou responda ao check-in diário de 30 segundos. O Fibrosync funciona mesmo sem wearable.",
      color: "#22c55e",
      visual: (
        <div className="flex flex-col gap-2">
          {["Apple Watch", "Fitbit", "Garmin", "Oura Ring"].map((d, i) => (
            <div
              key={d}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: i === 0 ? "#22c55e" : "#2d3f55" }} />
              <span className="text-xs font-medium" style={{ color: i === 0 ? "#f1f5f9" : "#94a3b8" }}>{d}</span>
              {i === 0 && (
                <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}>
                  Conectado
                </span>
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      number: "02",
      title: "Receba previsões",
      description:
        "Nosso modelo de IA analisa seus padrões e emite alertas preventivos com antecedência de até 24 horas antes de uma crise.",
      color: "#facc15",
      visual: (
        <div>
          <div
            className="rounded-2xl p-4 mb-3"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold" style={{ color: "#ef4444" }}>Risco elevado detectado</span>
              <span className="text-xs font-bold" style={{ color: "#ef4444" }}>8.1 / 10</span>
            </div>
            <div className="w-full h-2 rounded-full mb-2" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div className="h-2 rounded-full" style={{ width: "81%", background: "#ef4444" }} />
            </div>
            <p className="text-[11px]" style={{ color: "#94a3b8" }}>Amanhã às 14h — alta probabilidade de crise</p>
          </div>
          <div className="flex gap-2 text-xs" style={{ color: "#94a3b8" }}>
            <span className="px-2 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>Sono ruim</span>
            <span className="px-2 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>HRV baixo</span>
            <span className="px-2 py-1 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>Frente fria</span>
          </div>
        </div>
      ),
    },
    {
      number: "03",
      title: "Aja antes da crise",
      description:
        "O botão de alívio imediato guia você por exercícios de respiração, relaxamento muscular e outras técnicas baseadas em evidências.",
      color: "#818cf8",
      visual: (
        <div className="flex flex-col gap-2">
          {[
            { label: "Respiração 4-7-8", time: "4 min", active: true },
            { label: "Relaxamento muscular", time: "8 min", active: false },
            { label: "Meditação guiada", time: "10 min", active: false },
            { label: "Compressas alternadas", time: "15 min", active: false },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
              style={{
                background: item.active ? "rgba(129,140,248,0.1)" : "rgba(255,255,255,0.03)",
                border: item.active ? "1px solid rgba(129,140,248,0.3)" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: item.active ? "#818cf8" : "#2d3f55" }}
              />
              <span className="text-xs font-medium flex-1" style={{ color: item.active ? "#f1f5f9" : "#94a3b8" }}>
                {item.label}
              </span>
              <span className="text-[10px]" style={{ color: "#94a3b8" }}>{item.time}</span>
            </div>
          ))}
        </div>
      ),
    },
  ]

  return (
    <section id="como-funciona" className="py-28" style={{ background: "var(--surface)" }}>
      <div ref={ref} className="scroll-reveal max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--primary)" }}>
            Como funciona
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-balance" style={{ color: "var(--foreground)" }}>
            Simples. Poderoso. Feito pra você.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div
            className="hidden md:block absolute top-8 left-1/3 right-1/3 h-px"
            style={{ background: "linear-gradient(90deg, transparent, var(--border), transparent)" }}
          />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex flex-col gap-6 p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{ background: "var(--background)", border: "1px solid var(--border)" }}
            >
              {/* Step number */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold"
                  style={{ background: `${step.color}18`, color: step.color }}
                >
                  {step.number}
                </div>
                <h3 className="text-base font-bold" style={{ color: "var(--foreground)" }}>{step.title}</h3>
              </div>

              {/* Visual preview */}
              <div className="rounded-xl p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                {step.visual}
              </div>

              <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
