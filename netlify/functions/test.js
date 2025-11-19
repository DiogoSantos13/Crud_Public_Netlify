import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  try {
    const sql = neon(process.env.NETLIFY_DATABASE_URL);
    const result = await sql`SELECT COUNT(*) FROM users;`;

    return res.json({ ok: true, result });

  } catch (e) {
    return res.json({ ok: false, error: e.message });
  }
}
