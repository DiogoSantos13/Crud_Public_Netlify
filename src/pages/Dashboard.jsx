export default function Dashboard({ user, onLogout }) {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h2>Auth Simples</h2>
        <button onClick={onLogout} style={styles.logout}>Sair</button>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h3 style={styles.title}>Bem-vindo, {user.nome}</h3>

          <div style={styles.info}>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Conta criada em:</strong> {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f6fa",
  },
  header: {
    background: "#4c6ef5",
    padding: "15px 25px",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logout: {
    background: "#fa5252",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  main: {
    padding: "40px",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    width: "450px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "20px",
  },
  info: {
    lineHeight: "1.8",
    fontSize: "16px"
  }
};
