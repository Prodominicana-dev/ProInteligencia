"use client";
import React from "react";
import Image from "next/image";

export default function Slide({
  icon,
  title,
}: {
  icon: string;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-3 lg:space-y-6">
      <Image
        src={`/svg/landing/alertacomercial/${icon}.svg`}
        alt={title}
        width={74}
        height={74}
        className="w-28 h-28 lg:w-40 lg:h-40"
      />
      <div className="text-lg text-white lg:text-3xl ">{title}</div>
    </div>
  );
}
