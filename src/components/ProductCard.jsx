import Link from "next/link";

function calculateAge(birthdate) {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

function ProductCard({ children }) {
  return (
    <Link
      className="bg-[#95B6BF] rounded-lg border-gray-800 mb-3 hover:bg-[#869EA6] hover:cursor-pointer"
      href={`/childrens/${children.id}`}
    >
      <div
        className="pt-4 flex items-center justify-center"
        style={{ width: "100%", height: "200px" }}
      >
        {children.image && (
          <img
            src={children.image}
            className="object-cover items-center h-full rounded-lg"
          />
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl"><strong>Nombre: </strong>{children.name}</h3>
        <h4 className="text-xl"><strong>Comuna: </strong>{children.comuna}</h4>
        <h4 className="text-xl">
          <strong>Edad: </strong>
          {children.birthdate ? `${calculateAge(children.birthdate)} años` : "No disponible"}
        </h4>
      </div>
    </Link>
  );
}

export default ProductCard;