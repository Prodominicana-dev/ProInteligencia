import Image from "next/image";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[50vh] px-4 py-12 space-y-8 sm:p-12">
      <Image
        width={300}
        height={300}
        src="/svg/illustrations/not found.svg"
        className="w-full h-52"
        alt="svg"
      />
      <div className="text-xl font-bold text-center text-black sm:text-2xl">
        No se encuentran resultados de su búsqueda
      </div>
    </div>
  );
}
