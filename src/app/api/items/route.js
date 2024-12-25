import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import { unlink } from "fs/promises";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";

cloudinary.config({ 
  cloud_name: "dy1iyu66l", 
  api_key: "255846268365625", 
  api_secret: "VMraW8Xn_yJpO8H3GwtbwDd6_as"
});


export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM item");
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const image = data.get("image");

    if (!data.get("name")) {
      return NextResponse.json(
        {
          message: "Name is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!image) {
      return NextResponse.json(
        {
          message: "Image is required",
        },
        {
          status: 400,
        }
      );
    }

    const buffer = await processImage(image);

    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
          },
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

    const result = await conn.query("INSERT INTO item SET ?", {
      name: data.get("name"),
      cantidad: data.get("cantidad"),
      price: data.get("price"),
      image: res.secure_url,
      childId: data.get("childId"),
    });

    return NextResponse.json({
      name: data.get("name"),
      cantidad: data.get("cantidad"),
      price: data.get("price"),
      id: result.insertId,
      childId: data.get("childId"),
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
