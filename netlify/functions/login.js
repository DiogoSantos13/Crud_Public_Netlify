import { neon } from "@neondatabase/serverless";

export async function handler(event, context) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Método não permitido" })
      };
    }

    const body = JSON.parse(event.body);
    const { email, password } = body;

    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Campos incompletos." })
      };
    }

    const sql = neon(process.env.NETLIFY_DATABASE_URL);

    const rows = await sql`
      SELECT id, nome, email, password
      FROM users
      WHERE email = ${email}
      LIMIT 1
    `;

    if (rows.length === 0) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Email não encontrado." })
      };
    }

    const user = rows[0];

    if (user.password !== password) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Password incorreta." })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Login efetuado com sucesso!",
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email
        }
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
