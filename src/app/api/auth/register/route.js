import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/libs/db";

export async function POST(request) {
  try {
    const data = await request.json();

    // Verifica si el correo ya está registrado
    const userFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: "El correo ya está registrado",
        },
        {
          status: 400,
        }
      );
    }

    // Verifica si el nombre de usuario ya está registrado
    const usernameFound = await db.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (usernameFound) {
      return NextResponse.json(
        {
          message: "El usuario ya existe",
        },
        {
          status: 400,
        }
      );
    }

    // Si no hay errores, encripta la contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Crea un nuevo usuario
    const newUser = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        rol: "No Verificado",
      },
    });

    // Elimina la contraseña antes de devolver la respuesta
    const { password: _, ...user } = newUser;

    // Respuesta exitosa
    return NextResponse.json(user);
  } catch (error) {
    // Manejo de errores
    return NextResponse.json(
      {
        message: error.message || "Ocurrió un error inesperado",
      },
      {
        status: 500,
      }
    );
  }
}
