export function Footer() {
  return (
    <footer
      className="py-12 px-6"
      style={{ background: "var(--background)", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            F
          </div>
          <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Fibrosync</span>
        </div>

        <p className="text-xs text-center sm:text-left" style={{ color: "var(--foreground-muted)" }}>
          Feito com cuidado para pessoas com fibromialgia. &copy; {new Date().getFullYear()} Fibrosync.
        </p>

        <div className="flex items-center gap-4">
          {["Privacidade", "Termos", "Contato"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs transition-colors hover:opacity-80"
              style={{ color: "var(--foreground-muted)" }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
