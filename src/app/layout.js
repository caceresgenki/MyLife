import { Inter } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { Dancing_Script } from "next/font/google";
import "./globals.css";

// Optimiza las importaciones de fuentes
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  weight: ['400', '700'], // Reduce a los pesos que realmente necesites
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  variable: "--font-cormorant",
  weight: ['400', '600'], // Reduce a los pesos que realmente necesites
});

const dancing = Dancing_Script({ 
  subsets: ["latin"], 
  variable: "--font-dancing",
  weight: ['400'], // Reduce a los pesos que realmente necesites
});

export const metadata = {
  title: 'G&G | Nuestra Historia',
  description: 'G&G | Nuestra Historia',
};

export default function RootLayout({children}) {
  return (
    <html lang="es" className={`${inter.variable} ${cormorant.variable} ${dancing.variable}`}>
      <body className="font-sans bg-cream">{children}</body>
    </html>
  );
}