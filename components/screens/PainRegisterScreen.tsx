"use client"

import { useState } from "react"
import { ArrowLeft, Check } from "lucide-react"

const PAIN_LABELS: Record<number, { label: string; color: string; desc: string }> = {
  0:  { label: "Sem dor",    color: "#22c55e", desc: "Você está ótimo hoje!" },
  1:  { label: "Mínima",     color: "#4ade80", desc: "Quase imperceptível" },
  2:  { label: "Leve",       color: "#86efac", desc: "Pouco incômodo" },
  3:  { label: "Leve",       color: "#a3e635", desc: "Perceptível mas controlável" },
  4:  { label: "Moderada",   color: "#facc15", desc: "Afeta um pouco o foco" },
  5:  { label: "Moderada",   color: "#fbbf24", desc: "Dificulta algumas tarefas" },
  6:  { label: "Moderada",   color: "#f97316", desc: "Incomoda bastante" },
  7:  { label: "Intensa",    color: "#fb923c", desc: "Dificulta atividades diárias" },
  8:  { label: "Intensa",    color: "#ef4444", desc: "Muito difícil de ignorar" },
  9:  { label: "Muito forte",color: "#dc2626", desc: "Quase insuportável" },
  10: { label: "Insuportável",color: "#b91c1c", desc: "Precisa de ajuda imediata" },
}

const SYMPTOMS = ["Formigamento", "Rigidez", "Fadiga", "Névoa mental", "Sensibilidade ao toque", "Insônia"]
const MOODS = [
  { label: "Péssimo", emoji: "😖" },
  { label: "Ruim",    emoji: "😞" },
  { label: "Neutro",  emoji: "😐" },
  { label: "Bem",     emoji: "🙂" },
  { label: "Ótimo",   emoji: "😊" },
]

interface Props {
  onBack: () => void
  onSave: () => void
}

export function PainRegisterScreen({ onBack, onSave }: Props) {
  const [pain, setPain] = useState(4)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [selectedMood, setSelectedMood] = useState<number>(2)
  const [saved, setSaved] = useState(false)

  const cfg = PAIN_LABELS[pain]

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    )
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(onSave, 1200)
  }

  return (
    <div
      className="flex flex-col h-full w-full overflow-y-auto"
      style={{ background: "#0f172a" }}
    >
      {/* Glow */}
      <div
        className="absolute top-0 left-0 right-0 h-52 pointer-events-none transition-all duration-500"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${cfg.color}10 0%, transparent 70%)`,
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
          <h2 className="text-lg font-bold" style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}>
            Como está sua dor?
          </h2>
          <p className="text-xs" style={{ color: "#64748b" }}>Registre agora para acompanhar</p>
        </div>
      </div>

      {/* Indicador de dor */}
      <div className="px-6 mb-5 animate-fade-up" style={{ animationDelay: "0.08s" }}>
        <div
          className="rounded-3xl p-6 flex flex-col items-center gap-4 transition-all duration-300"
          style={{
            background: `${cfg.color}0d`,
            border: `1px solid ${cfg.color}30`,
          }}
        >
          <div
            className="text-7xl font-black tabular-nums transition-all duration-300"
            style={{ color: cfg.color, letterSpacing: "-0.04em", lineHeight: 1 }}
          >
            {pain}
          </div>
          <div className="text-center">
            <p className="text-base font-bold" style={{ color: cfg.color }}>{cfg.label}</p>
            <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>{cfg.desc}</p>
          </div>

          {/* Slider */}
          <div className="w-full px-2">
            <input
              type="range"
              min={0}
              max={10}
              step={1}
              value={pain}
              onChange={(e) => setPain(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${cfg.color} ${pain * 10}%, rgba(255,255,255,0.1) ${pain * 10}%)`,
                accentColor: cfg.color,
              }}
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs" style={{ color: "#334155" }}>0</span>
              <span className="text-xs" style={{ color: "#334155" }}>5</span>
              <span className="text-xs" style={{ color: "#334155" }}>10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Humor */}
      <div className="px-6 mb-5 animate-fade-up" style={{ animationDelay: "0.12s" }}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#475569" }}>
          Como você está se sentindo?
        </p>
        <div className="flex gap-2">
          {MOODS.map((m, i) => (
            <button
              key={i}
              onClick={() => setSelectedMood(i)}
              className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl transition-all duration-200 active:scale-95"
              style={{
                background: selectedMood === i ? "rgba(34,197,94,0.15)" : "#1e293b",
                border: selectedMood === i ? "1.5px solid rgba(34,197,94,0.4)" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span className="text-xl">{m.emoji}</span>
              <span className="text-xs" style={{ color: selectedMood === i ? "#22c55e" : "#475569" }}>
                {m.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Sintomas */}
      <div className="px-6 mb-6 animate-fade-up" style={{ animationDelay: "0.16s" }}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#475569" }}>
          Sintomas presentes
        </p>
        <div className="flex flex-wrap gap-2">
          {SYMPTOMS.map((s) => {
            const active = selectedSymptoms.includes(s)
            return (
              <button
                key={s}
                onClick={() => toggleSymptom(s)}
                className="px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 active:scale-95"
                style={{
                  background: active ? "rgba(34,197,94,0.15)" : "#1e293b",
                  color: active ? "#22c55e" : "#64748b",
                  border: active ? "1.5px solid rgba(34,197,94,0.35)" : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {s}
              </button>
            )
          })}
        </div>
      </div>

      {/* Botão salvar */}
      <div className="px-6 pb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <button
          onClick={handleSave}
          disabled={saved}
          className="w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
          style={{
            background: saved
              ? "rgba(34,197,94,0.2)"
              : "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            color: saved ? "#22c55e" : "#0f172a",
            boxShadow: saved ? "none" : "0 4px 20px rgba(34,197,94,0.3)",
            border: saved ? "1px solid rgba(34,197,94,0.3)" : "none",
          }}
        >
          {saved ? (
            <>
              <Check size={18} />
              Salvo com sucesso
            </>
          ) : (
            "Salvar registro"
          )}
        </button>
      </div>
    </div>
  )
}
