import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  saveWebsite,
  updateWebsite,
  getWebsite,
  uploadImage,
} from "../firebase/api";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  url: "",
  name: "",
  description: "",
  image: null, // Archivo seleccionado
};

export const WebsiteForm = () => {
  const [website, setWebsite] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(""); // Previsualización de la imagen
  const params = useParams();
  const navigate = useNavigate();
  

  // Manejo de los campos del formulario
  const handleInputChange = ({ target: { name, value } }) =>
    setWebsite({ ...website, [name]: value });

  // Manejo de archivo de imagen
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setWebsite({ ...website, image: file });
      setImagePreview(URL.createObjectURL(file)); // Previsualizar la imagen
    } else {
      toast("Por favor selecciona un archivo de imagen válido", { type: "warning" });
    }
  };

  // Validación de URL
  const validURL = (str) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(str);
  };

  // Cargar datos si estamos en modo de edición
  const loadWebsite = async () => {
    try {
      const doc = await getWebsite(params.id);
      if (doc.exists()) {
        setWebsite(doc.data());
        if (doc.data().image) {
          setImagePreview(doc.data().image); // Mostrar imagen existente
        }
      } else {
        toast("No se encontraron datos", { type: "warning" });
      }
    } catch (error) {
      console.error("Error al cargar el website:", error);
      toast("Error al cargar los datos", { type: "error" });
    }
  };

  useEffect(() => {
    if (params.id) {
      loadWebsite();
    }
  }, [params.id]);

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Evitar doble envío
    setIsSubmitting(true);

    if (!validURL(website.url)) {
      setIsSubmitting(false);
      return toast("URL inválida", { type: "warning", autoClose: 1000 });
    }

    try {
      let imageUrl = website.image;

      // Subir la imagen si se seleccionó un archivo
      if (website.image instanceof File) {
        imageUrl = await uploadImage(website.image);
      }

      const dataToSave = {
        ...website,
        image: imageUrl || null, // URL de la imagen o null si no hay
      };

      if (!params.id) {
        await saveWebsite(dataToSave);
        toast("Nuevo enlace agregado", { type: "success" });
      } else {
        await updateWebsite(params.id, dataToSave);
        toast("Enlace actualizado", { type: "success" });
      }

      setWebsite(initialState);
      setImagePreview("");
      navigate("/");
    } catch (error) {
      console.error("Error al guardar o actualizar:", error);
      toast("Ocurrió un error", { type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="col-md-4 offset-md-4">
      <form onSubmit={handleSubmit} className="card card-body bg-secondary">
        {/* Subida de Imagen */}
        <label htmlFor="image">Seleccionar imagen:</label>
        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={handleFileChange}
        />
        {/* Previsualización de la imagen */}
        {imagePreview && (
          <div className="mb-3 text-center">
            <img
              src={imagePreview}
              alt="Previsualización"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
            />
          </div>
        )}

        {/* Campo URL */}
        <label htmlFor="url">Pegue su URL:</label>
        <div className="input-group mb-3">
          <div className="input-group-text bg-dark">
            <i className="material-icons">insert_link</i>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="https://example.com"
            value={website.url}
            name="url"
            onChange={handleInputChange}
          />
        </div>

        {/* Campo Nombre */}
        <label htmlFor="name">Nombre del sitio web:</label>
        <div className="input-group">
          <div className="input-group-text bg-dark">
            <i className="material-icons">create</i>
          </div>
          <input
            type="text"
            value={website.name}
            name="name"
            placeholder="Nombre del sitio web"
            className="form-control mb-3"
            onChange={handleInputChange}
          />
        </div>

        {/* Campo Descripción */}
        <label htmlFor="description">Escriba una descripción:</label>
        <textarea
          rows="3"
          className="form-control mb-3"
          placeholder="Escriba una descripción"
          name="description"
          value={website.description}
          onChange={handleInputChange}
        ></textarea>

        {/* Botón de Enviar */}
        <button
          className="btn btn-primary btn-block"
          disabled={!website.url || !website.name || isSubmitting}
        >
          {params.id ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </div>
  );
};
