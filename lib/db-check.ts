import pool from "./db"
import { initDatabase } from "./db-init"

async function main() {
  await initDatabase()
  const client = await pool.connect()
  try {
    const result = await client.query(
      "SELECT id, name, email, ip_address, to_char(created_at, 'DD/MM/YYYY HH24:MI:SS') AS created_at FROM waitlist_leads ORDER BY created_at DESC"
    )
    if (result.rows.length === 0) {
      console.log("Nenhum lead cadastrado ainda.")
    } else {
      console.log(`\n✅ ${result.rows.length} lead(s) na lista de espera:\n`)
      console.table(result.rows)
    }
  } finally {
    client.release()
    await pool.end()
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
