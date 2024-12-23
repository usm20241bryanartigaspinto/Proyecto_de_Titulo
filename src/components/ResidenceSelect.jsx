import { useState, useEffect } from "react";
import axios from "axios";

function ResidenceSelect({ value, onSelect }) {
  const [residence, setResidence] = useState([]);

  useEffect(() => {
    async function fetchResidence() {
      try {
        const response = await axios.get('/api/residences');
        setResidence(response.data);
      } catch (error) {
        console.error("Error fetching residence:", error);
      }
    }

    fetchResidence();
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onSelect(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3"
    >
      <option value="">Selecciona una Residencia</option>
      {residence.map((res) => (
        <option key={res.id} value={res.id}>
          {res.name}
        </option>
      ))}
    </select>
  );
}

export default ResidenceSelect;
