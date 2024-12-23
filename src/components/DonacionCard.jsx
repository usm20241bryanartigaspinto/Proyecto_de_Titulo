const DonacionCard = ({ donacion }) => {
  return (
    <div className="donacion-card bg-white p-6 rounded-lg shadow-lg my-4 ">
      <h3 className="text-2xl font-semibold text-black mb-2">
        <strong>Donación de: </strong>{donacion.dona_name || "Anónimo"}
      </h3>
      <p className="text-lg text-black  mb-1">
        <strong>Monto: </strong>${donacion.dona_monto}
      </p>
      <p className="text-lg text-black  mb-1">
        <strong>Mensaje: </strong>{donacion.dona_mensaje || "Sin mensaje"}
      </p>
      <p className="text-lg text-black  mb-1">
        <strong>Método: </strong>{donacion.dona_metodo || "No especificado"}
      </p>
      <p className="text-lg text-black  mb-1">
        <strong>Fecha: </strong>{new Date(donacion.dona_fecha_hora).toLocaleDateString()}
      </p>
      <p className="text-lg text-black mb-1">
        <strong>Child ID: </strong>{donacion.child_id}
      </p>
      <p className="text-lg text-black mb-1">
        <strong>Estado Donación: </strong>{donacion.dona_estado}
      </p>
    </div>
  );
};

export default DonacionCard;
