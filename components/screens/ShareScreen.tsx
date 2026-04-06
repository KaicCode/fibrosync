"use client"

import { useState } from "react"
import { ArrowLeft, Copy, Check, MessageCircle, Mail, Share2, Users, Lock } from "lucide-react"

interface Props {
  onBack: () => void
}

const contacts = [
  { name: "Maria Costa", relation: "Mãe", initials: "MC", color: "#818cf8" },
  { name: "João Costa",  relation: "Marido", initials: "JC", color: "#22c55e" },
  { name: "Dr. Fonseca", relation: "Médico", initials: "DF", color: "#38bdf8" },
]

export function ShareScreen({ onBack }: Props) {
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState<number[]>([])

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleShare = (i: number) => {
    setShared((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    )
  }

  return (
    <div
      className="flex flex-col h-full w-full overflow-y-auto"
      style={{ background: "#0f172a" }}
    >
      {/* Glow */}
      <div
        className="absolute top-0 left-0 right-0 h-52 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(34,197,94,0.08) 0%, transparent 70%)",
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
            Compartilhar status
          </h2>
          <p className="text-xs" style={{ color: "#64748b" }}>Informe quem você ama</p>
        </div>
      </div>

      {/* Card de status */}
      <div className="px-6 mb-5 animate-fade-up" style={{ animationDelay: "0.08s" }}>
        <div
          className="rounded-3xl p-5"
          style={{
            background: "rgba(250,204,21,0.08)",
            border: "1px solid rgba(250,204,21,0.2)",
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#facc15", opacity: 0.7 }}>
                Seu status hoje
              </p>
              <h3 className="text-lg font-bold mt-0.5" style={{ color: "#facc15" }}>
                Atenção ao seu corpo
              </h3>
            </div>
            <div
              className="px-3 py-1.5 rounded-xl text-xs font-bold"
              style={{ background: "rgba(250,204,21,0.15)", color: "#facc15" }}
            >
              Dor 4/10
            </div>
          </div>

          <div
            className="rounded-2xl px-4 py-3 mb-4"
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "rgba(241,245,249,0.8)" }}>
              &quot;Hoje estou com atenção redobrada ao meu corpo. Meu sono foi abaixo do normal e o estresse aumentou um pouco.&quot;
            </p>
            <p className="text-xs mt-2" style={{ color: "#475569" }}>
              — Enviado pelo Fibrosync · {new Date().toLocaleDateString("pt-BR")}
            </p>
          </div>

          {/* Info de privacidade */}
          <div className="flex items-center gap-2">
            <Lock size={12} style={{ color: "#64748b" }} />
            <p className="text-xs" style={{ color: "#475569" }}>
              Apenas as pessoas selecionadas receberão este resumo
            </p>
          </div>
        </div>
      </div>

      {/* Contatos */}
      <div className="px-6 mb-5 animate-fade-up" style={{ animationDelay: "0.12s" }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#475569" }}>
            Minha rede de apoio
          </p>
          <button className="text-xs" style={{ color: "#22c55e" }}>
            + Adicionar
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {contacts.map((c, i) => {
            const isSelected = shared.includes(i)
            return (
              <button
                key={i}
                onClick={() => toggleShare(i)}
                className="flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl text-left transition-all duration-200 active:scale-[0.98]"
                style={{
                  background: isSelected ? "rgba(34,197,94,0.1)" : "#1e293b",
                  border: isSelected
                    ? "1.5px solid rgba(34,197,94,0.3)"
                    : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: `${c.color}22`, color: c.color }}
                >
                  {c.initials}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>{c.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>{c.relation}</p>
                </div>
                <div
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                  style={{
                    borderColor: isSelected ? "#22c55e" : "#334155",
                    background: isSelected ? "#22c55e" : "transparent",
                  }}
                >
                  {isSelected && <Check size={12} style={{ color: "#0f172a" }} />}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Canais */}
      <div className="px-6 mb-5 animate-fade-up" style={{ animationDelay: "0.16s" }}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#475569" }}>
          Compartilhar via
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: <MessageCircle size={20} />, label: "WhatsApp", color: "#22c55e" },
            { icon: <Mail size={20} />,          label: "E-mail",   color: "#38bdf8" },
            { icon: <Share2 size={20} />,         label: "Outros",   color: "#818cf8" },
          ].map((ch) => (
            <button
              key={ch.label}
              className="flex flex-col items-center gap-2 py-4 rounded-2xl transition-all active:scale-95"
              style={{
                background: "#1e293b",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ color: ch.color }}>{ch.icon}</div>
              <span className="text-xs font-medium" style={{ color: "#64748b" }}>
                {ch.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Botão principal */}
      <div className="px-6 pb-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <button
          className="w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
          style={{
            background: shared.length > 0
              ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
              : "#1e293b",
            color: shared.length > 0 ? "#0f172a" : "#475569",
            boxShadow: shared.length > 0 ? "0 4px 20px rgba(34,197,94,0.3)" : "none",
            border: shared.length > 0 ? "none" : "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Users size={16} />
          Compartilhar com {shared.length > 0 ? `${shared.length} pessoa${shared.length > 1 ? "s" : ""}` : "selecionados"}
        </button>
      </div>

      {/* Link copiável */}
      <div className="px-6 pb-8 animate-fade-up" style={{ animationDelay: "0.24s" }}>
        <button
          onClick={handleCopy}
          className="w-full py-3.5 rounded-2xl font-medium text-xs transition-all active:scale-95 flex items-center justify-center gap-2"
          style={{
            background: "transparent",
            color: copied ? "#22c55e" : "#475569",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Link copiado!" : "Copiar link do status"}
        </button>
      </div>
    </div>
  )
}
