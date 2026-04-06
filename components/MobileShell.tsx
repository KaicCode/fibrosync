"use client"

import { useEffect, useState } from "react"
import { SplashScreen } from "./screens/SplashScreen"
import { LoginScreen } from "./screens/LoginScreen"
import { DashboardScreen } from "./screens/DashboardScreen"
import { ReliefScreen } from "./screens/ReliefScreen"
import { DataScreen } from "./screens/DataScreen"
import { PainRegisterScreen } from "./screens/PainRegisterScreen"
import { ShareScreen } from "./screens/ShareScreen"

type Screen =
  | "splash"
  | "login"
  | "dashboard"
  | "relief"
  | "data"
  | "pain"
  | "share"

const SCREEN_LABELS: Record<Screen, string> = {
  splash:    "Splash",
  login:     "Login",
  dashboard: "Dashboard",
  relief:    "Alívio",
  data:      "Dados",
  pain:      "Registro de Dor",
  share:     "Compartilhar",
}

export function MobileShell() {
  const [screen, setScreen] = useState<Screen>("splash")
  const [prevScreen, setPrevScreen] = useState<Screen | null>(null)
  const [transitioning, setTransitioning] = useState(false)

  const navigate = (to: Screen) => {
    if (transitioning || to === screen) return
    setTransitioning(true)
    setTimeout(() => {
      setPrevScreen(screen)
      setScreen(to)
      setTransitioning(false)
    }, 220)
  }

  const screens: Screen[] = ["splash", "login", "dashboard", "relief", "data", "pain", "share"]

  return (
    <div className="flex flex-col items-center min-h-screen w-full py-8 px-4"
      style={{ background: "#060d1a" }}>

      {/* Título do protótipo */}
      <div className="mb-6 text-center animate-fade-up">
        <div className="flex items-center gap-2 justify-center mb-1">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" }}
          >
            <svg width="14" height="14" viewBox="0 0 48 48" fill="none">
              <path
                d="M24 38s-14-9-14-19a9 9 0 0 1 14-7.5A9 9 0 0 1 38 19c0 10-14 19-14 19z"
                fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="3"
              />
              <polyline
                points="8,24 14,24 17,18 20,30 23,22 26,26 30,24 40,24"
                fill="none" stroke="white" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-base font-bold" style={{ color: "#f1f5f9" }}>
            Fibro<span style={{ color: "#22c55e" }}>Tech</span>
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}
          >
            MVP Prototype
          </span>
        </div>
        <p className="text-xs" style={{ color: "#334155" }}>
          Protótipo navegável — use os botões abaixo ou interaja com o app
        </p>
      </div>

      {/* Navegação de telas */}
      <div className="mb-5 flex flex-wrap gap-1.5 justify-center max-w-sm animate-fade-up" style={{ animationDelay: "0.05s" }}>
        {screens.filter(s => s !== "splash").map((s) => (
          <button
            key={s}
            onClick={() => navigate(s)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 active:scale-95"
            style={{
              background: screen === s ? "rgba(34,197,94,0.18)" : "rgba(255,255,255,0.04)",
              color: screen === s ? "#22c55e" : "#475569",
              border: screen === s ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {SCREEN_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Shell do celular */}
      <div
        className="relative flex-shrink-0 animate-fade-up"
        style={{ animationDelay: "0.1s" }}
      >
        {/* Carcaça do celular */}
        <div
          style={{
            width: 390,
            height: 844,
            borderRadius: 50,
            padding: 3,
            background: "linear-gradient(160deg, #2d3f55 0%, #1a2537 50%, #0d1a2a 100%)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.06), 0 40px 100px rgba(0,0,0,0.8), 0 0 80px rgba(34,197,94,0.05)",
          }}
        >
          {/* Inner screen */}
          <div
            className="relative overflow-hidden"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 48,
              background: "#0f172a",
            }}
          >
            {/* Notch */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center"
              style={{
                width: 120,
                height: 34,
                background: "#000",
                borderRadius: "0 0 20px 20px",
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#1a1a1a" }} />
            </div>

            {/* Status bar */}
            <div
              className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-8 pt-2"
              style={{ height: 44 }}
            >
              <span className="text-xs font-semibold" style={{ color: "rgba(241,245,249,0.6)" }}>
                9:41
              </span>
              <div className="flex items-center gap-1.5">
                {/* Signal */}
                <div className="flex gap-0.5 items-end">
                  {[3, 5, 7, 9].map((h, i) => (
                    <div key={i} className="w-1 rounded-sm" style={{ height: h, background: "rgba(241,245,249,0.6)" }} />
                  ))}
                </div>
                {/* WiFi */}
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M8 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" fill="rgba(241,245,249,0.6)"/>
                  <path d="M5.5 7.5C6.2 6.8 7.1 6.4 8 6.4s1.8.4 2.5 1.1" stroke="rgba(241,245,249,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M3 5C4.5 3.5 6.1 2.7 8 2.7s3.5.8 5 2.3" stroke="rgba(241,245,249,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                {/* Battery */}
                <div className="flex items-center gap-0.5">
                  <div
                    className="rounded-sm"
                    style={{
                      width: 20, height: 10,
                      border: "1px solid rgba(241,245,249,0.5)",
                      padding: "1px 1px",
                    }}
                  >
                    <div className="h-full rounded-sm" style={{ width: "75%", background: "rgba(241,245,249,0.7)" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Conteúdo da tela com transição */}
            <div
              className="absolute inset-0"
              style={{
                opacity: transitioning ? 0 : 1,
                transform: transitioning ? "translateY(8px)" : "translateY(0)",
                transition: "opacity 0.22s ease, transform 0.22s ease",
              }}
            >
              {screen === "splash" && (
                <SplashScreen onFinish={() => navigate("login")} />
              )}
              {screen === "login" && (
                <LoginScreen onLogin={() => navigate("dashboard")} />
              )}
              {screen === "dashboard" && (
                <DashboardScreen
                  status="warn"
                  onRelief={() => navigate("relief")}
                  onData={() => navigate("data")}
                  onShare={() => navigate("share")}
                />
              )}
              {screen === "relief" && (
                <ReliefScreen onBack={() => navigate("dashboard")} />
              )}
              {screen === "data" && (
                <DataScreen
                  onBack={() => navigate("dashboard")}
                  onRegisterPain={() => navigate("pain")}
                />
              )}
              {screen === "pain" && (
                <PainRegisterScreen
                  onBack={() => navigate("data")}
                  onSave={() => navigate("dashboard")}
                />
              )}
              {screen === "share" && (
                <ShareScreen onBack={() => navigate("dashboard")} />
              )}
            </div>

            {/* Home indicator */}
            <div
              className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50"
              style={{
                width: 120,
                height: 5,
                borderRadius: 3,
                background: "rgba(255,255,255,0.3)",
              }}
            />
          </div>
        </div>

        {/* Botões laterais */}
        <div
          className="absolute left-[-4px] top-32 rounded-l-sm"
          style={{ width: 4, height: 32, background: "#1a2537" }}
        />
        <div
          className="absolute left-[-4px] top-48 rounded-l-sm"
          style={{ width: 4, height: 64, background: "#1a2537" }}
        />
        <div
          className="absolute left-[-4px] top-64 rounded-l-sm"
          style={{ width: 4, height: 64, background: "#1a2537" }}
        />
        <div
          className="absolute right-[-4px] top-48 rounded-r-sm"
          style={{ width: 4, height: 88, background: "#1a2537" }}
        />
      </div>

      {/* Screen label */}
      <div className="mt-4 animate-fade-up" style={{ animationDelay: "0.15s" }}>
        <span
          className="text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(34,197,94,0.08)",
            color: "#22c55e",
            border: "1px solid rgba(34,197,94,0.15)",
          }}
        >
          {SCREEN_LABELS[screen]}
        </span>
      </div>
    </div>
  )
}
