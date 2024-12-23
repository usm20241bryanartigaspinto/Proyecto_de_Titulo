"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DonacionCard from "@/components/DonacionCard";

// Función para cargar las donaciones del usuario
async function loadDonaciones(userId) {
  try {
    const response = await fetch(`/api/donations?user_id=${userId}`);

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      throw new Error('No se pudieron cargar las donaciones');
    }
    // Convertir la respuesta en JSON
    const data = await response.json();
    
    console.log('Donaciones cargadas desde el API:', data);
    
    // Retornar las donaciones (si hay alguna)
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error al cargar las donaciones:', error);
    return []; // Devolver vacío en caso de error
  }
}

function DonacionPage() {
  const [donaciones, setDonaciones] = useState([]); // Estado para almacenar las donaciones
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      // Si la sesión está disponible y tiene un ID de usuario
      const fetchDonaciones = async () => {
        const loadedDonaciones = await loadDonaciones(session.user.id);
        setDonaciones(loadedDonaciones);
      };

      fetchDonaciones();
    }
  }, [session?.user?.id]);

  console.log('Donaciones:', donaciones);
  console.log('Es arreglo?', Array.isArray(donaciones));
  console.log('Longitud de donaciones:', donaciones.length);

  return (
    <section className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <div className="flex w-4/6 justify-center">
        <div className="flex w-1/7 justify-center gap-4">
          {Array.isArray(donaciones) && donaciones.length > 0 ? (
            donaciones.map((donacion) => (
              <DonacionCard donacion={donacion} key={donacion.dona_id} />
            ))
          ) : (
            <p className="text-1xl font-bold text-justify">
              No ha realizado donaciones aún.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default DonacionPage;
