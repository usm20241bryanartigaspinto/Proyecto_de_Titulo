"use client";
import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function ResidenceForm() {
  const [residence, setResidence] = useState({
    name: "",
    direccion: "",
    telefono: "",
    comuna: "",
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "telefono") {
      const normalizedPhone = value.replace(/[^\d+]/g, ""); // Eliminar todo excepto dígitos y el signo "+"
      setResidence({
        ...residence,
        [name]: normalizedPhone,
      });
    } else {
      setResidence({
        ...residence,
        [name]: value,
      });
    }

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!residence.name.trim()) newErrors.name = "El nombre del hogar es obligatorio.";
    if (!residence.direccion.trim()) newErrors.direccion = "La dirección es obligatoria.";
    if (!residence.telefono.trim()) newErrors.telefono = "El número telefónico es obligatorio.";

    // Validación del número telefónico: debe empezar con +56 y tener entre 9 y 10 dígitos después
    const phoneRegex = /^\+56\d{9,10}$/;
    if (residence.telefono && !phoneRegex.test(residence.telefono)) {
      newErrors.telefono = "El número telefónico no tiene el formato válido.";
    }

    if (!residence.comuna.trim()) newErrors.comuna = "La comuna es obligatoria.";
    if (!file) newErrors.file = "La imagen del hogar es obligatoria.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", residence.name);
    formData.append("direccion", residence.direccion);
    formData.append("telefono", residence.telefono);
    formData.append("comuna", residence.comuna);
    formData.append("image", file);

    try {
      await axios.post("/api/residences", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Hogar creado exitosamente");
      formRef.current.reset();
      router.push("/residences");
    } catch (error) {
      console.error("Error al crear el hogar:", error.message);
      setErrors({ global: "Hubo un problema al crear el hogar. Por favor, intenta de nuevo." });
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <form
        className="bg-[#95B6BF] shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        {/* Mensaje de error global */}
        {errors.global && (
          <p className="text-red-500 text-sm font-bold mb-4">{errors.global}</p>
        )}

        {/* Campo Nombre */}
        <label htmlFor="name" className="block text-black text-sm font-bold mb-2">
          Nombre del hogar:
        </label>
        <input
          name="name"
          type="text"
          placeholder="Nombre del hogar"
          onChange={handleChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}

        {/* Campo Dirección */}
        <label htmlFor="direccion" className="block text-black text-sm font-bold mt-3 mb-2">
          Dirección del hogar:
        </label>
        <input
          name="direccion"
          type="text"
          placeholder="Dirección completa"
          onChange={handleChange}
          className={`shadow appearance-none border rounded w-full py-2 px-3 ${errors.direccion ? "border-red-500" : ""}`}
        />
        {errors.direccion && <p className="text-red-500 text-xs italic">{errors.direccion}</p>}

        {/* Campo Teléfono */}
        <label htmlFor="telefono" className="block text-black text-sm font-bold mt-3 mb-2">
          Número Telefónico:
        </label>
        <input
          name="telefono"
          type="text"
          placeholder="Teléfono"
          onChange={handleChange}
          value={residence.telefono}
          className={`shadow appearance-none border rounded w-full py-2 px-3 ${errors.telefono ? "border-red-500" : ""}`}
        />
        {errors.telefono && <p className="text-red-500 text-xs italic">{errors.telefono}</p>}

        {/* Campo Comuna */}
        <label htmlFor="comuna" className="block text-black text-sm font-bold mt-3 mb-2">
          Comuna:
        </label>
        <select
          name="comuna"
          onChange={handleChange}
          value={residence.comuna}
          className={`shadow appearance-none border rounded w-full py-2 px-3 ${errors.comuna ? "border-red-500" : ""}`}
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          <option value="Concepción">Concepción</option>
          <option value="Chillán">Hualpén</option>
        </select>

        {errors.comuna && <p className="text-red-500 text-xs italic">{errors.comuna}</p>}

        {/* Campo Imagen */}
        <label htmlFor="residenceImage" className="block text-black text-sm font-bold mt-3 mb-2">
          Imagen del hogar:
        </label>
        <input
          type="file"
          className={`shadow appearance-none border rounded w-full py-2 px-3 ${errors.file ? "border-red-500" : ""}`}
          onChange={(e) => {
            setFile(e.target.files[0]);
            setErrors({ ...errors, file: "" });
          }}
        />
        {errors.file && <p className="text-red-500 text-xs italic">{errors.file}</p>}

        {file && (
          <img
            className="w-96 object-contain mx-auto my-4"
            src={URL.createObjectURL(file)}
            alt="Preview"
          />
        )}

        {/* Botón de envío */}
        <button
          className="bg-[#447380] mt-7 hover:bg-[#869EA6] text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Crear Hogar
        </button>
      </form>
    </div>
  );
}

export default ResidenceForm;
