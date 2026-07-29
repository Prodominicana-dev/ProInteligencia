"use client";
import CountryProfile from "@/src/models/countryProfile";
import Image from "next/image";
import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

export default function CountryProfileCard(countryProfile: CountryProfile) {
  const { country } = countryProfile;
  // flagcdn exige la abreviatura en minúsculas
  const flag = `https://flagcdn.com/${country?.abbreviation?.toLowerCase()}.svg`;
  // El PDF se abre directamente en una pestaña nueva del navegador,
  // donde su visor nativo lo muestra.
  const pdfUrl = `${process.env.NEXT_PUBLIC_API_URL}/data/country-profile/${countryProfile.id}/pdf/${countryProfile.pdf}`;
  const hasPdf = Boolean(countryProfile.pdf);

  const content = (
    <>
      {/* La bandera es el elemento principal del cuadro */}
      <div className="relative w-full overflow-hidden bg-gray-100 aspect-[4/3]">
        <Image
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1536px) 20vw, 16vw"
          src={flag}
          alt={`Bandera de ${country?.name}`}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        {/* Velo que aparece al pasar el mouse */}
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:opacity-100" />

        {/* Brillo diagonal que recorre la bandera */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />

        {/* Aviso de que la carta completa abre el PDF en otra pestaña */}
        {hasPdf ? (
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-center pb-3 transition-all duration-300 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white rounded-full bg-white/20 backdrop-blur-sm">
              Ver perfil
              <ArrowTopRightOnSquareIcon className="w-3" />
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-col justify-center px-3 py-3 text-center transition-colors duration-300 group-hover:bg-gray-50">
        <div className="text-sm font-semibold text-black truncate transition-colors sm:text-base group-hover:text-celeste">
          {country?.name}
        </div>
        <div className="text-xs truncate text-neutral-500">
          {country?.region?.name ?? "Sin región"}
        </div>
      </div>
    </>
  );

  const wrapperClass =
    "relative block w-full overflow-hidden bg-white shadow-md group rounded-xl ring-1 ring-gray-100 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:ring-celeste/40";

  // Toda la carta es clicable: así no hay confusión sobre dónde presionar.
  if (hasPdf) {
    return (
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir el perfil de ${country?.name} en una pestaña nueva`}
        title="Abrir el PDF en una pestaña nueva"
        className={`${wrapperClass} cursor-pointer`}
      >
        {content}
      </a>
    );
  }

  return <div className={wrapperClass}>{content}</div>;
}
