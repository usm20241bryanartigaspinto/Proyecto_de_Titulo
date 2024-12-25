import Buttons from "./Buttons";
import { conn } from "@/libs/mysql";
import ItemCard from "@/components/ItemCard";
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


async function loadChildren(childrenId) {
  const [data] = await conn.query("SELECT * FROM children WHERE id = ?", [
    childrenId,
  ]);
  return data;
}

async function loadItems(childId) {
  const items = await conn.query("SELECT * FROM item WHERE childId = ?", [
    childId,
  ]);
  return items;
}

async function loadResidence(residenceId) {
  const [data] = await conn.query("SELECT * FROM residence WHERE id = ?", [
    residenceId,
  ]);
  return data;
}

async function ProductPage({ params }) {
  const children = await loadChildren(params.id);
  const items = await loadItems(params.id);
  let residence = null;
  if (children && children.resId) {
    residence = await loadResidence(children.resId);
  }

  return (
    <section className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <div className="flex w-4/6 justify-center">
  <div
    className="p-6 w-1/3 bg-[#95B6BF] rounded-lg shadow-lg border">
      
<h3 className="text-1xl mb-4">
  <strong>Nombre: </strong>
  {children.name}
</h3>

<h4 className="text-1xl mb-4">
  <strong>Edad: </strong>
  {children.birthdate ? `${calculateAge(children.birthdate)} años` : "No disponible"}
</h4>

<h4 className="text-1xl mb-4">
  <strong>Hogar: </strong>
  {residence.name}
</h4>

<h4 className="text-1xl mb-4">
  <strong>Comuna: </strong>
  {children.comuna}
</h4>

<p className="text-1xl mb-4">
  <strong>Descripción: </strong>
  {children.description}
</p>


    <div className="flex justify-center">
      <Buttons childrenId={children.id} />
    </div>
    <div className="flex justify-center mt-4 space-x-4">
      <Link href={`/donate/${children.id}`}>
      <button 
        className="text-white px-4 py-2 rounded"
        style={{ backgroundColor: "#447380" }}
      >
        Donar
        </button>
      </Link>
      <Link href="/suscribe">
        <button 
        className="text-white px-4 py-2 rounded"
        style={{ backgroundColor: "#447380" }}>
          Suscribirse
        </button>
      </Link>
    </div>
  </div>
  <div className="flex" style={{ width: "51%", height: "400px" }}>
    <img src={children.image} className="rounded-lg" />
  </div>
</div>
        <div className="flex w-1/7 justify-center gap-4">
          {Array.isArray(items) && items.length > 0 ? (
            items.map((item) => <ItemCard item={item} key={item.id} />)
          ) : (
            <p className="text-1xl font-bold text-justify">No ha solicitado Artículos aún.</p>
          )}
        </div>

    </section>
  );
}

export default ProductPage;
