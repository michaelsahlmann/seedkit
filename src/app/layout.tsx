import type { Metadata } from "next";
import { Geist, Geist_Mono, Young_Serif } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";
import { BackgroundPaths } from "@/components/shared/background-paths";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Serif de display para títulos y marca (un solo peso: 400).
const youngSerif = Young_Serif({
  weight: "400",
  variable: "--font-young-serif",
  subsets: ["latin"],
  display: "swap",
});

// Palatino (TTF local) para el cuerpo y subtítulos. Un solo peso: la negrita
// (font-bold en subtítulos) la sintetiza el navegador.
const palatino = localFont({
  src: "../fonts/palatino-palr45w.ttf",
  variable: "--font-palatino",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Seedkit",
  description: "Banco de trabajo para arrancar proyectos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${youngSerif.variable} ${palatino.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">
        <BackgroundPaths />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <Providers>{children}</Providers>
        </div>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
