import Link from "next/link";

function ResidenceCard({ residence }) {
  return (
    <Link
      className="bg-[#95B6BF] rounded-lg border-gray-800 mb-3 hover:bg-[#869EA6] hover:cursor-pointer"
      href={`/residences/${residence.id}`}
    >
      <div
        className="pt-4 flex items-center justify-center"
        style={{ width: "100%", height: "200px" }} 
      >
        {residence.image && (
          <img
            src={residence.image}
            className="object-cover items-center h-full rounded-lg"
          />
        )}
      </div>
      
      <div className="p-4">

        <h3 className="text-xl"><strong>Nombre del Hogar: </strong>{residence.name}</h3>

        <h4 className="text-xl"><strong>Comuna: </strong>{residence.comuna}</h4>

        <h4 className="text-xl"><strong>Direccion: </strong>{residence.direccion}</h4>

        <h4 className="text-xl"><strong>Teléfono: </strong>{residence.telefono}</h4>

      </div>
    </Link>
  );
}

export default ResidenceCard;
