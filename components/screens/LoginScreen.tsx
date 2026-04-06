"use client"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

interface Props {
  onLogin: () => void
}

export function LoginScreen({ onLogin }: Props) {
  const [showPass, setShowPass] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div
      className="flex flex-col h-full w-full overflow-y-auto"
      style={{ background: "#0f172a" }}
    >
      {/* Glow topo */}
      <div
        className="absolute top-0 left-0 right-0 h-72 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,197,94,0.09) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <div className="px-8 pt-16 pb-8 animate-fade-up">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.25)" }}
        >
          <svg width="26" height="26" viewBox="0 0 48 48" fill="none">
            <path
              d="M24 38s-14-9-14-19a9 9 0 0 1 14-7.5A9 9 0 0 1 38 19c0 10-14 19-14 19z"
              fill="rgba(34,197,94,0.2)"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <polyline
              points="8,24 14,24 17,18 20,30 23,22 26,26 30,24 40,24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-balance" style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}>
          Boas-vindas
        </h1>
        <p className="mt-1.5 text-sm" style={{ color: "#94a3b8", lineHeight: 1.6 }}>
          Faça login para acompanhar<br />seu bem-estar hoje
        </p>
      </div>

      {/* Formulário */}
      <div className="flex-1 px-8 flex flex-col gap-5 animate-fade-up" style={{ animationDelay: "0.1s" }}>

        {/* Google */}
        <button
          onClick={onLogin}
          className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-95"
          style={{
            background: "#1e293b",
            color: "#f1f5f9",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          }}
        >
          <GoogleIcon />
          Entrar com Google
        </button>

        {/* Divisor */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          <span className="text-xs font-medium" style={{ color: "#475569" }}>ou</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#64748b" }}>
            E-mail
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "#475569" }}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full pl-11 pr-4 py-4 rounded-2xl text-sm outline-none transition-all duration-200 focus:ring-2"
              style={{
                background: "#1e293b",
                color: "#f1f5f9",
                border: "1px solid rgba(255,255,255,0.07)",
                caretColor: "#22c55e",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(34,197,94,0.5)"
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.07)"
              }}
            />
          </div>
        </div>

        {/* Senha */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#64748b" }}>
            Senha
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: "#475569" }}
            />
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-11 pr-12 py-4 rounded-2xl text-sm outline-none transition-all duration-200"
              style={{
                background: "#1e293b",
                color: "#f1f5f9",
                border: "1px solid rgba(255,255,255,0.07)",
                caretColor: "#22c55e",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(34,197,94,0.5)"
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.07)"
              }}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
              style={{ color: "#475569" }}
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          onClick={onLogin}
          className="w-full py-4 rounded-2xl font-bold text-sm transition-all duration-200 active:scale-95 mt-2"
          style={{
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            color: "#0f172a",
            boxShadow: "0 4px 20px rgba(34,197,94,0.3)",
          }}
        >
          Entrar
        </button>

        <p className="text-center text-xs" style={{ color: "#475569" }}>
          Esqueceu a senha?{" "}
          <span style={{ color: "#22c55e" }} className="cursor-pointer">Redefinir</span>
        </p>
      </div>

      {/* Rodapé */}
      <div className="px-8 pb-10 pt-6 text-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <p className="text-xs" style={{ color: "#334155" }}>
          Ao continuar, você concorda com os{" "}
          <span style={{ color: "#475569" }}>Termos de Uso</span> e{" "}
          <span style={{ color: "#475569" }}>Política de Privacidade</span>
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}
