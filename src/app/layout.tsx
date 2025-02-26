import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { CartProvider } from "./context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FORNALHA HAMBURGUERIA E PETISCARIA - Card&#225;pio FORNALHA HAMBURGUERIA E PETISCARIA Frederico Westphalen",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        {/* Favicon Manual */}
        <link rel="icon" href="/favicon.jpg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <header>
            <Header />
          </header>
          {children}
        </CartProvider>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
