"use client"

import { useEffect } from "react"

interface Props {
  onFinish: () => void
}

export function SplashScreen({ onFinish }: Props) {
  useEffect(() => {
    const t = setTimeout(onFinish, 2800)
    return () => clearTimeout(t)
  }, [onFinish])

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0f172a 0%, #0d1f35 100%)" }}>

      {/* Glow de fundo sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(34,197,94,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Logo */}
      <div className="animate-logo-pop flex flex-col items-center gap-5">
        {/* Ícone */}
        <div
          className="animate-pulse-glow rounded-[28px] flex items-center justify-center"
          style={{
            width: 88,
            height: 88,
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            boxShadow: "0 0 40px rgba(34,197,94,0.35)",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            {/* Coração com pulso */}
            <path
              d="M24 38s-14-9-14-19a9 9 0 0 1 14-7.5A9 9 0 0 1 38 19c0 10-14 19-14 19z"
              fill="rgba(255,255,255,0.15)"
              stroke="white"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <polyline
              points="8,24 14,24 17,18 20,30 23,22 26,26 30,24 40,24"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Nome */}
        <div className="text-center">
          <h1
            className="text-4xl font-bold tracking-tight text-balance"
            style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
          >
            Fibro<span style={{ color: "#22c55e" }}>Tech</span>
          </h1>
          <p
            className="mt-3 text-base font-medium text-balance"
            style={{ color: "#94a3b8", lineHeight: 1.5, animationDelay: "0.4s" }}
          >
            Preveja sua dor.{" "}
            <span style={{ color: "#f1f5f9" }}>Retome o controle.</span>
          </p>
        </div>
      </div>

      {/* Loader */}
      <div className="absolute bottom-16 flex flex-col items-center gap-3 animate-fade-in" style={{ animationDelay: "1.2s" }}>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: i === 1 ? 24 : 8,
                height: 8,
                background: i === 1 ? "#22c55e" : "rgba(34,197,94,0.3)",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
