import Link from "next/link";

function Items({ item }) {
  return (
    <Link
    
      className="rounded-lg border-gray-800 mb-3 hover:bg-gray-100 hover:cursor-pointer"
      style={{ backgroundColor: "#95B6BF"}}
      href={`/Items/${item.id}`}
    >
              <h3>
            ‎ 
              </h3>
              <h3>
            ‎ 
              </h3>

    <div
      className="pt-4 flex items-center justify-center"
      style={{ width: "100%", height: "200px" }} 
      >
        {item.image && 
        <img src={item.image} 
        className="object-cover items-center h-full rounded-lg" alt="" />}
      
      </div>

      <div className="p-4">

  <div className="flex items-center">
    <h1 className="text-1xl text-slate-800 font-bold">Nombre:</h1>
    <span className="text-1xl text-slate-800 ml-2">{item.name}</span>
  </div>

  <div className="flex items-center">
    <h2 className="text-1xl text-slate-800 font-bold">Precio:</h2>
    <span className="text-1xl text-slate-800 ml-2">${item.price}</span>
  </div>

  <div className="flex items-center">
    <h3 className="text-1xl text-slate-800 font-bold">Cantidad:</h3>
    <span className="text-1xl text-slate-800 ml-2">{item.cantidad}</span>
  </div>

  <div className="flex items-center">
    <h3 className="text-1xl text-slate-800 font-bold">Estado:</h3>
    <span className="text-1xl text-slate-800 ml-2">{item.status}</span>
  </div>
  
</div>

    </Link>
  );
}

export default Items;