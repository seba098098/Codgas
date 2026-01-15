// Orquesta toda la aplicación
import React from "react";
import { useAuth } from "./hooks/useAuth";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

export default function App() {
  const { user, setUser, login, logout, error } = useAuth();

  if (!user) return <Login onLogin={login} error={error} />;

  return <Dashboard user={user} setUser={setUser} logout={logout} />;
}
