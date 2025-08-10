"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from 'next/navigation'; // Importez usePathname

const inter = Inter({ subsets: ["latin"] });

// Note: Metadata ne peut pas être exporté dans un Client Component
// export const metadata: Metadata = {
//   title: "SamaColis - Réexpédition de colis vers l'Afrique",
//   description: "Achetez en Europe, nous réexpédions vos colis en Afrique.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith('/dashboard');

  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gray-50`}>
        {!isDashboardRoute && <Header />} {/* Affichage conditionnel du Header */}
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
