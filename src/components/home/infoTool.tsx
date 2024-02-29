"use client";
import Image from "next/image";
import Link from "next/link";
import TypeWriterEffect from "@/src/components/typewriter/typewritereffect";
import { useState, useEffect } from "react";
import React from "react";

export default function InfoTool({ title, description, logo, link }: any) {
  const [showDescription, setShowDescription] = useState(true);

  // Cuando la descripción cambie, establece showDescription en falso para reiniciar el efecto.
  useEffect(() => {
    // Establecer showDescription en true después de un pequeño retraso (100 ms)
    setShowDescription(false);
    setTimeout(() => {
      setShowDescription(true);
    }, 100);
  }, [description]);
  return (
    <div className="flex items-center justify-start h-full ml-0 text-white lg:h-full sm:h-3/6 sm:p-5 lg:absolute sm:mt-8 lg:mt-0">
      <div className="flex flex-col w-full mx-10 space-y-6 sm:w-3/6">
        <div className="flex flex-row items-center space-x-5 ">
          <Image
            src={logo}
            width={600}
            height={600}
            draggable={false}
            alt=""
            className={`${title != "ProInteligencia" ? "w-24" : "W-full"}`}
          />
          <div className="text-5xl font-custom whitespace-nowrap">
            {title != "ProInteligencia" ? title : null}
          </div>
        </div>
        <p className="md:w-[32rem] sm:text-sm text-xs block">
          {/* Si showDescription es verdadero, muestra el componente TypeWriterEffect */}
          {showDescription && (
            <TypeWriterEffect text={description} typeSpeed={20} />
          )}
        </p>
        <Link href={link} className="block">
          <div className="px-5 py-1 text-sm text-center text-black duration-500 bg-white rounded-full w-28">
            Ver más
          </div>
        </Link>
      </div>
    </div>
  );
}
