"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import ResidenceSelect from "./ResidenceSelect";

function ProductForm() {
  const [children, setChildren] = useState({
    name: "",
    resId: "",
    description: "",
    comuna: "",
    birthdate: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [residences, setResidences] = useState([]);
  const formRef = useRef(null);
  const router = useRouter();
  const { id } = useParams();

  // Cargar residencias
  useEffect(() => {
    axios
      .get("/api/residences")
      .then((res) => setResidences(res.data))
      .catch((error) => console.error("Error fetching residences:", error));
  }, []);

  // Cargar datos del niño para editar
  useEffect(() => {
    if (id) {
      axios
        .get(`/api/products/${id}`)
        .then((res) => {
          const { name, resId, description, comuna, birthdate, image } = res.data;
          setChildren({ name, resId, description, comuna, birthdate, image });
        })
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    setChildren({
      ...children,
      [e.target.name]: e.target.value,
    });
  };

  const handleResSelect = (resId) => {
    setChildren({
      ...children,
      resId,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!children.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!children.description.trim()) newErrors.description = "La descripción es obligatoria.";
    if (!children.birthdate) newErrors.birthdate = "La fecha de nacimiento es obligatoria.";
    if (!children.comuna) newErrors.comuna = "La Comuna es obligatoria.";
    if (!file && !id) newErrors.file = "La foto del niño es obligatoria.";
    if (!children.resId) newErrors.resId = "La residencia es obligatoria.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", children.name);
    formData.append("resId", children.resId);
    formData.append("description", children.description);
    formData.append("comuna", children.comuna);
    formData.append("birthdate", children.birthdate);

    // Si hay un archivo nuevo, se adjunta; de lo contrario, se mantiene la imagen existente
    if (file) {
      formData.append("image", file);
    } else if (children.image) {
      // Si no se seleccionó un nuevo archivo, envia la imagen existente
      formData.append("image", children.image);
    }

    try {
      if (id) {
        await axios.put(`/api/products/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("/api/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      formRef.current.reset();
      router.push("/childrens");
    } catch (error) {
      console.error("Error submitting form:", error.message);
      setErrors({ global: "Hubo un problema al guardar el Perfil del Niño. Por favor, intenta de nuevo." });
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <form
        className="bg-[#95B6BF] shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        {errors.global && (
          <p className="text-red-500 text-sm font-bold mb-4">{errors.global}</p>
        )}
        <label htmlFor="name" className="block text-black text-sm font-bold mb-2">
          Nombre del niño:
        </label>
        <input
          name="name"
          type="text"
          onChange={handleChange}
          value={children.name}
          className={`shadow appearance-none border rounded w-full py-2 px-3 ${errors.name ? "border-red-500" : ""}`}
          autoFocus
        />
        {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}

        <label htmlFor="ResSelect" className="block text-black text-sm font-bold mt-3 mb-2">
          Residencia del niño:
        </label>
        <ResidenceSelect value={children.resId} onSelect={handleResSelect} />
        {errors.resId && <p className="text-red-500 text-xs italic">{errors.resId}</p>}

        <label htmlFor="comuna" className="block text-black text-sm font-bold mt-3 mb-2">
          Comuna:
        </label>
        <select
          name="comuna"
          value={children.comuna}
          onChange={handleChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 ${errors.comuna ? "border-red-500" : ""}`}
        >
          <option value="">Selecciona una comuna</option>
          <option value="Concepción">Concepción</option>
          <option value="Hualpén">Hualpén</option>
        </select>
        {errors.comuna && <p className="text-red-500 text-xs italic">{errors.comuna}</p>}

        <label htmlFor="birthdate" className="block text-black text-sm font-bold mt-3 mb-2">
          Fecha de nacimiento:
        </label>
        <input
          name="birthdate"
          type="date"
          onChange={handleChange}
          value={children.birthdate}
          className={`shadow appearance-none border rounded w-full py-2 px-3 ${errors.birthdate ? "border-red-500" : ""}`}
        />
        {errors.birthdate && <p className="text-red-500 text-xs italic">{errors.birthdate}</p>}

        <label htmlFor="description" className="block text-black text-sm font-bold mt-3 mb-2">
          Descripción del niño:
        </label>
        <textarea
          name="description"
          rows={3}
          onChange={handleChange}
          value={children.description}
          className={`shadow appearance-none border rounded w-full py-2 px-3 ${errors.description ? "border-red-500" : ""}`}
        />
        {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}

        <label htmlFor="productImage" className="block text-black text-sm font-bold mt-3 mb-2">
          Foto del niño:
        </label>
        <input
          type="file"
          className={`shadow appearance-none border rounded w-full py-2 px-3 ${errors.file ? "border-red-500" : ""}`}
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile && selectedFile instanceof File) {
              setFile(selectedFile);
              setErrors({ ...errors, file: "" });
            }
          }}
        />
        {errors.file && <p className="text-red-500 text-xs italic">{errors.file}</p>}

        {file ? (
          <img
            className="w-96 object-contain mx-auto my-4"
            src={URL.createObjectURL(file)}
            alt="Preview"
          />
        ) : (
          children.image && (
            <img
              className="w-96 object-contain mx-auto my-4"
              src={children.image}
              alt="Current Image"
            />
          )
        )}

        <button
          className="bg-[#447380] mt-4 text-white text-sm font-bold py-2 px-4 rounded-md"
          type="submit"
        >
          {id ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
