import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  // Nota: `cacheComponents` (modelo de caché nuevo de Next 16) queda desactivado a
  // propósito: esta app es per-usuario y lee cookies en casi todas las rutas, por lo que
  // forzaría Suspense/`'use cache'` en todos lados sin beneficio real. Se puede activar
  // más adelante si se introducen vistas públicas/cacheables.
};

export default nextConfig;
