"use client";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function Buttons({ childrenId }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="flex gap-x-2 justify-end mt-2">
      {isAdmin && (
        <>
          <button
            className="text-white bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
            onClick={async () => {
              if (confirm("¿Estás seguro de que quieres eliminar este niño?")) {
                const res = await axios.delete("/api/products/" + childrenId);
                if (res.status === 204) {
                  router.push("/childrens");
                  router.refresh();
                }
              }
            }}
          >
            Eliminar
          </button>
          <button
            className="text-white bg-gray-500 hover:bg-gray-700 py-2 px-3 rounded"
            onClick={() => {
              router.push(`/childrens/edit/${childrenId}`);
            }}
          >
            Editar
          </button>
        </>
      )}

    </div>
  );
}

export default Buttons;