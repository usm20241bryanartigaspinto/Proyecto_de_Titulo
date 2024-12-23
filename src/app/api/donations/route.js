import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import nodemailer from "nodemailer";

// Función para enviar el correo de confirmación
const sendConfirmationEmail = async (donationDetails) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ayudalainfancia@gmail.com',
      pass: 'veuk dzrn bvwk dmot',
    },
  });

  const mailOptions = {
    from: 'ayudalainfancia@gmail.com',
    to: donationDetails.donorEmail, // Verifica que donorEmail tiene un valor válido
    subject: 'Confirmación de Donación',
    text: `
      ¡Gracias por tu donación! Aquí están los detalles:
      - Monto donado: $${donationDetails.amount}
      - Mensaje: ${donationDetails.message || "No se ha enviado un mensaje"}
      - Método de pago: ${donationDetails.paymentMethod}
      
      ¡Gracias por apoyar nuestra causa!
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo de confirmación enviado');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

// Función POST para crear una nueva donación
export async function POST(request) {
  try {
    const data = await request.formData();

    // Campos obligatorios
    const requiredFields = [
      "dona_monto",
      "user_id",
      "dona_mensaje",
      "dona_name",
      "dona_metodo",
      "child_id",
    ];

    // Validar que los campos necesarios estén presentes
    for (const field of requiredFields) {
      if (!data.get(field)) {
        return NextResponse.json(
          {
            message: `El campo ${field.replace("dona_", "").replace("_", " ")} es obligatorio.`,
          },
          {
            status: 400,
          }
        );
      }
    }

    // Insertar los datos de la donación en la base de datos
    const result = await conn.query(
      "INSERT INTO donacion (dona_monto, user_id, dona_mensaje, dona_name, dona_metodo, child_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        data.get("dona_monto"),
        data.get("user_id"),
        data.get("dona_mensaje"),
        data.get("dona_name"),
        data.get("dona_metodo"),
        data.get("child_id"),
      ]
    );

    const [user] = await conn.query("SELECT email FROM user WHERE id = ?", [
      data.get("user_id"),
    ]);

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado." },
        { status: 404 }
      );
    }

    // Obtener los detalles de la donación
    const donationDetails = {
      dona_id: result.insertId,
      amount: data.get("dona_monto"),
      donorEmail: user.email,
      message: data.get("dona_mensaje"),
      paymentMethod: data.get("dona_metodo"),
    };

    await sendConfirmationEmail(donationDetails);

    // Retornar la respuesta de éxito con los detalles de la donación
    return NextResponse.json({
      dona_id: result.insertId,
      dona_monto: data.get("dona_monto"),
      user_id: data.get("user_id"),
      dona_mensaje: data.get("dona_mensaje"),
      dona_name: data.get("dona_name"),
      dona_metodo: data.get("dona_metodo"),
      child_id: data.get("child_id"),
    });
  } catch (error) {
    console.error("Error al crear la donación:", error);
    return NextResponse.json(
      {
        message: "Error interno del servidor, por favor intente nuevamente.",
      },
      {
        status: 500,
      }
    );
  }
}
