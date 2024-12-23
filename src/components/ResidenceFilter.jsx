import { useState, useEffect } from 'react';

function ResidenceFilter({ onChangeResidence }) {
  const residences = [
    "Arica", "Calama", "Chillán", "Concepción", "Copiapó", "Coquimbo",
    "Curicó", "Iquique", "La Serena", "Linares", "Los Ángeles", "Osorno",
    "Ovalle", "Puerto Montt", "Punta Arenas", "Quillota", "Rancagua",
    "San Antonio", "San Fernando", "Santiago", "Talca", "Talcahuano",
    "Temuco", "Valdivia", "Valparaíso", "Viña del Mar", "Villa Alemana"
  ];

  const [selectedResidence, setSelectedResidence] = useState('');

  const handleChange = (event) => {
    const residence = event.target.value;
    setSelectedResidence(residence);
    onChangeResidence(residence);
  };

  return (
    <div className="mb-4">
      <label htmlFor="hogar">Residencia del niño:</label>
      <select
        name="hogar"
        onChange={handleChange}
        value={selectedResidence}
        className="shadow appearance-none border rounded w-full py-2 px-3"
      >
        <option value="" disabled>Selecciona una opción</option>
        {residences.map(residence => (
          <option key={residence} value={residence}>{residence}</option>
        ))}
      </select>
    </div>
  );
}

export default ResidenceFilter;
