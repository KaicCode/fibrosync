"use client"

import { useState } from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

interface CTASectionProps {
  onCTAClick: () => void
}

export function CTASection({ onCTAClick }: CTASectionProps) {
  const ref = useScrollReveal()

  return (
    <section className="py-28" style={{ background: "var(--surface)" }}>
      <div ref={ref} className="scroll-reveal max-w-3xl mx-auto px-6 text-center">
        {/* Glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 500,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(34,197,94,0.08) 0%, transparent 70%)",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />

        <div className="relative">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-8"
            style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "var(--primary)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--primary)" }} />
            Vagas limitadas — MVP em desenvolvimento
          </span>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-balance mb-6" style={{ color: "var(--foreground)" }}>
            Pronto para retomar
            <span style={{ color: "var(--primary)" }}> o controle</span>?
          </h2>

          <p className="text-base leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "var(--foreground-muted)" }}>
            Entre na lista de espera e seja um dos primeiros a testar o Fibrosync.
            Usuários beta têm acesso gratuito e influência direta no produto.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onCTAClick}
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                boxShadow: "0 0 40px rgba(34,197,94,0.3), 0 4px 24px rgba(0,0,0,0.4)",
              }}
            >
              Entrar na lista de espera
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={onCTAClick}
              className="px-8 py-4 rounded-full text-base font-semibold transition-all duration-200 hover:opacity-80"
              style={{ color: "var(--foreground-muted)", border: "1px solid var(--border)" }}
            >
              Testar o MVP
            </button>
          </div>

          <p className="mt-8 text-xs" style={{ color: "var(--foreground-muted)" }}>
            Sem cartão de crédito. Sem compromisso. 100% gratuito para beta.
          </p>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: "🔒", label: "Dados criptografados" },
              { icon: "🏥", label: "Baseado em evidências" },
              { icon: "🤝", label: "Co-desenhado com pacientes" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2">
                <span className="text-sm">{b.icon}</span>
                <span className="text-xs font-medium" style={{ color: "var(--foreground-muted)" }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
