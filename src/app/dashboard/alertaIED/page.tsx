"use client";
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, ChangeEvent } from "react";
import AlertaIED from "@/src/models/alertaIED";
import Feed from "@/src/components/alertaIED/feed";
import AlertaIEDCard from "@/src/components/alertaIED/card";
import { useActiveAlertasIED } from "@/src/services/alertaIED/service";
import NotFound from "@/src/components/validate/notFound";
import { Spinner } from "@material-tailwind/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useAtom } from "jotai";
import { alertaIEDAtom } from "@/src/state/states";

export default function Page() {
  const iedFilters = [
    {
      name: "Todos",
      title: "¡Explora todas nuestras alertas de IED!",
      description:
        "Bienvenido a las Alertas de Inversión Extranjera Directa (IED) del ProInteligencia, donde encontrarás información estratégica del panorama nacional e internacional de la IED.",
    },
    {
      name: "Oportunidades",
      title: "Oportunidades en la atracción de inversión extranjera directa",
      description:
        "Señales de inversión, relocalización de empresas extranjeras y proyectos anunciados para República Dominicana o la región, como también planes de expansión de empresas ya instaladas.",
    },
    {
      name: "Tendencias",
      title: "Tendencias internacionales de la IED",
      description:
        "Comportamiento de los proyectos y flujos de inversión extranjera directa a nivel local e internacional.",
    },
    {
      name: "Normativas",
      title: "Normativas que impactan la IED",
      description:
        "Actualizaciones o cambios en el marco legal y administrativo de la inversión extranjera directa.",
    },
    {
      name: "Amenazas",
      title: "Amenazas potenciales en el contexto global de la IED",
      description:
        "Contexto global que pueda perjudicar la entrada o salida de capitales en los diferentes mercados.",
    },
  ];

  const { data: dataAlertaIED } = useActiveAlertasIED();
  const [data, setData] = useState<AlertaIED[]>([]);
  const [filteredData, setFilteredData] = useState<AlertaIED[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(iedFilters[0].name);
  const [categoryTitle, setCategoryTitle] = useState(iedFilters[0].title);
  const [categoryDescription, setCategoryDescription] = useState(
    iedFilters[0].description
  );
  const { isLoading: isUserLoading } = useUser();

  const [canSeeAlertasIED] = useAtom(alertaIEDAtom);

  useEffect(() => {
    setData(dataAlertaIED);
  }, [dataAlertaIED]);

  useEffect(() => {
    if (!data) return;
    if (!canSeeAlertasIED && !isUserLoading) {
      const publicData: AlertaIED[] = data
        ?.map((alertaIED: AlertaIED | null) =>
          alertaIED && alertaIED.isPublic ? alertaIED : null
        )
        .filter(Boolean) as AlertaIED[];
      return setFilteredData(publicData);
    }
    setFilteredData(data);
  }, [data, canSeeAlertasIED, isUserLoading]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilter = (selectedCategory: string) => {
    // Filtrar datos por categoría y actualizar el estado
    const AlertaIEDByCategory = data.filter(
      (alertaIED: AlertaIED) =>
        alertaIED.category.name.toLowerCase() === selectedCategory.toLowerCase()
    );

    const selectedFilter = iedFilters.find(
      (filter) => filter.name.toLowerCase() === selectedCategory.toLowerCase()
    );

    if (selectedFilter) {
      setCategoryTitle(selectedFilter.title);
      setCategoryDescription(selectedFilter.description);
    }
    setCategory(selectedCategory);
    selectedCategory.toLowerCase() == "todos"
      ? setFilteredData(data)
      : setFilteredData(AlertaIEDByCategory);
  };

  const filterData = () => {
    const filteredByCategory =
      category === "Todos"
        ? data
        : data?.filter(
            (alertaIED: AlertaIED) =>
              alertaIED.category.name.toLowerCase() === category.toLowerCase()
          );

    const filteredBySearch = filteredByCategory?.filter(
      (alertaIED: AlertaIED) =>
        alertaIED.title.toLowerCase().includes(search.toLowerCase()) ||
        alertaIED.category.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredData(filteredBySearch);
  };

  useEffect(() => {
    filterData();
  }, [search, category]);

  if (isUserLoading)
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  return (
    <div className="w-full h-full">
      <div className="relative w-full sm:h-4/6">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            className="object-cover w-full h-full"
            src="/videos/charts.mp4"
          ></video>
        </div>
        <div className="absolute inset-0 bg-black border-0 opacity-60"></div>
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
                } rounded-full p-3 sm:p-4 cursor-pointer text-center duration-200`}
              >
                {filter.name}
              </button>
            ))}
          </div>
          <div className="text-2xl font-bold text-center text-white sm:w-8/12 md:w-6/12 xl:w-4/12 sm:text-3xl">
            {categoryTitle}
          </div>
          <div className="mt-4 text-sm text-center text-white sm:w-8/12 md:w-6/12 xl:w-4/12 sm:text-normal">
            {categoryDescription}
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
      ) : (
        <>
          {filteredData?.length === 0 ? (
            <NotFound />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredData?.map((alertaIED) =>
                  canSeeAlertasIED ? (
                    <div key={alertaIED.id}>
                      <AlertaIEDCard {...alertaIED} />
                    </div>
                  ) : alertaIED.isPublic ? (
                    <div key={alertaIED.id}>
                      <AlertaIEDCard {...alertaIED} />
                    </div>
                  ) : null
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
