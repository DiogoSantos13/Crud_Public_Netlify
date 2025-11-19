import { useEffect, useState } from "react";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  function handleLogin(u) {
    setUser(u);
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <div>
      <h1>Auth simples</h1>
      {user ? (
        <Profile user={user} onLogout={handleLogout} />
      ) : (
        <>
          <Login onLogin={handleLogin} />
          <hr />
          <Register />
        </>
      )}
    </div>
  );
}
