import "./globals.css";

import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { CartProvider } from "./context/CartContext";


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
      <body>
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
