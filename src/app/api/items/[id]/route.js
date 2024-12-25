import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import cloudinary from "@/libs/cloudinary";
import { processImage } from "@/libs/processImage";

cloudinary.config({ 
  cloud_name: "dy1iyu66l", 
  api_key: "255846268365625", 
  api_secret: "VMraW8Xn_yJpO8H3GwtbwDd6_as"
});

export async function GET(request, { params }) {
  try {
    const result = await conn.query("SELECT * FROM item WHERE id = ?", [
      params.id,
    ]);

    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "Item no encontrado",
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
    const result = await conn.query("DELETE FROM item WHERE id = ?", [
      params.id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Item no encontrado",
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
      price: data.get("price"),
      cantidad: data.get("cantidad"),
    };

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

    if (image) {
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

      updateData.image = res.secure_url;

      const result = await conn.query("UPDATE item SET ? WHERE id = ?", [
        updateData,
        params.id,
      ]);

      if (result.affectedRows === 0) {
        return NextResponse.json(
          {
            message: "Item no encontrado",
          },
          {
            status: 404,
          }
        );
      }

      const updatedProduct = await conn.query(
        "SELECT * FROM item WHERE id = ?",
        [params.id]
      );

      return NextResponse.json(updatedItem[0]);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
