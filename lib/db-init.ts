/**
 * lib/db-init.ts
 * Inicialização do schema — cria a tabela waitlist_leads se não existir.
 *
 * Execute este arquivo uma vez antes de subir o servidor:
 *   npx tsx lib/db-init.ts
 *   ou
 *   pnpm tsx lib/db-init.ts
 *
 * Também é chamado automaticamente na primeira requisição à API.
 */

import pool from "./db"

export async function initDatabase(): Promise<void> {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS waitlist_leads (
        id           SERIAL PRIMARY KEY,
        name         VARCHAR(100)  NOT NULL,
        email        VARCHAR(255)  NOT NULL,
        ip_address   INET,
        created_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
      );

      -- Index único no email: impede duplicatas e acelera consultas
      CREATE UNIQUE INDEX IF NOT EXISTS waitlist_leads_email_idx
        ON waitlist_leads (LOWER(email));

      -- Index no created_at para ordenar leads cronologicamente
      CREATE INDEX IF NOT EXISTS waitlist_leads_created_at_idx
        ON waitlist_leads (created_at DESC);
    `)
    console.log("[db-init] Tabela waitlist_leads verificada/criada com sucesso.")
  } catch (err) {
    console.error("[db-init] Erro ao inicializar banco de dados:", err)
    throw err
  } finally {
    client.release()
  }
}

// Permite rodar diretamente: pnpm tsx lib/db-init.ts
if (require.main === module) {
  initDatabase()
    .then(() => {
      console.log("✅ Banco iniciado com sucesso!")
      process.exit(0)
    })
    .catch((err) => {
      console.error("❌ Falha:", err)
      process.exit(1)
    })
}
