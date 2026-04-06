"use client"

import { ArrowLeft, Moon, Activity, Zap, Heart, TrendingDown, TrendingUp, Minus } from "lucide-react"

interface Props {
  onBack: () => void
  onRegisterPain: () => void
}

const weekData = [3, 5, 4, 6, 5, 5, 4]
const days = ["S", "T", "Q", "Q", "S", "S", "D"]

export function DataScreen({ onBack, onRegisterPain }: Props) {
  const maxVal = Math.max(...weekData)

  return (
    <div
      className="flex flex-col h-full w-full overflow-y-auto"
      style={{ background: "#0f172a" }}
    >
      {/* Glow */}
      <div
        className="absolute top-0 left-0 right-0 h-52 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(129,140,248,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <div className="px-6 pt-14 pb-5 flex items-center gap-4 animate-fade-up">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all active:scale-90"
          style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <ArrowLeft size={18} style={{ color: "#94a3b8" }} />
        </button>
        <div>
          <h2 className="text-lg font-bold" style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}>Meus dados</h2>
          <p className="text-xs" style={{ color: "#64748b" }}>Hoje, 30 de março</p>
        </div>
      </div>

      {/* Cards de métricas */}
      <div className="px-6 mb-5 grid grid-cols-2 gap-3 animate-fade-up" style={{ animationDelay: "0.08s" }}>
        <BigMetricCard
          icon={<Moon size={20} />}
          label="Sono"
          value="5h"
          detail="Meta: 7–8h"
          trend="down"
          color="#818cf8"
        />
        <BigMetricCard
          icon={<Activity size={20} />}
          label="HRV"
          value="28ms"
          detail="Abaixo do normal"
          trend="down"
          color="#facc15"
        />
        <BigMetricCard
          icon={<Zap size={20} />}
          label="Estresse"
          value="Alto"
          detail="Nível 7/10"
          trend="up"
          color="#ef4444"
        />
        <BigMetricCard
          icon={<span className="text-xl">😐</span>}
          label="Humor"
          value="Neutro"
          detail="Melhorou ontem"
          trend="neutral"
          color="#94a3b8"
        />
      </div>

      {/* Gráfico de dor semanal */}
      <div className="px-6 mb-5 animate-fade-up" style={{ animationDelay: "0.14s" }}>
        <div
          className="rounded-3xl p-5"
          style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#475569" }}>
                Dor semanal
              </p>
              <p className="text-sm font-bold mt-0.5" style={{ color: "#f1f5f9" }}>Índice de 0 a 10</p>
            </div>
            <div
              className="px-3 py-1.5 rounded-xl text-xs font-semibold"
              style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444" }}
            >
              Média 4.6
            </div>
          </div>

          {/* Barras */}
          <div className="flex items-end justify-between gap-2" style={{ height: 80 }}>
            {weekData.map((val, i) => {
              const isToday = i === weekData.length - 1
              const heightPct = (val / maxVal) * 100
              return (
                <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                  <div
                    className="w-full rounded-t-xl rounded-b-sm transition-all duration-500"
                    style={{
                      height: `${heightPct}%`,
                      background: isToday
                        ? "linear-gradient(180deg, #ef4444 0%, #dc2626 100%)"
                        : "rgba(239,68,68,0.25)",
                      minHeight: 6,
                      boxShadow: isToday ? "0 0 12px rgba(239,68,68,0.3)" : "none",
                    }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: isToday ? "#f1f5f9" : "#475569" }}
                  >
                    {days[i]}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Dor atual */}
      <div className="px-6 mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <div
          className="rounded-3xl p-5 flex items-center justify-between"
          style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(239,68,68,0.12)" }}
            >
              <Heart size={18} style={{ color: "#ef4444" }} />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>Dor agora</p>
              <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>Última: 4/10 há 2h</p>
            </div>
          </div>
          <button
            onClick={onRegisterPain}
            className="px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              color: "#0f172a",
            }}
          >
            Registrar
          </button>
        </div>
      </div>
    </div>
  )
}

function BigMetricCard({
  icon,
  label,
  value,
  detail,
  trend,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  detail: string
  trend: "up" | "down" | "neutral"
  color: string
}) {
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus

  return (
    <div
      className="rounded-3xl p-4 flex flex-col gap-3"
      style={{
        background: "#1e293b",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${color}1a`, color }}
        >
          {icon}
        </div>
        <TrendIcon
          size={14}
          style={{
            color:
              trend === "up" ? "#ef4444" : trend === "down" ? "#facc15" : "#94a3b8",
          }}
        />
      </div>
      <div>
        <p className="text-xs" style={{ color: "#64748b" }}>{label}</p>
        <p className="text-xl font-bold mt-0.5" style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}>
          {value}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "#475569" }}>{detail}</p>
      </div>
    </div>
  )
}
