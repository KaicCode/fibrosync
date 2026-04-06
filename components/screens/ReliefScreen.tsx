"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowLeft, X } from "lucide-react"

type Phase = "inspire" | "hold" | "expire" | "rest"

const PHASES: { phase: Phase; label: string; sub: string; duration: number }[] = [
  { phase: "inspire", label: "Inspire", sub: "pela 4 segundos", duration: 4 },
  { phase: "hold",    label: "Segure",  sub: "por 4 segundos",  duration: 4 },
  { phase: "expire",  label: "Expire",  sub: "por 4 segundos",  duration: 4 },
  { phase: "rest",    label: "Descanse", sub: "por 4 segundos", duration: 4 },
]

interface Props {
  onBack: () => void
}

export function ReliefScreen({ onBack }: Props) {
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [count, setCount] = useState(4)
  const [cycle, setCycle] = useState(1)
  const [running, setRunning] = useState(true)

  const current = PHASES[phaseIdx]

  const nextPhase = useCallback(() => {
    setPhaseIdx((prev) => {
      const next = (prev + 1) % PHASES.length
      if (next === 0) setCycle((c) => c + 1)
      return next
    })
    setCount(PHASES[(phaseIdx + 1) % PHASES.length].duration)
  }, [phaseIdx])

  useEffect(() => {
    if (!running) return
    if (count <= 0) {
      nextPhase()
      return
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [running, count, nextPhase])

  // Escala do círculo baseada na fase
  const circleScale = current.phase === "inspire" ? 1.4
    : current.phase === "hold" ? 1.4
    : current.phase === "expire" ? 1.0
    : 1.0

  const phaseColors: Record<Phase, string> = {
    inspire: "#22c55e",
    hold:    "#818cf8",
    expire:  "#38bdf8",
    rest:    "#94a3b8",
  }

  const activeColor = phaseColors[current.phase]

  return (
    <div
      className="flex flex-col h-full w-full"
      style={{
        background: "linear-gradient(180deg, #0a1628 0%, #0f172a 50%, #0a1628 100%)",
      }}
    >
      {/* Glow dinâmico */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 45%, ${activeColor}15 0%, transparent 70%)`,
        }}
      />

      {/* Header */}
      <div className="px-6 pt-14 pb-4 flex items-center justify-between animate-fade-up">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all active:scale-90"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <ArrowLeft size={18} style={{ color: "#94a3b8" }} />
        </button>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#475569" }}>
            Respiração guiada
          </p>
          <p className="text-xs mt-0.5" style={{ color: "#334155" }}>Ciclo {cycle}</p>
        </div>
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all active:scale-90"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <X size={18} style={{ color: "#94a3b8" }} />
        </button>
      </div>

      {/* Progresso de fases */}
      <div className="px-6 mb-4 animate-fade-up" style={{ animationDelay: "0.08s" }}>
        <div className="flex gap-1.5">
          {PHASES.map((p, i) => (
            <div
              key={p.phase}
              className="flex-1 h-1 rounded-full transition-all duration-500"
              style={{
                background: i <= phaseIdx ? activeColor : "rgba(255,255,255,0.08)",
                opacity: i < phaseIdx ? 0.4 : 1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Círculo de respiração */}
      <div className="flex-1 flex items-center justify-center animate-fade-up" style={{ animationDelay: "0.12s" }}>
        <div className="relative flex items-center justify-center">
          {/* Anel externo pulsante */}
          <div
            className="absolute rounded-full transition-all"
            style={{
              width: 260,
              height: 260,
              border: `2px solid ${activeColor}`,
              opacity: 0.15,
              transform: `scale(${circleScale * 1.25})`,
              transition: "transform 4s ease-in-out, opacity 4s ease-in-out, border-color 0.5s",
            }}
          />
          {/* Anel médio */}
          <div
            className="absolute rounded-full"
            style={{
              width: 220,
              height: 220,
              border: `1.5px solid ${activeColor}`,
              opacity: 0.25,
              transform: `scale(${circleScale * 1.12})`,
              transition: "transform 4s ease-in-out, opacity 4s ease-in-out, border-color 0.5s",
            }}
          />
          {/* Círculo principal */}
          <div
            className="relative rounded-full flex flex-col items-center justify-center"
            style={{
              width: 190,
              height: 190,
              background: `radial-gradient(circle, ${activeColor}22 0%, ${activeColor}0a 60%, transparent 100%)`,
              border: `2px solid ${activeColor}`,
              transform: `scale(${circleScale})`,
              transition: "transform 4s ease-in-out, border-color 0.5s ease, background 0.5s ease",
              boxShadow: `0 0 60px ${activeColor}30, 0 0 20px ${activeColor}20`,
            }}
          >
            {/* Contador */}
            <span
              className="text-5xl font-bold tabular-nums"
              style={{ color: activeColor, letterSpacing: "-0.04em", lineHeight: 1, transition: "color 0.5s" }}
            >
              {count}
            </span>
          </div>
        </div>
      </div>

      {/* Instrução */}
      <div className="px-6 pb-6 text-center animate-fade-up" style={{ animationDelay: "0.16s" }}>
        <h2
          className="text-3xl font-bold transition-all duration-500"
          style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
        >
          {current.label}
        </h2>
        <p className="text-base mt-1 transition-all duration-500" style={{ color: "#64748b" }}>
          {current.sub}
        </p>
      </div>

      {/* Controles */}
      <div className="px-6 pb-10 flex flex-col gap-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <button
          onClick={() => setRunning((r) => !r)}
          className="w-full py-4 rounded-2xl font-semibold text-sm transition-all active:scale-95"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "#94a3b8",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {running ? "Pausar" : "Continuar"}
        </button>
        <button
          onClick={onBack}
          className="w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            color: "#0f172a",
            boxShadow: "0 4px 20px rgba(34,197,94,0.3)",
          }}
        >
          Encerrar sessão
        </button>
      </div>
    </div>
  )
}
