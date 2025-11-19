import { useState } from "react";
import { api } from "../api";

export default function Register() {
  const [name, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setSuccess("");

    try {
      await api.post("/register", { name, email, password });
      setSuccess("Conta criada com sucesso!");
      setNome("");
      setEmail("");
      setPassword("");
    } catch {
      setErro("Erro ao registar");
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Criar Conta</h2>

        {erro && <p style={styles.error}>{erro}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={e => setNome(e.target.value)}
            style={styles.input}
          />

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

          <button style={styles.btn}>Registar</button>
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
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
    fontSize: "24px"
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ced4da",
  },
  btn: {
    padding: "12px",
    background: "#15aabf",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
  error: { color: "red", textAlign: "center" },
  success: { color: "green", textAlign: "center" }
};
