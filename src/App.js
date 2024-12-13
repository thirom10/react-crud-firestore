import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { WebsiteList } from "./components/WebsiteList";
import { LoginForm } from "./components/LoginForm";
import { WebsiteForm } from "./components/WebsiteForm";
import { Dashboard } from "./components/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <Router>
      <Routes>
        {/* Ruta principal: Si está autenticado, redirige al dashboard */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <WebsiteList isAuthenticated={false} />
            )
          }
        />

        {/* Dashboard para administradores */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={<LoginForm onLoginSuccess={handleLogin} />}
        />

        {/* Formulario para agregar y editar */}
        <Route
          path="add"
          element={
            isAuthenticated ? (
              <WebsiteForm />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="edit/:id"
          element={
            isAuthenticated ? (
              <WebsiteForm />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Vista pública para administradores */}
        <Route
          path="/public"
          element={<WebsiteList isAuthenticated={false} />}
        />

        {/* Página no encontrada */}
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
