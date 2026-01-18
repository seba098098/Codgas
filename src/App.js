// Orquesta toda la aplicación
import React from "react";
import { useAuth } from "./hooks/useAuth";
import Login from "./page/Login";
import Dashboard from "./page/Home/Home";

export default function App() {
  const { user, setUser, login, logout, error } = useAuth();

  if (!user) return <Login onLogin={login} error={error} />;

  return <Dashboard user={user} setUser={setUser} logout={logout} />;
}
