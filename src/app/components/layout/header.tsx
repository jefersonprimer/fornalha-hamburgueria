import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo */}
      <Image src="/logo.png" alt="Logo" width={180} height={100} />
      
      {/* Barra de Pesquisa */}
      <div className="relative">
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"/>
        <input
          type="text"
          placeholder="Buscar..."
          className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Links */}
      <nav className="flex gap-4">
        <Link href="/cardapio" className="text-gray-700 hover:text-blue-500">Cardápio</Link>
        <Link href="/pedidos" className="text-gray-700 hover:text-blue-500">Pedidos</Link>
        <Link href="/cupons" className="text-gray-700 hover:text-blue-500">Cupons</Link>
      </nav>
    </header>
  );
}
