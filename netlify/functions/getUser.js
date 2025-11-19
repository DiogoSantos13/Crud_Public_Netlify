import { neon } from "@neondatabase/serverless";

export default async (req, res) => {
  try {
    // Verifica se o utilizador enviou token no header
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token não fornecido." });
    }

    const token = auth.split(" ")[1];

    // Criar ligação à BD
    const sql = neon(process.env.DATABASE_URL);

    // Procurar utilizador com base no token
    const rows = await sql`
      SELECT id, nome, email
      FROM users
      WHERE token = ${token}
      LIMIT 1;
    `;

    if (!rows || rows.length === 0) {
      return res.status(401).json({ error: "Token inválido" });
    }

    // Utilizador encontrado
    return res.status(200).json(rows[0]);

  } catch (error) {
    return res.status(500).json({ error: "Erro interno", details: error });
  }
};
