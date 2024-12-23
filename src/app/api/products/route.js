import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import { unlink } from "fs/promises";
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
      SELECT children.*, residence.name AS hogar, residence.comuna 
      FROM children 
      LEFT JOIN residence ON children.resId = residence.id
    `);

    if (results.length === 0) {
      return NextResponse.json(
        { message: "No children found" },
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
        { message: "Name is required" },
        { status: 400 }
      );
    }

    if (!image) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

    if (!data.get("birthdate")) {
      return NextResponse.json(
        { message: "Birthdate is required" },
        { status: 400 }
      );
    }

    const resId = data.get("resId");
    if (!resId) {
      return NextResponse.json(
        { message: "Residence ID (resId) is required" },
        { status: 400 }
      );
    }

    const comuna = data.get("comuna");
    if (!comuna) {
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
    const result = await conn.query("INSERT INTO children SET ?", {
      name: data.get("name"),
      description: data.get("description"),
      birthdate: data.get("birthdate"),
      image: res.secure_url,
      resId: resId,
      comuna: data.get("comuna"),
    });

    return NextResponse.json({
      name: data.get("name"),
      description: data.get("description"),
      birthdate: data.get("birthdate"),
      comuna: data.get("comuna"),
      id: result.insertId,
      resId: resId,
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
    if (data.get("description")) updates.description = data.get("description");
    if (data.get("birthdate")) updates.birthdate = data.get("birthdate");
    if (data.get("resId")) updates.resId = data.get("resId");
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

    await conn.query("UPDATE children SET ? WHERE id = ?", [updates, id]);

    return NextResponse.json({ message: "Child updated successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
