"use client";

import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import ChildrenSelect from "./ChildrenSelect";

function ItemForm() {
  const [item, setItem] = useState({
    name: "",
    price: "",
    cantidad: "",
    status: "",
    childId: "",
  });
  const [file, setFile] = useState(null);
  const formRef = useRef(null);
  const router = useRouter();
  const { id } = useParams();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/items/${id}`)
        .then((res) => {
          const { name, price, cantidad, status, childId } = res.data;
          setItem({ name, price, cantidad, status, childId });
        })
        .catch((error) => {
          console.error("Error fetching item:", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleChildSelect = (childId) => {
    setItem({
      ...item,
      childId,
    });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!item.name) newErrors.name = "El nombre del artículo es obligatorio.";
    if (!item.price) newErrors.price = "El precio es obligatorio.";
    if (!item.cantidad) newErrors.cantidad = "La cantidad es obligatoria.";
    if (!item.childId) newErrors.childId = "Debes seleccionar un niño.";
    if (!file) newErrors.file = "Debes cargar una imagen del artículo.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const itemData = new FormData();
    itemData.append("name", item.name);
    itemData.append("price", item.price);
    itemData.append("cantidad", item.cantidad);
    itemData.append("status", "solicitado");
    itemData.append("childId", item.childId);
    itemData.append("image", file);

    try {
      let res;
      if (id) {
        res = await axios.put(`/api/items/${id}`, itemData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        res = await axios.post("/api/items", itemData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      console.log("Item guardado exitosamente");
      formRef.current.reset();
      router.push("/childrens");
    } catch (error) {
      console.error("Error submitting form:", error.message);
      setErrors({
        general: "Hubo un problema al guardar el item. Por favor, intenta de nuevo.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <form
        className="bg-[#95B6BF] shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <label
          htmlFor="name"
          className="block text-black text-sm font-bold mb-2"
        >
          Nombre del artículo:
        </label>
        <input
          name="name"
          type="text"
          placeholder="Nombre"
          onChange={handleChange}
          value={item.name}
          className="shadow appearance-none border rounded w-full py-2 px-3"
          autoFocus
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <label
          htmlFor="price"
          className="block text-black text-sm font-bold mt-3 mb-2"
        >
          Precio del artículo:
        </label>
        <input
          name="price"
          type="text"
          placeholder="$"
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/g, ""); // Solo números
            handleChange({
              target: { name: "price", value: parseInt(value, 10) || "" },
            });
          }}
          value={item.price}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

        <label
          htmlFor="cantidad"
          className="block text-black text-sm font-bold mt-3 mb-2"
        >
          Cantidad:
        </label>
        <input
          name="cantidad"
          type="number"
          placeholder="Cantidad"
          onChange={handleChange}
          value={item.cantidad}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />
        {errors.cantidad && (
          <p className="text-red-500 text-sm">{errors.cantidad}</p>
        )}

        <label
          htmlFor="childSelect"
          className="block text-black text-sm font-bold mt-3 mb-2"
        >
          Selecciona un niño:
        </label>
        <ChildrenSelect onSelect={handleChildSelect} />
        {errors.childId && <p className="text-red-500 text-sm">{errors.childId}</p>}

        <label
          htmlFor="productImage"
          className="block text-black text-sm font-bold mt-3 mb-2"
        >
          Imagen del artículo:
        </label>
        <input
          type="file"
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-2"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}

        {file && (
          <img
            className="w-96 object-contain mx-auto my-4"
            src={URL.createObjectURL(file)}
            alt="Vista previa de la imagen"
          />
        )}

        <button
          className="bg-[#447380] hover:bg-[#869EA6] text-white font-bold py-2 px-4 mt-3 rounded"
          type="submit"
        >
          {id ? "Actualizar Artículo" : "Crear Artículo"}
        </button>

        {errors.general && (
          <p className="text-red-500 text-sm mt-3">{errors.general}</p>
        )}
      </form>
    </div>
  );
}

export default ItemForm;
