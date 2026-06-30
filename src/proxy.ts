import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * (Next.js 16: `middleware` → `proxy`, runtime nodejs.)
 * Refresca la sesión de Supabase en cada request y protege las rutas privadas.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANTE: usar getUser() (verifica contra el auth server), no getSession().
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isAuthRoute = path === "/login";

  if (!user && !isAuthRoute) {
    return redirectKeepingCookies("/login", request, response);
  }

  if (user && isAuthRoute) {
    return redirectKeepingCookies("/", request, response);
  }

  return response;
}

/**
 * Redirige conservando las cookies de sesión refrescadas por getUser().
 * Sin esto, un NextResponse.redirect nuevo descarta los tokens renovados y la
 * sesión se pierde tras un refresh (pitfall documentado de @supabase/ssr).
 */
function redirectKeepingCookies(
  pathname: string,
  request: NextRequest,
  response: NextResponse,
) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  const redirectResponse = NextResponse.redirect(url);
  response.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie);
  });
  return redirectResponse;
}

export const config = {
  // Excluye assets estáticos y archivos de imagen.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
