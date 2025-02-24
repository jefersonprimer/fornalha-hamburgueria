"use client";

import React, { useState, useEffect } from "react";

interface BannerImage {
  src: string;
  alt: string;
}

const Banner: React.FC = () => {
  const images: BannerImage[] = [
    { src: "https://files.menudino.com/capas/bares-restaurantes-03.webp", alt: "Banner 1" },
    { src: "https://site.labrasaburger.com.br/wp-content/uploads/2022/02/P2340389.jpg", alt: "Banner 2" },
    { src: "https://files.menudino.com/capas/bares-restaurantes-03.webp", alt: "Banner 3" },
  ];

  const logoSrc = "logo-removebg-preview.png";

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {/* Banner */}
      <img
        src={images[currentImageIndex].src}
        alt={images[currentImageIndex].alt}
        className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
      />

      {/* Exibir logo e texto SOMENTE no primeiro banner */}
      {currentImageIndex === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
          <img src={logoSrc} alt="Logo" className="w-60 h-60 shadow-lg bg-black bg-opacity-80 rounded-md" />
          <h1 className="text-white text-2xl font-bold mt-4 text-center">
            FORNALHA HAMBURGUERIA E PETISCARIA
          </h1>
          <p className="text-white text-lg mt-2 bg-black bg-opacity-50 px-4 py-1 rounded-md">
            Mínimo R$ 15,00
          </p>
        </div>
      )}

      {/* Exibir texto SOMENTE no segundo banner */}
      {currentImageIndex === 1 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
          <h2 className="text-white text-3xl font-bold text-center">
            VARIEDADES E EXPLOSÕES DE SABORES
          </h2>
          <p className="text-white text-lg mt-2 bg-black bg-opacity-50 px-4 py-1 rounded-md">
            CONHEÇA TODOS OS NOSSOS PRATOS DELICIOSOS
          </p>
        </div>
      )}

      {/* Exibir texto SOMENTE no terceiro banner */}
      {currentImageIndex === 2 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
          <h2 className="text-white text-3xl font-bold text-center">
            terceiro banner
          </h2>
          <p className="text-white text-lg mt-2 bg-black bg-opacity-50 px-4 py-1 rounded-md">
            CONHEÇA TODOS OS NOSSOS PRATOS DELICIOSOS
          </p>
        </div>
      )}
    </div>
  );
};

export default Banner;
