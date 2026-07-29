"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCountryProfile } from "@/src/services/countryProfile/service";
import { Spinner } from "@material-tailwind/react";
import { ArrowDownTrayIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading, error }: any = useCountryProfile(params.id);

  if (isLoading)
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (error || !data)
    return (
      <div className="w-full h-[90vh] flex justify-center items-center text-red-600 font-semibold">
        No se ha encontrado el perfil solicitado.
      </div>
    );

  const country = data.country;
  const flag = `https://flagcdn.com/${country?.abbreviation?.toLowerCase()}.svg`;
  const pdfUrl = `${process.env.NEXT_PUBLIC_API_URL}/data/country-profile/${data.id}/pdf/${data.pdf}`;

  return (
    <div className="flex flex-col w-full h-[90vh] p-5 sm:p-8">
      <div className="flex flex-row items-center justify-between mb-5">
        <div className="flex flex-row items-center gap-4">
          <Link
            href="/dashboard/perfilespaises"
            className="flex items-center justify-center duration-200 rounded-full size-10 bg-black/5 hover:bg-black/10"
            aria-label="Volver a Perfiles de Países"
          >
            <ArrowLeftIcon className="w-5 text-black" />
          </Link>
          <Image
            width={64}
            height={48}
            src={flag}
            alt={`Bandera de ${country?.name}`}
            className="object-cover rounded-sm w-14 h-10"
          />
          <div>
            <div className="text-2xl font-bold text-black">{country?.name}</div>
            <div className="text-sm text-neutral-500">
              {country?.region?.name ?? "Sin región"}
            </div>
          </div>
        </div>
        {data.pdf ? (
          <a
            href={pdfUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row items-center gap-2 px-5 py-3 text-sm text-white duration-300 rounded-lg bg-navy hover:shadow-lg hover:text-white/80"
          >
            <ArrowDownTrayIcon className="w-4" />
            Descargar
          </a>
        ) : null}
      </div>

      {data.pdf ? (
        <iframe
          src={pdfUrl}
          title={`Perfil de ${country?.name}`}
          className="w-full h-full border-0 rounded-lg shadow-lg"
        />
      ) : (
        <div className="flex items-center justify-center h-full text-neutral-500">
          Este país aún no tiene un documento disponible.
        </div>
      )}
    </div>
  );
}
