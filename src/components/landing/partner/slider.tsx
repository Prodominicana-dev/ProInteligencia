"use client";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import React from "react";

export default function Slider({ logo }: { logo: string }) {
  // Extraer el ultimo item de logo y separar de la extension
  const logoName = logo.split("/").pop();
  const logoNameWithoutExtension = logoName?.split(".")[0];
  return (
    <Carousel.Slide className="flex items-center justify-center w-10/12 h-32 text-black lg:h-44 ">
      <Image
        src={`${logo}`}
        width={600}
        height={600}
        alt={logoNameWithoutExtension || ""}
        className="object-contain w-full h-full p-5 m-5 text-black bg-white "
      />
    </Carousel.Slide>
  );
}
