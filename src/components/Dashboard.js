import { useNavigate } from "react-router-dom";
import { WebsiteList } from "./WebsiteList";

export const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <h1 className="navbar-brand">
            Admin Dashboard
          </h1>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="container mt-4">
        <h2>Gestión de Productos</h2>
        <WebsiteList isAdmin={true} />
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate("/add")}
        >
          Agregar Producto
        </button>
      </div>
    </div>
  );
};
