import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";

cloudinary.config({
  cloud_name: "dy1iyu66l",
  api_key: "255846268365625",
  api_secret: "VMraW8Xn_yJpO8H3GwtbwDd6_as",
});

export async function GET() {
  try {
    const results = await conn.query(`
      SELECT * FROM residence
    `);

    if (results.length === 0) {
      return NextResponse.json(
        { message: "No residences found" },
        { status: 404 }
      );
    }

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const image = data.get("image");

    // Validaciones
    if (!data.get("name")) {
      return NextResponse.json(
        { message: "Residence name is required" },
        { status: 400 }
      );
    }

    if (!data.get("direccion")) {
      return NextResponse.json(
        { message: "Address is required" },
        { status: 400 }
      );
    }

    if (!data.get("telefono")) {
      return NextResponse.json(
        { message: "Phone number is required" },
        { status: 400 }
      );
    }

    const telefono = data.get("telefono");
    // Validación de teléfono: debe empezar con +56 y tener entre 9 y 10 dígitos
    const phoneRegex = /^\+56\d{9,10}$/;
    if (!phoneRegex.test(telefono)) {
      return NextResponse.json(
        { message: "Invalid phone number format" },
        { status: 400 }
      );
    }

    if (!data.get("comuna")) {
      return NextResponse.json(
        { message: "Comuna is required" },
        { status: 400 }
      );
    }

    // Procesar imagen
    const buffer = await processImage(image);

    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image" },
          async (err, result) => {
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve(result);
          }
        )
        .end(buffer);
    });

    // Insertar en la base de datos
    const result = await conn.query("INSERT INTO residence SET ?", {
      name: data.get("name"),
      direccion: data.get("direccion"),
      telefono: telefono,
      comuna: data.get("comuna"),
      image: res.secure_url,
    });

    return NextResponse.json({
      name: data.get("name"),
      direccion: data.get("direccion"),
      telefono: telefono,
      comuna: data.get("comuna"),
      image: res.secure_url,
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const data = await request.formData();
    const id = data.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "ID is required for updating" },
        { status: 400 }
      );
    }

    const updates = {};
    if (data.get("name")) updates.name = data.get("name");
    if (data.get("direccion")) updates.direccion = data.get("direccion");
    if (data.get("telefono")) updates.telefono = data.get("telefono");
    if (data.get("comuna")) updates.comuna = data.get("comuna");

    if (data.get("image")) {
      const image = data.get("image");
      const buffer = await processImage(image);

      const res = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "image" },
            async (err, result) => {
              if (err) {
                console.log(err);
                reject(err);
              }
              resolve(result);
            }
          )
          .end(buffer);
      });

      updates.image = res.secure_url;
    }

    await conn.query("UPDATE residence SET ? WHERE id = ?", [updates, id]);

    return NextResponse.json({ message: "Residence updated successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}