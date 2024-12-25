import { NextResponse } from 'next/server';
import { conn } from "@/libs/mysql";

export async function PUT(request, { params }) {
  const { id } = params;
  const { username, email, rol } = await request.json();

  if (!username || !email || !rol) {
    return NextResponse.json(
      { message: 'Faltan datos necesarios para actualizar el usuario.' },
      { status: 400 }
    );
  }

  try {
    const result = await conn.query(
      "UPDATE `user` SET username = ?, email = ?, rol = ? WHERE id = ?",
      [username, email, rol, id]
    );

    return NextResponse.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return NextResponse.json(
      { message: `Error al actualizar el usuario: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    const result = await conn.query("DELETE FROM user WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return NextResponse.json({ message: `Error al eliminar el usuario: ${error.message}` }, { status: 500 });
  }
}