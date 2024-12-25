"use client";
import React from "react";
import { useSession } from "next-auth/react";




const MyComponent = () => {
  
    const { data: session, status } = useSession();
    const username = session?.user?.name;
    const id = session?.user?.id;
    const email = session?.user?.email;

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  if (!session) {
    return <div>No has iniciado sesión</div>;
  }

  console.log("Sesión completa:", session);

  return (
    <div>
      <h3>
            {email ? (<>Bienvenido <span style={{ fontWeight: 'bold', color: '#3498db' }}>{email}</span> a Nuestro Proyecto</>
            ) : 'Bienvenidos a Nuestro Proyecto'}
            </h3>
    </div>
  );
};

export default MyComponent;
