import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user_id");

  try {
    const [rows] = await conn.query(
      "SELECT * FROM donacion WHERE user_id = ? ORDER BY dona_fecha_hora DESC",
      [userId]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json({ message: "No se encontraron donaciones." }, { status: 404 });
    }

    // Mapea los resultados de la consulta para incluir los datos relevantes
    const donations = rows.map((row) => ({
      dona_monto: row.dona_monto,
      dona_mensaje: row.dona_mensaje,
      dona_name: row.dona_name,
      dona_metodo: row.dona_metodo,
      dona_fecha_hora: row.dona_fecha_hora,
      child_id: row.child_id,
    }));

    return NextResponse.json(donations);
  } catch (error) {
    console.error("Error al obtener el historial de donaciones:", error);
    return NextResponse.json(
      { message: "Error al obtener el historial de donaciones." },
      { status: 500 }
    );
  }
}
