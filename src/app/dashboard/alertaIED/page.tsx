"use client";
import React, { useState, useMemo, ChangeEvent } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useActiveAlertasIED } from "@/src/services/alertaIED/service";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useAtom } from "jotai";
import { alertaIEDAtom } from "@/src/state/states";
import Feed from "@/src/components/alertaIED/feed";
import AlertaIEDCard from "@/src/components/alertaIED/card";
import NotFound from "@/src/components/validate/notFound";
import { Spinner } from "@material-tailwind/react";

export default function Page() {
  const iedFilters = useMemo(
    () => [
      {
        name: "Todos",
        title: "¡Explora todas nuestras alertas de IED!",
        description:
          "Bienvenido a las Alertas de Inversión Extranjera Directa (IED) del ProInteligencia...",
      },
      {
        name: "Oportunidades",
        title: "Oportunidades en la atracción de inversión extranjera directa",
        description:
          "Señales de inversión, relocalización de empresas extranjeras y proyectos anunciados...",
      },
      {
        name: "Tendencias",
        title: "Tendencias internacionales de la IED",
        description:
          "Comportamiento de los proyectos y flujos de inversión extranjera directa...",
      },
      {
        name: "Normativas",
        title: "Normativas que impactan la IED",
        description:
          "Actualizaciones o cambios en el marco legal y administrativo de la inversión extranjera...",
      },
      {
        name: "Amenazas",
        title: "Amenazas potenciales en el contexto global de la IED",
        description:
          "Contexto global que pueda perjudicar la entrada o salida de capitales...",
      },
    ],
    []
  );

  const {
    data: dataAlertaIED,
    error,
    isLoading: isAlertasLoading,
  } = useActiveAlertasIED();
  const { isLoading: isUserLoading } = useUser();
  const [canSeeAlertasIED] = useAtom(alertaIEDAtom);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");

  const selectedFilter = useMemo(
    () => iedFilters.find((f) => f.name === category) || iedFilters[0],
    [category, iedFilters]
  );

  const filteredData = useMemo(() => {
    if (!dataAlertaIED) return [];

    const visibleData = canSeeAlertasIED
      ? dataAlertaIED
      : dataAlertaIED.filter((a: any) => a?.isPublic);

    return visibleData.filter((a: any) => {
      const matchesCategory =
        category === "Todos" ||
        a.category.name.toLowerCase() === category.toLowerCase();
      const matchesSearch =
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.category.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [dataAlertaIED, search, category, canSeeAlertasIED]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilter = (name: string) => setCategory(name);

  if (isUserLoading || isAlertasLoading)
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="w-full h-[90vh] flex justify-center items-center text-red-600 font-semibold">
        Error al cargar las alertas. Intenta nuevamente más tarde.
      </div>
    );

  return (
    <div className="w-full h-full">
      <div className="relative w-full sm:h-4/6">
        <div className="absolute inset-0 z-0 hidden sm:block">
          <video
            autoPlay
            loop
            muted
            preload="metadata"
            className="object-cover w-full h-full
              [&::-webkit-media-controls]:!hidden"
            src="/videos/charts.mp4"
          ></video>
        </div>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative flex flex-col items-center justify-center w-full h-full px-5 sm:px-0">
          <div className="gap-3 sm:gap-5 lg:gap-10 my-10 text-[14px] sm:text-lg flex flex-row justify-center items-center flex-wrap lg:flex-nowrap sm:w-8/12">
            {iedFilters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => handleFilter(filter.name)}
                className={`${
                  category === filter.name
                    ? "bg-white text-black font-bold"
                    : "bg-black/50 text-white hover:bg-white hover:text-black"
                } rounded-full p-3 sm:p-4 cursor-pointer duration-200`}
              >
                {filter.name}
              </button>
            ))}
          </div>
          <div className="text-2xl font-bold text-center text-white sm:w-8/12 md:w-6/12 xl:w-4/12 sm:text-3xl">
            {selectedFilter.title}
          </div>
          <div className="mt-4 text-sm text-center text-white sm:w-8/12 md:w-6/12 xl:w-4/12 sm:text-normal">
            {selectedFilter.description}
          </div>
          <div className="flex flex-row w-10/12 p-4 my-10 bg-white rounded-full sm:p-5 sm:w-8/12 md:w-6/12 xl:w-4/12">
            <MagnifyingGlassIcon className="w-5 mx-2 text-gray-500" />
            <input
              placeholder="Buscar..."
              className="w-10/12 text-blue-500 bg-white outline-none"
              name="search"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      {search === "" && category === "Todos" ? (
        <Feed />
      ) : filteredData.length === 0 ? (
        <NotFound />
      ) : (
        <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredData.map((alertaIED: any) => (
            <div key={alertaIED.id}>
              <AlertaIEDCard {...alertaIED} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
