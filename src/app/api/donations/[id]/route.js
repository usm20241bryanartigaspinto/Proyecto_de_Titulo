import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";


export async function GET(request, { params }) {
  try {
    const result = await conn.query("SELECT * FROM donacion WHERE id = ?", [
      params.id,
    ]);

    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "Residencia no encontrada",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const result = await conn.query("DELETE FROM residence WHERE id = ?", [
      params.id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Residencia no encontrada",
        },
        {
          status: 404,
        }
      );
    }

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.formData();
    const image = data.get("image");
    const updateData = {
      name: data.get("name"),
      direccion: data.get("direccion"),
      telefono: data.get("telefono"),
      comuna: data.get("comuna"),
    };

    if (!updateData.name || !updateData.direccion || !updateData.telefono || !updateData.comuna) {
      return NextResponse.json(
        {
          message: "Todos los campos son obligatorios",
        },
        {
          status: 400,
        }
      );
    }

    const result = await conn.query("UPDATE residence SET ? WHERE id = ?", [
      updateData,
      params.id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Residencia no encontrada",
        },
        {
          status: 404,
        }
      );
    }

    const updatedResidence = await conn.query("SELECT * FROM residence WHERE id = ?", [
      params.id,
    ]);


    return NextResponse.json(updatedResidence[0]);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error interno del servidor",
      },
      { status: 500 }
    );
  }
}
