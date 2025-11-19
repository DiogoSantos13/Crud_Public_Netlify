import { neon } from "@neondatabase/serverless";

export async function handler() {
  try {
    const sql = neon(process.env.NETLIFY_DATABASE_URL);

    const users = await sql`SELECT id, nome, email, created_at FROM users ORDER BY id ASC`;

    return {
      statusCode: 200,
      body: JSON.stringify({ users })
    };

  } catch (error) {
    return { statusCode: 500, body: error.message };
  }
}
