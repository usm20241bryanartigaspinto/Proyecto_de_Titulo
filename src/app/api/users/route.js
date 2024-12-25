import { NextResponse } from 'next/server';
import { conn } from "@/libs/mysql";

export async function GET() {
  try {
      const results = await conn.query("SELECT * FROM `user`");
      return NextResponse.json(results);
  } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      return NextResponse.json(
          { message: `Error al obtener usuarios: ${error.message}` },
          { status: 500 }
      );
  }
}

export async function GETRol() {
  try {
      const results = await conn.query("SELECT * FROM `rol`");
      return NextResponse.json(results);
  } catch (error) {
      console.error("Error al obtener los roles:", error);
      return NextResponse.json(
          { message: `Error al obtener roles: ${error.message}` },
          { status: 500 }
      );
  }
}