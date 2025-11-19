import { neon } from "@neondatabase/serverless";

export async function handler(event) {
  try {
    if (event.httpMethod !== "GET") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Método não permitido" })
      };
    }

    const id = event.queryStringParameters.id;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "ID é obrigatório." })
      };
    }

    const sql = neon(process.env.NETLIFY_DATABASE_URL);

    const user = await sql`
      SELECT id, name, email FROM users WHERE id = ${id}
    `;

    if (user.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Utilizador não encontrado." })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(user[0])
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
