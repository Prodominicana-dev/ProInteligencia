"use client";
import Image from "next/image";
import React from "react";

export default function Card({ image, title, color, tool, changeT }: any) {
  const handleClick = () => {
    changeT(tool);
  };
  return (
    <div className="sm:w-5/12 lg:w-full sm:h-40 h-40 w-10/12 md:space-x-5 m-5  overflow-y-auto">
      <button
        className={`flex justify-center items-center md:h-full h-full md:w-full w-full ${color} rounded-lg text-2xl hover:text-3xl duration-200`}
        onClick={handleClick}
      >
        <Image src={`${image}`} width={100} height={100} alt=""></Image>
        <div className="absolute font-custom text-white">{title}</div>
      </button>
    </div>
  );
}
