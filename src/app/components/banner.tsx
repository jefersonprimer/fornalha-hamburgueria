"use client"

import React, { useState, useEffect } from "react";

interface BannerImage {
  src: string;
  alt: string;
}

const Banner: React.FC = () => {
  const images: BannerImage[] = [
    { src: "https://files.menudino.com/capas/bares-restaurantes-03.webp", alt: "Banner 1" },
    { src: "https://site.labrasaburger.com.br/wp-content/uploads/2022/02/P2340389.jpg", alt: "Banner 2" },
    { src: "https://instagram.fsqx1-1.fna.fbcdn.net/v/t39.30808-6/434866015_17968942223705777_7802436592779729722_n.jpg?stp=dst-jpegr_e35_tt6&efg=eyJ2ZW5jb2xlX3RhZyI6ImltYWdlX3VybGdlbi4xMjE1eDEyMTUuaGRyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fsqx1-1.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2AH_mtxCoDhNXOXV61SL2FX8MZn1qoNn6OP7MHKSfWDO7HFKUEVfrFpSyTt4-tq-jZtdjlVSETDhdEXtodjylomL&_nc_ohc=gYZdzjELO3YQ7kNvgEOZT41&_nc_gid=d5942d69831545b6b78cacc4859213bd&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzM0MTk3MTg4Mzc4MTY0NDA3Mw%3D%3D.3-ccb7-5&oh=00_AYBzA0dzozo9sHM3ToE5h17-KGyJXpk4BHYaAViQkK3-KA&oe=67C2A6C7&_nc_sid=22de04", alt: "Banner 3" },
  ];

  const logoSrc = "logo-removebg-preview.png";

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [storeStatus, setStoreStatus] = useState("");

  useEffect(() => {
    // Função para determinar o status de funcionamento da loja
    const getStoreStatus = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 18 && currentHour < 22) {
        setStoreStatus("Aberto");
      } else {
        setStoreStatus("Fechado");
      }
    };

    getStoreStatus();

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
          <img src={logoSrc} alt="Logo" className="w-60 h-60 shadow-lg bg-black bg-opacity-80 rounded-md hidden sm:block" />
          <h1 className="text-white text-2xl font-bold mt-4 text-center hidden sm:block">
            FORNALHA HAMBURGUERIA E PETISCARIA
          </h1>
          <p className="text-white text-lg mt-2 bg-black bg-opacity-50 px-4 py-1 rounded-md hidden sm:block">
            Mínimo R$ 15,00
          </p>
          {/* Exibir status da loja */}
          <p className="text-red-600 font-bold text-lg mt-2 bg-white bg-opacity-50 px-4 py-1 rounded-md hidden sm:block">
            {storeStatus === "Aberto" ? "Aberto até às 22h00" : "Fechado - Abrimos às 18h"}
          </p>
        </div>
      )}

      {/* Exibir texto SOMENTE no segundo banner */}
      {currentImageIndex === 1 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
          <h2 className="text-white text-3xl font-bold text-center hidden sm:block">
            VARIEDADES E EXPLOSÕES DE SABORES
          </h2>
          <p className="text-white text-lg mt-2 bg-black bg-opacity-50 px-4 py-1 rounded-md hidden sm:block">
            CONHEÇA TODOS OS NOSSOS PRATOS DELICIOSOS
          </p>
        </div>
      )}

      {/* Exibir texto SOMENTE no terceiro banner */}
      {currentImageIndex === 2 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
          <h2 className="text-white text-3xl font-bold text-center hidden sm:block">
            {/* Texto vazio, caso queira adicionar algo depois */}
          </h2>
          <p className="text-white text-lg mt-2 bg-black bg-opacity-50 px-4 py-1 rounded-md hidden sm:block">
            {/* Texto vazio */}
          </p>
        </div>
      )}
    </div>
  );
};

export default Banner;
