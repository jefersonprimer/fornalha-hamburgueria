import { FC } from 'react';
import Link from 'next/link';

const NotFound: FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-xl text-gray-700 mb-6">A página que você procura não foi encontrada.</p>
        <p className="text-md text-gray-500 mb-4">Mas não se preocupe! Temos várias opções deliciosas esperando por você!</p>
        <Link href="/" className="text-blue-500 hover:text-blue-700">Voltar para a página inicial</Link>
      </div>
    </div>
  );
};

export default NotFound;
