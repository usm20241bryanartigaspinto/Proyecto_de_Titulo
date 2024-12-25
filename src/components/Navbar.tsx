import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/app/types/types";

async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session);

  const user: User = session?.user || {};

  const isAdmin = user.role === "Administrador";

  return (
    <nav className="navbar">
      <li className="text-xl font-bold">
        <Link href="/">Ayuda a la infancia🌟</Link>
      </li>

      <ul className="flex gap-x-2">
        {!user.name ? (
          <>
            <li className="button">
              <Link href="/">Inicio</Link>
            </li>
            <li className="button">
              <Link href="/auth/login">Iniciar Sesión</Link>
            </li>
            <li className="button">
              <Link href="/auth/register">Registrarse</Link>
            </li>
          </>
        ) : (
          <>
            {isAdmin && (
              <>
                <li className="button">
                  <Link href="/userprofile">Usuarios</Link>
                </li>
                <li className="button">
                  <Link href="/newitem">Crear item</Link>
                </li>
                <li className="button">
                  <Link href="/newhogar">Crear Residencia</Link>
                </li>
                <li className="button">
                  <Link href="/dashboard">Crear Niño</Link>
                </li>
              </>
            )}
            <li className="button">
              <Link href="/childrens">Niños protegidos</Link>
            </li>
            <li className="button">
              <Link href="/residences">Hogares</Link>
            </li>
            <li className="button">
              <Link href="/api/auth/signout">Cerrar Sesión</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;