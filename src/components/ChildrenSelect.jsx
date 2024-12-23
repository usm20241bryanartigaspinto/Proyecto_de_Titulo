import { useState, useEffect } from "react";
import axios from "axios";

function ChildrenSelect({ onSelect }) {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    async function fetchChildren() {
      try {
        const response = await axios.get('/api/products');
        setChildren(response.data);
      } catch (error) {
        console.error("Error fetching children:", error);
      }
    }

    fetchChildren();
  }, []);

  return (
    <select onChange={(e) => onSelect(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3">
      <option value="">Selecciona un niño</option>
      {children.map(child => (
        <option key={child.id} value={child.id}>
          {child.name}
        </option>
      ))}
    </select>
  );
}

export default ChildrenSelect;
