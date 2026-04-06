/**
 * lib/db.ts
 * Pool de conexões PostgreSQL com configurações seguras.
 *
 * - Usa variáveis de ambiente obrigatórias (nunca hard-coded)
 * - Pool reutiliza conexões (evita overhead de abrir/fechar por request)
 * - SSL habilitado automaticamente em produção
 * - Timeouts configuráveis para evitar conexões "penduradas"
 */

import { Pool } from "pg"

// -------------------------------------------------------------------
// Validação obrigatória em startup — falha rápido se falta o .env
// Next.js carrega .env.local automaticamente. Ao rodar scripts com
// tsx diretamente, tentamos carregar via dotenv antes de lançar erro.
// -------------------------------------------------------------------
if (!process.env.DATABASE_URL) {
  try {
    // require() é síncrono no CJS — carrega .env.local antes de continuar
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const dotenv = require("dotenv") as typeof import("dotenv")
    dotenv.config({ path: ".env.local" })
    dotenv.config({ path: ".env" }) // fallback para .env simples
  } catch {
    // dotenv não instalado ou arquivo não encontrado — erro abaixo
  }

  if (!process.env.DATABASE_URL) {
    throw new Error(
      "❌ Variável DATABASE_URL não encontrada.\n" +
      "Crie o arquivo .env.local com sua string de conexão PostgreSQL.\n" +
      "Exemplo: DATABASE_URL=postgresql://user:senha@localhost:5432/fibrosync"
    )
  }
}

// -------------------------------------------------------------------
// Singleton: evita criar múltiplos pools em hot-reload do Next.js
// -------------------------------------------------------------------
declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined
}

function createPool(): Pool {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    max: parseInt(process.env.DB_MAX_CONNECTIONS ?? "10", 10),
    idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT_MS ?? "30000", 10),
    connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT_MS ?? "5000", 10),
    // SSL obrigatório em produção, opcional em desenvolvimento
    ssl:
      process.env.NODE_ENV === "production" &&
      !process.env.DATABASE_URL?.includes("localhost")
        ? { rejectUnauthorized: false }
        : false,
  })
}

// Em desenvolvimento o Next.js faz hot-reload; sem singleton, cria pools infinitos
const pool: Pool = global._pgPool ?? createPool()

if (process.env.NODE_ENV !== "production") {
  global._pgPool = pool
}

// Listener para erros no pool (evita crash silencioso)
pool.on("error", (err) => {
  console.error("[db] Erro inesperado no pool de conexões PostgreSQL:", err)
})

export default pool
