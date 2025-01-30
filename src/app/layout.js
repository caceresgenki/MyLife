import { Inter } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import { Dancing_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  weight: ['400', '700'],
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  variable: "--font-cormorant",
  weight: ['400', '600'],
});

const dancing = Dancing_Script({ 
  subsets: ["latin"], 
  variable: "--font-dancing",
  weight: ['400'],
});

export const metadata = {
  title: {
    default: "G&G | Nuestra Historia",
    template: "%s | G&G"
  },
  description: "Descubre la historia de amor detrás de G&G, una celebración única de momentos especiales y conexiones duraderas.",
  generator: "Next.js",
  applicationName: "G&G",
  keywords: ["novios", "boda", "matrimonio", "celebración", "amor", "G&G", "historia de amor"],
  authors: [{ name: "It's Genki" }],
  creator: "It's Genki",
  publisher: "It's Genki",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mylife-itsgenki.vercel.app'), // Reemplaza con tu dominio real
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/es',
    },
  },
  
  // Configuración para viewport
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
  },
  
  // Open Graph
  openGraph: {
    title: 'G&G | Nuestra Historia',
    description: 'Descubre la historia de amor detrás de G&G, una celebración única de momentos especiales y conexiones duraderas.',
    url: 'https://mylife-itsgenki.vercel.app',
    siteName: 'G&G Wedding',
    images: [
      {
        url: 'https://mylife-itsgenki.vercel.app/og-image.jpg', // Reemplaza con la ruta de tu imagen
        width: 1200,
        height: 630,
        alt: 'G&G | Nuestra Historia',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  
  // // Twitter
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'G&G | Nuestra Historia',
  //   description: 'Descubre la historia de amor detrás de G&G, una celebración única de momentos especiales y conexiones duraderas.',
  //   siteId: '@tuhandletwitter', // Reemplaza con tu handle de Twitter
  //   creator: '@tuhandletwitter',
  //   creatorId: '@tuhandletwitter',
  //   images: ['https://tudominio.com/twitter-image.jpg'], // Reemplaza con la ruta de tu imagen
  // },
  
  // // Verificación de sitio
  // verification: {
  //   google: 'tu-código-de-verificación-google',
  //   yandex: 'tu-código-de-verificación-yandex',
  //   yahoo: 'tu-código-de-verificación-yahoo',
  // },
  
  // // Manifest para PWA
  // manifest: '/manifest.json',
  
  // Icons
  icons: {
    icon: 'images/favicon.ico',
    shortcut: 'images/favicon.ico',
    apple: [
      { url: 'images/apple-touch-icon.png' },
      { url: 'images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: 'images/apple-touch-icon.png',
      },
    ],
  },
};

export default function RootLayout({children}) {
  return (
    <html lang="es" className={`${inter.variable} ${cormorant.variable} ${dancing.variable}`}>
      <body className="font-sans bg-cream">{children}</body>
    </html>
  );
}