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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#B87B4B',
};

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
  metadataBase: new URL('https://mylife-itsgenki.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/es',
    },
  },

  // Open Graph
  openGraph: {
    title: 'G&G | Nuestra Historia',
    description: 'Descubre la historia de amor detrás de G&G, una celebración única de momentos especiales y conexiones duraderas.',
    url: 'https://mylife-itsgenki.vercel.app',
    siteName: 'G&G Wedding',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'G&G | Nuestra Historia',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'G&G | Nuestra Historia',
    description: 'Descubre la historia de amor detrás de G&G, una celebración única de momentos especiales y conexiones duraderas.',
    images: ['/og-image.jpg'],
  },
  
  // Manifest para PWA
  manifest: '/site.webmanifest',
  
  // Icons
  icons: {
    icon: '/images/favicon.ico',
    shortcut: '/images/favicon.ico',
    apple: '/images/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        url: '/images/favicon-32x32.png',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        url: '/images/favicon-16x16.png',
        sizes: '16x16',
      },
      {
        rel: 'apple-touch-icon',
        url: '/images/apple-touch-icon.png',
        sizes: '180x180',
      }
    ],
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({children}) {
  return (
    <html lang="es" className={`${inter.variable} ${cormorant.variable} ${dancing.variable}`}>
      <body className="font-sans bg-cream">{children}</body>
    </html>
  );
}