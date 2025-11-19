const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async event => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { email, password } = JSON.parse(event.body);

    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Campos em falta" })
      };
    }

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email ou password inválidos" })
      };
    }

    const valid = await bcrypt.compare(password, data.password_hash);
    if (!valid) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email ou password inválidos" })
      };
    }

    const user = { id: data.id, name: data.name, email: data.email };

    return {
      statusCode: 200,
      body: JSON.stringify({ user })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro no servidor" })
    };
  }
};
