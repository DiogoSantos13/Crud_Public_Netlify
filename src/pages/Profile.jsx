export default function Profile({ user, onLogout }) {
  if (!user) return null;

  return (
    <div>
      <h2>Dados do utilizador</h2>
      <p>Nome: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={onLogout}>Sair</button>
    </div>
  );
}
