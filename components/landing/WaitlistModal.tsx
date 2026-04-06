"use client"

import { useState, useEffect } from "react"

interface WaitlistModalProps {
  open: boolean
  onClose: () => void
}

export function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  const [step, setStep] = useState<"form" | "success">("form")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setStep("form")
      setEmail("")
      setName("")
      setError(null)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !name) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      })

      const data = await res.json()

      if (res.ok) {
        setStep("success")
      } else {
        setError(data.error ?? "Ocorreu um erro. Tente novamente.")
      }
    } catch {
      setError("Falha de conexão. Verifique sua internet e tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
          animation: "fade-up 0.35s cubic-bezier(.34,1.56,.64,1) both",
        }}
      >
        {step === "form" ? (
          <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
                  Entre na lista de espera
                </h3>
                <p className="mt-1 text-sm" style={{ color: "var(--foreground-muted)" }}>
                  Acesso antecipado + gratuito no beta.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg transition-colors hover:opacity-70"
                style={{ color: "var(--foreground-muted)" }}
                aria-label="Fechar"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                </svg>
              </button>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                Seu nome
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ana Silva"
                required
                maxLength={100}
                autoComplete="name"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "var(--background)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                Seu e-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ana@email.com"
                required
                maxLength={255}
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "var(--background)",
                  border: "1px solid var(--border)",
                  color: "var(--foreground)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            {/* Mensagem de erro inline */}
            {error && (
              <div
                className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  color: "#f87171",
                }}
                role="alert"
              >
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9V7a1 1 0 112 0v2a1 1 0 01-2 0zm0 4a1 1 0 112 0 1 1 0 01-2 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                boxShadow: "0 0 24px rgba(34,197,94,0.2)",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" strokeLinecap="round" />
                  </svg>
                  Salvando...
                </span>
              ) : "Garantir meu lugar"}
            </button>

            <p className="text-xs text-center" style={{ color: "var(--foreground-muted)" }}>
              Sem spam. Você receberá apenas novidades do Fibrosync.
            </p>
          </form>
        ) : (
          <div className="p-8 flex flex-col items-center gap-6 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" className="w-8 h-8">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
                Você está na lista!
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                Obrigado, <strong style={{ color: "var(--foreground)" }}>{name}</strong>! Enviaremos novidades em{" "}
                <strong style={{ color: "var(--foreground)" }}>{email}</strong>.
                Você será um dos primeiros a testar o Fibrosync.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
              style={{ border: "1px solid var(--border)", color: "var(--foreground-muted)" }}
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
