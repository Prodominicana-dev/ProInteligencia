"use client";
import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

// Formulario institucional donde se registran las solicitudes de nuevos
// perfiles de países.
const FORM_URL =
  "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=ghXqEGP41EuvCTx0XnNcBScHwGRtP81GvVRSfxgYJaNUQTdYQjdGQjJHUjBIVlgwSzVOQTJXQ0hETi4u";

// Se muestra cuando la búsqueda no devuelve ningún país, para ofrecer la
// solicitud de incorporación en el momento en que hace falta.
export default function RequestProfileCta() {
  return (
    <div className="flex items-center justify-center w-full px-4 py-12 sm:p-12">
      <div className="w-full max-w-xl p-8 text-center bg-white border border-gray-200 shadow-sm rounded-2xl">
        <Image
          width={300}
          height={300}
          src="/svg/illustrations/not found.svg"
          className="w-full mx-auto h-44"
          alt="svg"
        />

        <h2 className="mt-6 text-xl font-bold text-black sm:text-2xl">
          No se encuentran resultados de su búsqueda
        </h2>

        <p className="mt-3 text-sm text-neutral-600 sm:text-base">
          Si deseas un nuevo perfil de país, completa el formulario de solicitud
          y nuestro equipo evaluará su incorporación.
        </p>

        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-row items-center justify-center gap-2 px-6 py-3 mt-6 text-sm font-semibold text-white duration-300 rounded-full bg-navy hover:shadow-lg hover:text-white/80"
        >
          Ir a la solicitud
          <ArrowTopRightOnSquareIcon className="w-4" />
        </a>
      </div>
    </div>
  );
}
