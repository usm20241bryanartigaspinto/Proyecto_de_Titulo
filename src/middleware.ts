import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

interface User {
  role: string;
}

const roleCheck = (user: User | null, rolesAllowed: string[]): boolean => {
  return user ? rolesAllowed.includes(user.role) : false;
};

export default withAuth(
  async function middleware(req: NextRequest) {
    const rolesAllowed: { [key: string]: string[] } = {
      "/dashboard": ["Administrador"],
      "/childrens": ["Verificado", "Administrador"],
      "/residences": ["Verificado", "Administrador"],
      "/newitem": ["Verificado", "Administrador"],
    };

    const { pathname } = req.nextUrl;
    const token = await getToken({ req });
    console.log('Token:', token);

    const user = token && typeof token.role === 'string' ? { role: token.role } : null;

    if (rolesAllowed[pathname]) {
      if (!roleCheck(user, rolesAllowed[pathname])) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/dashboard", "/childrens", "/residences"] };