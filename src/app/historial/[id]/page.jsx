import { conn } from "@/libs/mysql";
import DonacionCard from "@/components/DonacionCard";

// Cargar las donaciones del usuario
async function loadDonacion(userId) {
  try {
    const [donaciones] = await conn.query("SELECT * FROM donacion WHERE user_id = ?", [
      userId,
    ]);
    console.log('Resultado de la consulta:', donaciones); // Verifica el resultado de la consulta

    // Asegurarse de que siempre se devuelvan las donaciones como un arreglo
    return Array.isArray(donaciones) ? donaciones : [donaciones]; // Si es un solo objeto, envolverlo en un arreglo
  } catch (error) {
    console.error('Error al cargar las donaciones:', error);
    return []; // Devolver un arreglo vacío en caso de error
  }
}

async function DonacionPage({ params }) {
  console.log('User ID:', params.id); // Verifica que el ID del usuario esté presente

  // Cargar las donaciones del usuario
  const donaciones = await loadDonacion(params.id);

  console.log('Donaciones:', donaciones);
  console.log('Es arreglo?', Array.isArray(donaciones)); // Verifica si 'donaciones' es un arreglo
  console.log('Longitud de donaciones:', donaciones.length); // Verifica la longitud de las donaciones

  // Si no se encuentran donaciones o el ID no es válido, muestra un mensaje
  if (!Array.isArray(donaciones) || donaciones.length === 0) {
    return (
      <section className="flex flex-col justify-start items-center pt-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Historial de Donaciones</h2>
        <p className="text-xl font-bold text-gray-700">No ha realizado donaciones aún.</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col justify-start items-center pt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Historial de Donaciones</h2>
      <div className="flex w-4/6 justify-center">
        <div className="flex w-full justify-center gap-4">
          {donaciones.map((donacion) => (
            <DonacionCard donacion={donacion} key={donacion.dona_id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DonacionPage;
