"use client"

import { Activity, Bell, ChevronRight, Moon, Zap, Heart } from "lucide-react"

type StatusType = "good" | "warn" | "danger"

const statusConfig = {
  good: {
    label: "Você está bem hoje",
    sublabel: "Seu corpo está em equilíbrio",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.25)",
    glow: "rgba(34,197,94,0.20)",
    icon: "✓",
    insight: "Seus padrões de sono e estresse estão estáveis. Continue assim!",
    score: 82,
  },
  warn: {
    label: "Atenção ao seu corpo",
    sublabel: "Sinais de alerta detectados",
    color: "#facc15",
    bg: "rgba(250,204,21,0.12)",
    border: "rgba(250,204,21,0.25)",
    glow: "rgba(250,204,21,0.15)",
    icon: "!",
    insight: "Seu sono foi abaixo do normal e o estresse aumentou. Cuide-se.",
    score: 54,
  },
  danger: {
    label: "Risco de crise",
    sublabel: "Intervenção recomendada",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.25)",
    glow: "rgba(239,68,68,0.15)",
    icon: "↑",
    insight: "Padrões indicam alta probabilidade de crise nas próximas horas.",
    score: 23,
  },
}

interface Props {
  status?: StatusType
  onRelief: () => void
  onData: () => void
  onShare: () => void
}

export function DashboardScreen({ status = "warn", onRelief, onData, onShare }: Props) {
  const cfg = statusConfig[status]
  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite"

  return (
    <div
      className="flex flex-col h-full w-full overflow-y-auto"
      style={{ background: "#0f172a" }}
    >
      {/* Glow de status no topo */}
      <div
        className="absolute top-0 left-0 right-0 h-64 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${cfg.glow} 0%, transparent 70%)`,
        }}
      />

      {/* Header */}
      <div className="px-6 pt-14 pb-4 flex items-center justify-between animate-fade-up">
        <div>
          <p className="text-sm font-medium" style={{ color: "#64748b" }}>{greeting},</p>
          <h2 className="text-xl font-bold" style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}>Ana Costa</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="w-10 h-10 rounded-2xl flex items-center justify-center relative"
            style={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <Bell size={18} style={{ color: "#94a3b8" }} />
            <div
              className="absolute top-2 right-2 w-2 h-2 rounded-full"
              style={{ background: cfg.color }}
            />
          </button>
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)", color: "#0f172a" }}
          >
            AC
          </div>
        </div>
      </div>

      {/* Status Card */}
      <div className="px-6 mt-2 animate-fade-up" style={{ animationDelay: "0.08s" }}>
        <div
          className="rounded-3xl p-6 transition-all duration-500"
          style={{
            background: cfg.bg,
            border: `1px solid ${cfg.border}`,
            boxShadow: `0 8px 32px ${cfg.glow}`,
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: cfg.color, opacity: 0.8 }}>
                Status de hoje
              </span>
              <h3 className="text-xl font-bold text-balance" style={{ color: cfg.color }}>
                {cfg.label}
              </h3>
              <p className="text-xs" style={{ color: cfg.color, opacity: 0.7 }}>{cfg.sublabel}</p>
            </div>
            {/* Score ring */}
            <div className="relative flex items-center justify-center" style={{ width: 60, height: 60 }}>
              <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
                <circle
                  cx="30" cy="30" r="24"
                  fill="none"
                  stroke={cfg.color}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={`${(cfg.score / 100) * 150.8} 150.8`}
                />
              </svg>
              <span className="absolute text-base font-bold" style={{ color: cfg.color }}>{cfg.score}</span>
            </div>
          </div>

          {/* Insight */}
          <div
            className="rounded-2xl px-4 py-3"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "rgba(241,245,249,0.85)" }}>
              {cfg.insight}
            </p>
          </div>
        </div>
      </div>

      {/* Métricas rápidas */}
      <div className="px-6 mt-4 animate-fade-up" style={{ animationDelay: "0.16s" }}>
        <div className="grid grid-cols-3 gap-3">
          <MetricCard icon={<Moon size={16} />} label="Sono" value="5h" color="#818cf8" />
          <MetricCard icon={<Activity size={16} />} label="HRV" value="Baixo" color="#facc15" />
          <MetricCard icon={<Zap size={16} />} label="Estresse" value="Alto" color="#ef4444" />
        </div>
      </div>

      {/* Botão principal */}
      <div className="px-6 mt-5 animate-fade-up" style={{ animationDelay: "0.22s" }}>
        <button
          onClick={onRelief}
          className="w-full py-5 rounded-3xl font-bold text-base transition-all duration-200 active:scale-95 flex items-center justify-center gap-3"
          style={{
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            color: "#0f172a",
            boxShadow: "0 6px 28px rgba(34,197,94,0.35), 0 2px 8px rgba(0,0,0,0.3)",
            fontSize: 16,
          }}
        >
          <Heart size={20} />
          Aliviar agora
        </button>
      </div>

      {/* Atalhos */}
      <div className="px-6 mt-4 pb-8 flex flex-col gap-3 animate-fade-up" style={{ animationDelay: "0.28s" }}>
        <ShortcutRow
          icon={<Activity size={18} />}
          label="Ver meus dados"
          sub="Sono, HRV, humor e dor"
          onClick={onData}
          color="#818cf8"
        />
        <ShortcutRow
          icon={<Heart size={18} />}
          label="Compartilhar status"
          sub="Informe seus familiares"
          onClick={onShare}
          color="#22c55e"
        />
      </div>
    </div>
  )
}

function MetricCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string
  color: string
}) {
  return (
    <div
      className="rounded-2xl p-3 flex flex-col gap-2"
      style={{
        background: "#1e293b",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center"
        style={{ background: `${color}1a`, color }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs" style={{ color: "#64748b" }}>{label}</p>
        <p className="text-sm font-bold" style={{ color: "#f1f5f9" }}>{value}</p>
      </div>
    </div>
  )
}

function ShortcutRow({
  icon,
  label,
  sub,
  onClick,
  color,
}: {
  icon: React.ReactNode
  label: string
  sub: string
  onClick: () => void
  color: string
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 w-full px-4 py-4 rounded-2xl text-left transition-all duration-200 active:scale-[0.98]"
      style={{
        background: "#1e293b",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}1a`, color }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>{label}</p>
        <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>{sub}</p>
      </div>
      <ChevronRight size={16} style={{ color: "#334155" }} />
    </button>
  )
}
