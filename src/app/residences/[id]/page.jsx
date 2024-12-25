import Buttons from "./Buttons";
import { conn } from "@/libs/mysql";
import Link from "next/link";


async function loadResidence(residenceId) {
  const [data] = await conn.query("SELECT * FROM residence WHERE id = ?", [
    residenceId,
  ]);
  return data;
}

async function ResidencePage({ params }) {
  const residence = await loadResidence(params.id);


  return (
    <section className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <div className="flex w-4/6 justify-center">
  <div
    className="p-6 w-1/3 bg-[#95B6BF] rounded-lg shadow-lg border">
      
<h3 className="text-1xl mb-4">
  <strong>Nombre del Hogar: </strong>
  {residence.name}
</h3>

<h4 className="text-1xl mb-4">
  <strong>Comuna: </strong>
  {residence.comuna}
</h4>

<h4 className="text-1xl mb-4">
  <strong>Teléfono: </strong>
  {residence.telefono}
</h4>

<p className="text-1xl mb-4">
  <strong>Direccion: </strong>
  {residence.direccion}
</p>


    <div className="flex justify-center">
      <Buttons residenceId={residence.id} />
    </div>
    <div className="flex justify-center mt-4 space-x-4">
      <Link href="/donate">
        <button 
        className="text-white px-4 py-2 rounded"
        style={{ backgroundColor: "#447380" }}>
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
    <img src={residence.image} className="rounded-lg" />
  </div>
</div>
    </section>
  );
}

export default ResidencePage;
