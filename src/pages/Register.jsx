import { useState } from "react";
import { api } from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem("");
    setErro("");
    try {
      await api.post("/register", { name, email, password });
      setMensagem("Utilizador registado com sucesso. Já podes fazer login.");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setErro(err.response?.data?.error || "Erro no registo");
    }
  }

  return (
    <div>
      <h2>Registar</h2>
      {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Registar</button>
      </form>
    </div>
  );
}
