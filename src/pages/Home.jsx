import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.hero}>
      <div style={styles.card}>
        <h1 style={styles.title}>Auth Simples</h1>
        <p style={styles.subtitle}>
          Sistema de autenticação moderno com React + Netlify + NeonDB
        </p>

        <div style={styles.buttons}>
          <Link to="/login" style={styles.btnPrimary}>Entrar</Link>
          <Link to="/register" style={styles.btnSecondary}>Criar Conta</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  hero: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #4c6ef5, #15aabf)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    background: "white",
    padding: "40px 50px",
    borderRadius: "16px",
    maxWidth: "450px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },
  title: {
    fontSize: "36px",
    marginBottom: "10px",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: "17px",
    color: "#555",
    marginBottom: "30px",
  },
  buttons: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  },
  btnPrimary: {
    padding: "12px 25px",
    background: "#4c6ef5",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
  },
  btnSecondary: {
    padding: "12px 25px",
    background: "#dee2e6",
    color: "#333",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
  }
};
