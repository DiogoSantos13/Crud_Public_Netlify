import { useEffect, useState } from "react";
import { api } from "./api";

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("login");
  const [theme, setTheme] = useState("light");
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    tryRestoreSession();
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") setTheme(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
    document.body.style.background =
      theme === "dark" ? "#050816" : "linear-gradient(135deg,#4c6ef5,#15aabf)";
    document.body.style.color = theme === "dark" ? "#f8f9fa" : "#111827";
  }, [theme]);

  async function tryRestoreSession() {
    try {
      const res = await api.get("/getUser");
      const u = res.data.user || res.data;
      if (u) setUser(u);
    } catch {
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  }

  async function handleLogin({ email, password, setError }) {
    try {
      setError("");
      const res = await api.post("/login", { email, password });
      const u = res.data.user || res.data;

      if (!u) throw new Error("Erro inesperado no login.");

      setUser(u);
    } catch (err) {
      setError("Credenciais inválidas.");
    }
  }

  async function handleRegister({
    name,
    email,
    password,
    setError,
    setSuccess
  }) {
    try {
      setError("");
      setSuccess("");

      await api.post("/register", { name, email, password });
      setSuccess("Conta criada com sucesso. Podes entrar agora!");

      setActiveTab("login");
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Erro no registo.";
      setError(msg);
    }
  }

  function handleLogout() {
    setUser(null);
  }

  if (loadingUser) {
    return (
      <div style={styles.centerFull}>
        <div style={styles.loader} />
      </div>
    );
  }

  if (!user) {
    return (
      <AuthLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogin={handleLogin}
        onRegister={handleRegister}
        theme={theme}
        toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
    );
  }

  return (
    <DashboardLayout
      user={user}
      onLogout={handleLogout}
      theme={theme}
      toggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
    />
  );
}

/* --------------------
   LOGIN / REGISTO
----------------------*/

function AuthLayout({
  activeTab,
  setActiveTab,
  onLogin,
  onRegister,
  theme,
  toggleTheme
}) {
  const isDark = theme === "dark";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          display: "flex",
          maxWidth: "1000px",
          width: "100%",
          background: isDark ? "#0b1020" : "white",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: isDark
            ? "0 20px 50px rgba(0,0,0,0.7)"
            : "0 20px 50px rgba(15,23,42,0.3)"
        }}
      >
        {/* LADO ESQUERDO */}
        <div
          style={{
            flex: 1.2,
            padding: "40px",
            background:
              "radial-gradient(circle at top left, #4c6ef5, #1e293b)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div>
            <h1 style={{ fontSize: "34px", marginBottom: "10px" }}>
              Auth avançado 🚀
            </h1>
            <p style={{ maxWidth: "340px", opacity: 0.9 }}>
              Sistema moderno com React + Netlify Functions + Postgres (Neon).
            </p>
          </div>

          <button
            onClick={toggleTheme}
            style={{
              border: "none",
              borderRadius: "999px",
              padding: "8px 14px",
              background: "rgba(0,0,0,0.3)",
              color: "white",
              cursor: "pointer",
              fontSize: "13px"
            }}
          >
            {isDark ? "Modo claro" : "Modo escuro"}
          </button>
        </div>

        {/* ÁREA DE FORM */}
        <div style={{ flex: 1, padding: "32px" }}>
          <div style={styles.tabs}>
            <button
              onClick={() => setActiveTab("login")}
              style={{
                ...styles.tabBtn,
                ...(activeTab === "login" ? styles.tabBtnActive : {})
              }}
            >
              Entrar
            </button>
            <button
              onClick={() => setActiveTab("register")}
              style={{
                ...styles.tabBtn,
                ...(activeTab === "register" ? styles.tabBtnActive : {})
              }}
            >
              Criar conta
            </button>
          </div>

          {activeTab === "login" ? (
            <LoginForm onLogin={onLogin} />
          ) : (
            <RegisterForm onRegister={onRegister} />
          )}
        </div>
      </div>
    </div>
  );
}

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onLogin({ email, password, setError: setErro });
      }}
      style={styles.form}
    >
      <h2>Entrar</h2>

      {erro && <p style={styles.error}>{erro}</p>}

      <input
        type="email"
        placeholder="Email"
        style={styles.input}
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        style={styles.input}
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit" style={styles.primaryBtn}>
        Entrar
      </button>
    </form>
  );
}

function RegisterForm({ onRegister }) {
  const [name, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onRegister({
          name,
          email,
          password,
          setError: setErro,
          setSuccess
        });
      }}
      style={styles.form}
    >
      <h2>Criar conta</h2>

      {erro && <p style={styles.error}>{erro}</p>}
      {success && <p style={styles.success}>{success}</p>}

      <input
        type="text"
        placeholder="Nome"
        style={styles.input}
        value={name}
        onChange={e => setNome(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        style={styles.input}
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        style={styles.input}
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit" style={styles.primaryBtn}>
        Registar
      </button>
    </form>
  );
}

/* --------------------
   DASHBOARD
----------------------*/

function DashboardLayout({ user, onLogout, theme, toggleTheme }) {
  const isDark = theme === "dark";
  const [page, setPage] = useState("overview");

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: isDark ? "#0b1020" : "#f0f4ff",
        color: isDark ? "#f8f9fa" : "#1e293b",
        transition: "0.3s"
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          width: "240px",
          background: isDark ? "#11172b" : "white",
          padding: "30px 20px",
          boxShadow: "4px 0 20px rgba(0,0,0,0.1)"
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>Painel</h2>

        <SidebarItem
          active={page === "overview"}
          onClick={() => setPage("overview")}
        >
          📊 Overview
        </SidebarItem>

        <SidebarItem
          active={page === "profile"}
          onClick={() => setPage("profile")}
        >
          👤 Perfil
        </SidebarItem>

        <SidebarItem
          active={page === "users"}
          onClick={() => setPage("users")}
        >
          🧑‍🤝‍🧑 Utilizadores
        </SidebarItem>

        <div style={{ marginTop: "40px" }}>
          <button
            onClick={toggleTheme}
            style={{
              ...styles.secondaryBtn,
              width: "100%",
              marginBottom: "10px"
            }}
          >
            {isDark ? "🌞 Claro" : "🌙 Escuro"}
          </button>

          <button
            onClick={onLogout}
            style={{
              ...styles.secondaryBtn,
              background: "#e03131",
              color: "white",
              width: "100%"
            }}
          >
            🚪 Sair
          </button>
        </div>
      </aside>

      {/* CONTEÚDO */}
      <main style={{ flex: 1, padding: "40px" }}>
        {page === "overview" && <OverviewPage user={user} />}
        {page === "profile" && <ProfilePage user={user} />}
        {page === "users" && <UsersPage />}
      </main>
    </div>
  );
}

function SidebarItem({ active, onClick, children }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "12px 16px",
        borderRadius: "8px",
        marginBottom: "10px",
        cursor: "pointer",
        background: active ? "#4c6ef5" : "transparent",
        color: active ? "white" : "inherit",
        transition: "0.2s"
      }}
    >
      {children}
    </div>
  );
}

/* --------------------
   PÁGINAS DO DASHBOARD
----------------------*/

function OverviewPage({ user }) {
  return (
    <div>
      <h1>Bem-vindo, {user.nome} 👋</h1>
      <p style={{ opacity: 0.8, marginTop: "10px" }}>
        Aqui está uma visão geral da tua conta.
      </p>

      <div style={styles.cardGrid}>
        <DashboardCard title="Email" value={user.email} icon="✉️" />
        <DashboardCard
          title="Conta criada em"
          value={new Date(user.created_at).toLocaleString()}
          icon="📅"
        />
        <DashboardCard title="Status" value="Ativo" icon="✅" />
      </div>
    </div>
  );
}

function ProfilePage({ user }) {
  return (
    <div>
      <h1>O teu perfil</h1>

      <div style={{ marginTop: "30px", ...styles.card }}>
        <p><strong>Nome:</strong> {user.nome}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>ID:</strong> {user.id}</p>
      </div>
    </div>
  );
}

function UsersPage() {
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    try {
      const res = await api.get("/listUsers");
      setUsers(res.data.users || []);
    } catch {
      console.error("Erro a carregar utilizadores");
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h1>Lista de utilizadores</h1>

      <div style={{ marginTop: "20px", ...styles.card }}>
        {users.length === 0 && <p>Nenhum utilizador encontrado.</p>}

        {users.map(u => (
          <p key={u.id}>
            <strong>{u.nome}</strong> — {u.email}
          </p>
        ))}
      </div>
    </div>
  );
}

/* --------------------
   COMPONENTE CARD
----------------------*/

function DashboardCard({ title, value, icon }) {
  return (
    <div style={styles.card}>
      <h3>{icon} {title}</h3>
      <p style={{ fontSize: "18px", marginTop: "5px" }}>{value}</p>
    </div>
  );
}
/* --------------------
   ESTILOS GLOBAIS
----------------------*/

const styles = {
  centerFull: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  loader: {
    width: "45px",
    height: "45px",
    border: "5px solid #ccc",
    borderTop: "5px solid #4c6ef5",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  },
  tabs: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },
  tabBtn: {
    flex: 1,
    padding: "12px",
    cursor: "pointer",
    border: "none",
    background: "#e9ecef",
    borderRadius: "8px",
    marginRight: "4px",
    fontWeight: "600"
  },
  tabBtnActive: {
    background: "#4c6ef5",
    color: "white"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px"
  },
  primaryBtn: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#4c6ef5",
    color: "white",
    cursor: "pointer",
    fontWeight: "600"
  },
  secondaryBtn: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#adb5bd",
    fontWeight: "600"
  },
  error: {
    color: "#e03131",
    fontSize: "14px"
  },
  success: {
    color: "#2f9e44",
    fontSize: "14px"
  },
  card: {
    padding: "20px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    marginBottom: "20px"
  },
  cardGrid: {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
    gap: "20px"
  }
};
