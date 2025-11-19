import { useState } from "react";
import { api } from "../api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    try {
      const res = await api.post("/login", { email, password });
      onLogin(res.data.user);
    } catch (err) {
      setErro("Credenciais inválidas.");
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Entrar</h2>

        {erro && <p style={styles.error}>{erro}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
          />

          <button style={styles.btn}>Entrar</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f1f3f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    background: "white",
    padding: "35px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
  },
  title: {
    margin: 0,
    marginBottom: "20px",
    textAlign: "center",
    fontSize: "24px",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ced4da",
    fontSize: "15px",
  },
  btn: {
    padding: "12px",
    background: "#4c6ef5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  }
};
