import { neon } from "@neondatabase/serverless";

export async function handler(event, context) {
  try {
    // Só permite POST
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Método não permitido" })
      };
    }

    // Receber JSON do fetch()
   const body = JSON.parse(event.body);
   const { nome, email, password } = body;

    if (!nome || !email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Campos incompletos." })
      };
    }

    const sql = neon(process.env.NETLIFY_DATABASE_URL);

    await sql`
      INSERT INTO users (nome, email, password)
      VALUES (${nome}, ${email}, ${password})
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Usuário registado!" })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
