"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface BannerImage {
  src: string;
  alt: string;
}

const Banner: React.FC = () => {
  const images: BannerImage[] = [
    { src: "/bares-restaurantes-03.webp", alt: "Banner 1" },
    { src: "/P2340389.jpg", alt: "Banner 2" },
    { src: "/P2340389.jpg", alt: "Banner 3" },
  ];

  const logoSrc = "/logo-removebg-preview.png";

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [storeStatus, setStoreStatus] = useState("");

  useEffect(() => {
    const getStoreStatus = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 18 && currentHour < 23) {
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
      <Image
        src={images[currentImageIndex].src}
        alt={images[currentImageIndex].alt}
        fill // Preenchendo o contêiner de forma automática
        style={{ objectFit: "cover" }} // Substituindo objectFit
        className="transition-opacity duration-500 ease-in-out"
      />

      {currentImageIndex === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
          <Image
            src={logoSrc}
            alt="Logo"
            width={240}
            height={240}
            className="shadow-lg bg-black bg-opacity-80 rounded-md hidden sm:block"
          />
          <h1 className="text-white text-2xl font-bold mt-4 text-center hidden sm:block">
            FORNALHA HAMBURGUERIA E PETISCARIA
          </h1>
          <p className="text-white text-lg mt-2 bg-black bg-opacity-50 px-4 py-1 rounded-md hidden sm:block">
            Mínimo R$ 15,00
          </p>
          <p className="text-red-600 font-bold text-lg mt-2 bg-white bg-opacity-50 px-4 py-1 rounded-md hidden sm:block">
            {storeStatus === "Aberto" ? "Aberto até às 23h00" : "Fechado - Abrimos às 18h"}
          </p>
        </div>
      )}

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

      {currentImageIndex === 2 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30">
          <h2 className="text-white text-3xl font-bold text-center hidden sm:block"></h2>
          <p className="text-white text-lg mt-2 bg-black bg-opacity-50 px-4 py-1 rounded-md hidden sm:block"></p>
        </div>
      )}
    </div>
  );
};

export default Banner;
