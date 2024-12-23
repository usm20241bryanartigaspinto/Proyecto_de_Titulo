import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-#447380">
      <div className="bg-[#95B6BF] p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-red-500 mb-4">¡Acceso Denegado!</h1>
        <p className="text-lg text-black mb-6"><strong>No tienes permiso para acceder a esta página.</strong></p>
        <Link
          href="/"
          className="text-white bg-[#447380] hover:bg-[#869EA6] py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
