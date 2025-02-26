import { FC } from 'react';

const SkeletonLoader: FC = () => {
  return (
    <div className="p-4 w-full max-w-sm mx-auto bg-white rounded-lg shadow-md animate-pulse">
      <div className="flex items-center space-x-4">
        {/* Coluna com os textos (nome, descrição, preço) */}
        <div className="flex flex-col flex-grow space-y-3">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div> {/* Simula o título */}
          <div className="h-4 bg-gray-300 rounded w-5/6"></div> {/* Simula a descrição */}
          <div className="h-8 bg-gray-300 rounded w-1/2"></div> {/* Simula o preço */}
        </div>

        {/* Imagem */}
        <div className="w-32 h-32 bg-gray-300 rounded-lg"></div> {/* Simula a imagem */}
      </div>
    </div>
  );
};

export default SkeletonLoader;
