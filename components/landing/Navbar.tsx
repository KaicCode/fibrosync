"use client"

import { useState, useEffect } from "react"

interface NavbarProps {
  onCTAClick: () => void
}

export function Navbar({ onCTAClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "Problema", href: "#problema" },
    { label: "Solução", href: "#solucao" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Diferenciais", href: "#diferenciais" },
  ]

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(15, 23, 42, 0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(45,63,85,0.6)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-transform group-hover:scale-105"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            F
          </div>
          <span className="text-base font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
            Fibrosync
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors duration-200 hover:opacity-100"
              style={{ color: "var(--foreground-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground-muted)")}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCTAClick}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              boxShadow: "0 0 20px rgba(34,197,94,0.25)",
            }}
          >
            Entrar na lista de espera
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "var(--foreground)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              {menuOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              ) : (
                <path fillRule="evenodd" clipRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
          style={{
            background: "rgba(15,23,42,0.98)",
            backdropFilter: "blur(16px)",
            borderColor: "var(--border)",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium py-1"
              style={{ color: "var(--foreground-muted)" }}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { onCTAClick(); setMenuOpen(false) }}
            className="mt-2 w-full py-3 rounded-xl text-sm font-semibold"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            Entrar na lista de espera
          </button>
        </div>
      )}
    </header>
  )
}
