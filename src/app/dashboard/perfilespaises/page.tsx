"use client";
import React, { useState, useMemo, useEffect, ChangeEvent } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Select } from "@mantine/core";
import { useActiveCountryProfiles } from "@/src/services/countryProfile/service";
import CountryProfileCard from "@/src/components/countryProfile/card";
import RequestProfileModal from "@/src/components/countryProfile/requestModal";
import CountryProfile from "@/src/models/countryProfile";
import Region from "@/src/models/region";
import NotFound from "@/src/components/validate/notFound";
import { Spinner } from "@material-tailwind/react";

// Cantidad de perfiles que se muestran antes de pedir "Ver más"
const ITEMS_PER_PAGE = 6;

export default function Page() {
  const { data, error, isLoading } = useActiveCountryProfiles();

  const [search, setSearch] = useState("");
  // "" = todas las regiones
  const [region, setRegion] = useState("");
  const [visible, setVisible] = useState(ITEMS_PER_PAGE);

  // "Todas las regiones" + las regiones que tienen perfiles. La primera opción
  // queda arriba para poder volver a ver todos los perfiles.
  const regionOptions = useMemo(() => {
    const regions = (data?.regions ?? []).map((r: Region) => r.name);
    return ["Todas las regiones", ...regions];
  }, [data]);

  const filteredData = useMemo(() => {
    if (!data?.countryProfiles) return [];

    return data.countryProfiles.filter((countryProfile: CountryProfile) => {
      const matchesRegion =
        region === "" ||
        countryProfile.country?.region?.name?.toLowerCase() ===
          region.toLowerCase();

      const matchesSearch = countryProfile.country?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return matchesRegion && matchesSearch;
    });
  }, [data, search, region]);

  // Al cambiar de filtro o de búsqueda se vuelve a la primera tanda
  useEffect(() => {
    setVisible(ITEMS_PER_PAGE);
  }, [search, region]);

  const visibleData = filteredData.slice(0, visible);
  const remaining = filteredData.length - visibleData.length;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (isLoading)
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="w-full h-[90vh] flex justify-center items-center text-red-600 font-semibold">
        Error al cargar los perfiles de países. Intenta nuevamente más tarde.
      </div>
    );

  return (
    <div className="w-full h-full">
      {/* Invitación a solicitar un perfil de país que aún no existe */}
      <RequestProfileModal />

      {/* Encabezado con degradado de marca, distinto al azul del sidebar */}
      <div className="w-full bg-gradient-to-tr from-purpurita via-morado to-celeste">
        <div className="flex flex-col items-center justify-center w-full px-5 py-16 sm:px-0 sm:py-20">
          <div className="text-3xl font-bold text-center text-white sm:text-5xl">
            Perfiles de Países
          </div>
          <div className="w-full mt-4 text-sm text-center text-white/80 sm:w-8/12 lg:w-6/12 sm:text-base">
            Consulta y descarga el perfil de cada país. Filtra por región o
            busca directamente el país que necesitas.
          </div>

          {/* Búsqueda + filtro de región: el dropdown escala a cualquier
              cantidad de regiones sin llenar el encabezado. */}
          <div className="flex flex-col items-center w-full gap-3 mt-10 sm:flex-row sm:justify-center sm:w-11/12 lg:w-10/12 xl:w-8/12">
            {/* Barra de búsqueda ancha */}
            <div className="flex flex-row items-center flex-1 w-full gap-3 p-4 bg-white shadow-xl rounded-2xl sm:p-5">
              <MagnifyingGlassIcon className="w-6 mx-1 text-navy shrink-0" />
              <input
                placeholder="Escribe el nombre del país que buscas..."
                className="w-full text-base text-black bg-white outline-none sm:text-lg placeholder:text-gray-400"
                name="search"
                value={search}
                onChange={handleSearchChange}
              />
              {search ? (
                <button
                  onClick={() => setSearch("")}
                  className="px-3 text-sm text-gray-500 duration-200 shrink-0 hover:text-black"
                >
                  Limpiar
                </button>
              ) : null}
            </div>

            {/* Selector de región (siempre muestra "Todas" por defecto) */}
            <Select
              className="w-full sm:w-64 shrink-0"
              size="lg"
              radius="lg"
              placeholder="Todas las regiones"
              data={regionOptions}
              value={region || "Todas las regiones"}
              onChange={(value) =>
                setRegion(!value || value === "Todas las regiones" ? "" : value)
              }
              allowDeselect={false}
              searchable
              nothingFoundMessage="Región no encontrada..."
              comboboxProps={{ zIndex: 40 }}
            />
          </div>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <NotFound />
      ) : (
        <div className="w-full p-6 sm:p-8">
          {/* Indicador de cuántos se ven del total */}
          <div className="mb-6 text-sm text-center text-neutral-600 sm:text-left">
            Mostrando{" "}
            <span className="font-semibold text-navy">
              {visibleData.length}
            </span>{" "}
            de{" "}
            <span className="font-semibold text-navy">
              {filteredData.length}
            </span>{" "}
            {filteredData.length === 1 ? "perfil" : "perfiles"}
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6">
            {visibleData.map((countryProfile: CountryProfile) => (
              <div key={countryProfile.id}>
                <CountryProfileCard {...countryProfile} />
              </div>
            ))}
          </div>

          {remaining > 0 ? (
            <div className="flex justify-center w-full mt-10">
              <button
                onClick={() => setVisible(visible + ITEMS_PER_PAGE)}
                className="px-8 py-3 font-semibold text-white duration-300 rounded-full bg-navy hover:shadow-lg hover:text-white/80"
              >
                Ver más ({remaining}{" "}
                {remaining === 1 ? "restante" : "restantes"})
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
