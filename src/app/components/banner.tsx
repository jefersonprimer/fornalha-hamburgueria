"use client";

import React, { useState, useEffect } from "react";

interface BannerImage {
  src: string;
  alt: string;
}

const Banner: React.FC = () => {
  const images: BannerImage[] = [
    { src: "https://files.menudino.com/capas/bares-restaurantes-03.webp", alt: "Banner 1" },
    { src: "https://files.menudino.com/capas/bares-restaurantes-03.webp", alt: "Banner 3" },
    { src: "https://files.menudino.com/capas/bares-restaurantes-03.webp", alt: "Banner 2" },
  ];

  const logoSrc = "https://files.menudino.com/cardapios/63227/logo.png";

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

      {/* Exibir logo e texto SOMENTE no terceiro banner */}
      {currentImageIndex === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
          {/* Logo */}
          <img src={logoSrc} alt="Logo" className="w-40 h-40  shadow-lg" />
          
          {/* Nome do restaurante */}
          <h1 className="text-white text-2xl font-bold mt-4 text-center">
            FORNALHA HAMBURGUERIA E PETISCARIA
          </h1>

          {/* Valor mínimo */}
          <p className="text-white text-lg mt-2 bg-black bg-opacity-50 px-4 py-1 rounded-md">
            Mínimo R$ 15,00
          </p>
        </div>
      )}
    </div>
  );
};

export default Banner;
