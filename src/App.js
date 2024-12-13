import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
        <Route
          path="/login"
          element={<LoginForm onLoginSuccess={handleLogin} />}
        />
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
        <Route
          path="/public"
          element={<WebsiteList isAuthenticated={false} />}
        />
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
