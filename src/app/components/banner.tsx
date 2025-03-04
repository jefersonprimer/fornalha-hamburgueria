"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface BannerImage {
  src: string;
  alt: string;
}

const Banner: React.FC = () => {
  const images: BannerImage[] = [
    { src: "/bares-restaurantes-03.webp", alt: "Banner 1" },
    { src: "/h1.jpg", alt: "Banner 2" },
    { src: "/h2.jpg", alt: "Banner 3" },
    { src: "/h3.jpg", alt: "Banner 4" },
    { src: "/h4.jpg", alt: "Banner 5" },
    { src: "/banner-chopp-em-dobro.jpg", alt: "Banner 6" },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
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
        fill
        style={{ objectFit: "cover" }}
        className="transition-opacity duration-500 ease-in-out"
      />
    </div>
  );
};

export default Banner;
