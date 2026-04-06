"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function SolutionSection() {
  const ref = useScrollReveal()

  const dataPoints = [
    { icon: "💤", label: "Qualidade do sono", desc: "Horas dormidas, latência, despertares noturnos" },
    { icon: "💓", label: "Variabilidade cardíaca", desc: "HRV como indicador de estresse do sistema nervoso" },
    { icon: "🌡️", label: "Temperatura corporal", desc: "Padrões inflamatórios ao longo do dia" },
    { icon: "⚡", label: "Nível de estresse", desc: "Dados de wearables e autorrelatos" },
    { icon: "🌤️", label: "Fatores ambientais", desc: "Pressão atmosférica, umidade e temperatura" },
    { icon: "🧘", label: "Humor e ansiedade", desc: "Autoavaliação diária de estado emocional" },
  ]

  return (
    <section id="solucao" className="py-28" style={{ background: "var(--background)" }}>
      <div ref={ref} className="scroll-reveal max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--primary)" }}>
              A solução
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-balance mb-6" style={{ color: "var(--foreground)" }}>
              Seu corpo avisa antes. Agora você vai ouvir.
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--foreground-muted)" }}>
              O Fibrosync cruza múltiplas fontes de dados — wearables, clima, humor — para
              construir um perfil único do seu padrão de dor. O modelo de IA aprende com você
              e fica mais preciso a cada semana.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { step: "01", text: "Conecte uma vez e esqueça — dados coletados automaticamente" },
                { step: "02", text: "IA treina no seu padrão individual, não em médias populacionais" },
                { step: "03", text: "Alertas 6 a 24 horas antes — tempo real para agir preventivamente" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ background: "rgba(34,197,94,0.1)", color: "var(--primary)" }}
                  >
                    {item.step}
                  </span>
                  <p className="text-sm leading-relaxed pt-1" style={{ color: "var(--foreground-muted)" }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Data sources grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {dataPoints.map((d) => (
              <div
                key={d.label}
                className="p-4 rounded-2xl flex flex-col gap-2 transition-all duration-300 hover:scale-[1.03]"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <span className="text-xl">{d.icon}</span>
                <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>{d.label}</p>
                <p className="text-[11px] leading-snug" style={{ color: "var(--foreground-muted)" }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
