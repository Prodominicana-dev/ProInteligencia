"use client";
import Image from "next/image";
import React from "react";

export default function Card({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-8/12 h-56 space-y-2 lg:space-y-4 rounded-2xl bg-gradient-to-br from-celeste to-morado">
      <Image
        src={`/svg/landing/alertacomercial/${icon}.svg`}
        alt={icon}
        width={74}
        height={74}
        className="w-10 h-10 lg:w-16 lg:h-16"
      />
      <div className="text-sm font-bold text-white md:text-base lg:text-xl">
        {title}
      </div>
    </div>
  );
}
