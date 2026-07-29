"use client";
import React, { useEffect, useState } from "react";
import Header from "@/src/components/settings/header";
import { nfd } from "unorm";
import Settings from "@/src/components/validate/settings";
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import NotFound from "@/src/components/validate/notFound";
import CountryProfileDialog from "@/src/components/settings/countryProfile/dialog";
import Card from "@/src/components/settings/countryProfile/card";
import { useCountryProfiles } from "@/src/services/countryProfile/service";

export default function Page() {
  const { data, refetch } = useCountryProfiles();
  const [countryProfiles, setCountryProfiles] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [total, setTotal] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCountryProfiles(data?.countryProfiles ?? []);
  }, [data]);

  useEffect(() => {
    refetch().then((res: any) => {
      setCountryProfiles(res.data?.countryProfiles ?? []);
    });
  }, [refresh, refetch]);

  // Filtro por nombre de país o región
  const filtered = countryProfiles?.filter((countryProfile: any) => {
    if (!search) return true;
    const searchLower = nfd(search.toLowerCase());
    const name = nfd((countryProfile.country?.name ?? "").toLowerCase());
    const region = nfd((countryProfile.country?.region?.name ?? "").toLowerCase());
    return name.includes(searchLower) || region.includes(searchLower);
  });

  const totalPages = Math.ceil((filtered?.length ?? 0) / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = filtered?.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setTotal(filtered?.length ?? 0);
    if (currentPage > totalPages) setCurrentPage(1);
  }, [filtered, totalPages, currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const updateCountryProfiles = () => {
    setRefresh(!refresh);
  };

  const handleVisibility = () => setIsVisible(!isVisible);
  const filterVisible = isVisible ? `block` : `hidden`;

  return (
    <>
      <Settings
        permissionsList={[
          "create:datamarket",
          "update:datamarket",
          "delete:datamarket",
        ]}
      >
        <Header
          title="Gestiona los perfiles de países"
          message="Agrega, edita y elimina los documentos de perfil de cada país. Cada perfil se muestra con la bandera del país y su región."
        />
        <div className="flex flex-col w-full p-4 space-y-2 sm:p-8 sm:space-y-0 sm:flex-row">
          <div className="flex items-center justify-start w-full text-xl font-semibold text-center text-black sm:text-left sm:w-4/12">
            Cantidad de perfiles: {total}
          </div>
          <div className="flex flex-col flex-wrap justify-end w-full h-full space-y-2 sm:space-y-0 sm:space-x-5 sm:flex-row sm:w-8/12">
            <button
              onClick={handleOpen}
              className={`text-white w-full sm:w-72 h-10 text-center bg-navy rounded-lg hover:shadow-lg font-semibold duration-300 hover:text-white/80`}
            >
              Agregar perfil de país
            </button>
            <button
              onClick={handleVisibility}
              className={`text-black flex flex-row justify-center items-center space-x-2 w-full sm:w-44 h-10 text-center bg-white rounded-lg hover:shadow-lg font-semibold duration-300 hover:text-black/80 border-2 border-black`}
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              <div>Filtrar</div>
            </button>
          </div>
        </div>
        <div
          className={`${filterVisible} flex flex-col-reverse sm:flex-row justify-end w-full px-4 gap-4 sm:space-x-5 sm:px-8`}
        >
          <input
            type="text"
            className="w-full px-2 rounded-lg sm:px-5 h-9 sm:w-72 ring-1 ring-gray-300"
            placeholder="Buscar por país o región..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex items-end justify-end -order-last sm:order-none">
            <button
              className="flex items-center justify-center w-10 h-10 text-white duration-300 bg-red-600 rounded-lg hover:bg-red-700"
              onClick={() => {
                setSearch("");
                setIsVisible(false);
              }}
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="w-full p-4 space-y-5 sm:p-8">
          {currentPageData?.length === 0 ? (
            <NotFound />
          ) : (
            <>
              <div className="grid items-center justify-between w-full h-24 grid-cols-3 p-5 font-bold text-center bg-white rounded-lg sm:grid-cols-4 lg:grid-cols-5 ring-2 ring-gray-100">
                <div>Bandera</div>
                <div>País</div>
                <div className="hidden sm:block">Región</div>
                <div className="hidden lg:block">Documento</div>
                <div>Acción</div>
              </div>
              {currentPageData?.map((countryProfile: any, key: number) => (
                <Card
                  key={key}
                  countryProfile={countryProfile}
                  updateCountryProfiles={updateCountryProfiles}
                />
              ))}

              <div className="flex flex-row items-center w-full py-4 space-x-3 sm:justify-end">
                <button
                  className={`text-black w-5/12 sm:w-32 h-8 text-center bg-gray-300 rounded-lg`}
                  disabled={currentPage === 1}
                  onClick={prevPage}
                >
                  Anterior
                </button>
                <div className="flex items-center justify-center w-10 h-10 text-black bg-white rounded-full sm:w-12 sm:h-12 ring-1 ring-gray-300">
                  {currentPage}/{totalPages}
                </div>
                <button
                  className={`text-black w-5/12 sm:w-32 h-8 text-center bg-gray-300 rounded-lg`}
                  disabled={currentPage === totalPages}
                  onClick={nextPage}
                >
                  Siguiente
                </button>
              </div>
            </>
          )}
        </div>
      </Settings>
      {open ? (
        <CountryProfileDialog
          open={open}
          handleOpen={handleOpen}
          updateCountryProfiles={updateCountryProfiles}
        />
      ) : null}
    </>
  );
}
