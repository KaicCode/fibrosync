/**
 * app/api/waitlist/route.ts
 * API Route — POST /api/waitlist
 *
 * Camadas de segurança implementadas:
 *  1. Rate Limiting       — máx 3 tentativas por IP em 15 minutos
 *  2. Validação Zod       — schema estrito (nome 2-100 chars, email RFC válido)
 *  3. Sanitização         — escape HTML, trim, lowercase no email
 *  4. Query Parametrizada — nunca concatena strings SQL (imune a SQL Injection)
 *  5. Duplicata segura    — trata UNIQUE constraint sem expor detalhes internos
 *  6. Headers de segurança— X-Content-Type-Options, X-Frame-Options
 *  7. Erros opacos        — cliente nunca vê stack traces ou mensagens internas
 */

import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import validator from "validator"
import pool from "@/lib/db"
import { initDatabase } from "@/lib/db-init"

// -------------------------------------------------------------------
// 1. Schema de validação Zod
// -------------------------------------------------------------------
const waitlistSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter ao menos 2 caracteres")
    .max(100, "Nome pode ter no máximo 100 caracteres")
    .regex(/^[\p{L}\s'\-]+$/u, "Nome contém caracteres inválidos"),
  email: z
    .string()
    .email("E-mail inválido")
    .max(255, "E-mail muito longo"),
})

// -------------------------------------------------------------------
// 2. Rate Limiting — in-memory (adequado para single-instance)
//    Para produção multi-instância, substitua por Redis/Upstash
// -------------------------------------------------------------------
interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()
const RATE_LIMIT_MAX = 3         // máx tentativas
const RATE_LIMIT_WINDOW = 15 * 60 * 1000  // 15 minutos em ms

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return false
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true
  }

  entry.count++
  return false
}

// -------------------------------------------------------------------
// 3. Helper de resposta com headers de segurança padrão
// -------------------------------------------------------------------
function secureResponse(body: object, status: number): NextResponse {
  return NextResponse.json(body, {
    status,
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Cache-Control": "no-store",
    },
  })
}

// -------------------------------------------------------------------
// Flag para inicializar o banco uma única vez por processo
// -------------------------------------------------------------------
let dbInitialized = false

// -------------------------------------------------------------------
// Handler principal POST /api/waitlist
// -------------------------------------------------------------------
export async function POST(req: NextRequest): Promise<NextResponse> {
  // Garante que o schema da tabela existe
  if (!dbInitialized) {
    try {
      await initDatabase()
      dbInitialized = true
    } catch (err: unknown) {
      console.error("[waitlist] Falha ao inicializar banco de dados", err)
      return secureResponse(
        { error: "Serviço temporariamente indisponível. Tente novamente em breve." },
        503
      )
    }
  }

  // — Rate Limiting por IP —
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"

  if (ip !== "unknown" && isRateLimited(ip)) {
    return secureResponse(
      { error: "Muitas tentativas. Aguarde alguns minutos e tente novamente." },
      429
    )
  }

  // — Leitura e parsing do body —
  let rawBody: unknown
  try {
    rawBody = await req.json()
  } catch {
    return secureResponse({ error: "Requisição inválida." }, 400)
  }

  // — Validação com Zod —
  const parsed = waitlistSchema.safeParse(rawBody)
  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message ?? "Dados inválidos."
    return secureResponse({ error: firstError }, 422)
  }

  // — Sanitização dos dados validados —
  const name = validator.escape(validator.trim(parsed.data.name))
  const email = validator.normalizeEmail(parsed.data.email) as string

  // Garante que normalizeEmail não retornou false
  if (!email || !validator.isEmail(email)) {
    return secureResponse({ error: "E-mail inválido após normalização." }, 422)
  }

  // — Persistência no banco com query PARAMETRIZADA —
  // O driver `pg` com $1, $2 nunca interpola strings diretamente no SQL.
  // SQL Injection é impossível neste padrão.
  const client = await pool.connect()
  try {
    await client.query(
      `INSERT INTO waitlist_leads (name, email, ip_address)
       VALUES ($1, $2, $3::inet)`,
      [name, email, ip === "unknown" ? null : ip]
    )

    return secureResponse(
      { success: true, message: "Cadastro realizado com sucesso!" },
      201
    )
  } catch (err: unknown) {
    // Código 23505 = violação de UNIQUE constraint (email duplicado)
    if (
      err instanceof Error &&
      "code" in err &&
      (err as { code: string }).code === "23505"
    ) {
      return secureResponse(
        { error: "Este e-mail já está na lista de espera." },
        409
      )
    }

    // Qualquer outro erro: loga internamente, retorna mensagem genérica
    console.error("[waitlist] Erro ao salvar lead:", err)
    return secureResponse(
      { error: "Não foi possível completar o cadastro. Tente novamente." },
      500
    )
  } finally {
    // SEMPRE devolve a conexão ao pool, mesmo em caso de erro
    client.release()
  }
}

// Bloqueia outros métodos HTTP nesta rota
export async function GET(): Promise<NextResponse> {
  return secureResponse({ error: "Método não permitido." }, 405)
}
