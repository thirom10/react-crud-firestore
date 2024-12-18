import { useEffect, useState } from "react";
import { onGetLinks, deleteWebsite } from "../firebase/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const WebsiteList = () => {
  const [isAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [websites, setWebsites] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    const unsubscribe = onGetLinks((querySnapshot) => {
      const websitesArray = [];
      querySnapshot.forEach((doc) => {
        websitesArray.push({ id: doc.id, ...doc.data() });
      });
      setWebsites(websitesArray);
    });

    return () => unsubscribe();
  }, []);

  const onDeleteLink = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      await deleteWebsite(id);
      toast("Producto eliminado con éxito", {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container mt-5">
      <button onClick={()=>navigate(`/login`)}>Iniciar sesion</button>
      <h2>Lista de Productos</h2>
      <div className="row">
      {websites.map((website) => (
  <div className="col-md-4" key={website.id}>
    <div className="card mb-3 card-website">
      {website.image && (
        <img
          src={website.image}
          alt={website.name}
          className="card-img-top"
          style={{ maxHeight: "200px", objectFit: "cover" }}
        />
      )}
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h4>{website.name}</h4>
          {isAuthenticated && (
            <button
              className="btn btn-danger btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteLink(website.id);
              }}
            >
              <i className="material-icons">close</i>
            </button>
          )}
        </div>
        <p>{website.description}</p>
        <a href={website.url} target="_blank" rel="noopener noreferrer">
          Ir al sitio web
        </a>
        {isAuthenticated && (
          <button
            className="btn btn-primary ms-2"
            onClick={() => navigate(`/edit/${website.id}`)}
          >
            Editar
          </button>
        )}
      </div>
    </div>
  </div>
))}

      </div>
    </div>
  );
};
