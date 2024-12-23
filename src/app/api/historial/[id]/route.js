import { conn } from "@/libs/mysql";

export default async function handler(req, res) {
  const { user_id } = req.query; // Obtener user_id desde la query

  // Verifica que user_id está presente
  if (!user_id) {
    return res.status(400).json({ error: 'El ID del usuario es obligatorio.' });
  }

  try {
    const [donaciones] = await conn.query("SELECT * FROM donacion WHERE user_id = ?", [user_id]);

    // Verifica si no hay donaciones
    if (donaciones.length === 0) {
      return res.status(404).json({ message: 'No se encontraron donaciones para este usuario.' });
    }

    // Retorna las donaciones encontradas
    return res.status(200).json(donaciones);
  } catch (error) {
    console.error('Error al obtener las donaciones:', error);
    return res.status(500).json({ error: 'Hubo un error al cargar las donaciones.' });
  }
}
