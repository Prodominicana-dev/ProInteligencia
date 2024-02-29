"use client";
import React from "react";
import { useEffect, useState } from "react";
import Header from "@/src/components/settings/header";
import { nfd } from "unorm";
import Settings from "@/src/components/validate/settings";
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import NotFound from "@/src/components/validate/notFound";
import { usePartners } from "@/src/services/partners/service";
import PartnerDialog from "@/src/components/settings/partner/dialog";
import Card from "@/src/components/settings/partner/card";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function Page() {
  const { data, refetch } = usePartners();
  const [partners, setPartners] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [titleSearch, setTitleSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState<any>({
    label: "Categoría...",
    value: "",
  });
  const [categories] = useState<any[]>([
    { label: "Nacional", value: "nacional" },
    { label: "Internacional", value: "internacional" },
  ]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [currentPageData, setCurrentPageData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(
    (currentPage - 1) * itemsPerPage
  );
  const [endIndex] = useState(currentPage * itemsPerPage);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data?.length / itemsPerPage)
  );

  const nextPage = () => {
    if (currentPage < partners.length / itemsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setPartners(data);
    setTotal(data?.length || 0);
    setTotalPages(Math.ceil(data?.length / itemsPerPage));
  }, [data]);

  useEffect(() => {
    refetch().then((res) => {
      setPartners(res.data);
      setTotal(data?.length || 0);
      setTotalPages(Math.ceil(data?.length / itemsPerPage));
    });
  }, [refresh, refetch]);

  useEffect(() => {
    // Filtros iniciales
    let filteredAccesoaMercados = partners;
    // Filtrar por país si se ha proporcionado una búsqueda de país
    if (titleSearch) {
      const titleSearchLower = titleSearch.toLowerCase();
      filteredAccesoaMercados = filteredAccesoaMercados.filter((source) => {
        const title = nfd(source.title.toLowerCase());
        return title.includes(titleSearchLower);
      });
    }

    if (categorySearch.value) {
      filteredAccesoaMercados = filteredAccesoaMercados.filter((source) => {
        const category = nfd(source.type.toLowerCase());
        return category === categorySearch.value;
      });
    }

    // Actualizar los totales y la página actual
    const filteredTotalPages = Math.ceil(
      filteredAccesoaMercados?.length / itemsPerPage
    );
    setTotalPages(filteredTotalPages);
    setTotal(filteredAccesoaMercados?.length);

    if (currentPage > filteredTotalPages) {
      setCurrentPage(1);
    }

    // Actualizar los datos de la página actual
    setCurrentPageData(filteredAccesoaMercados?.slice(startIndex, endIndex));
  }, [partners, currentPage, titleSearch, categorySearch]);

  useEffect(() => {
    setStartIndex((currentPage - 1) * itemsPerPage);
    const endIndex = startIndex + itemsPerPage;
    setCurrentPageData(partners?.slice(startIndex, endIndex));
  }, [partners, currentPage]);

  const updatePartners = () => {
    setRefresh(!refresh);
  };

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const filterVisible = isVisible ? `block` : `hidden`;

  const animatedComponents = makeAnimated();
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
          title="Gestiona tus fuentes externas"
          message="Tu centro de operaciones personal para gestionar las fuentes externas. Agrega, edita y oculta información clave al instante."
        />
        <div className="flex flex-col w-full p-4 space-y-2 sm:p-8 sm:space-y-0 sm:flex-row">
          <div className="flex items-center justify-start w-full text-xl font-semibold text-center text-black sm:text-left sm:w-4/12">
            Cantidad de fuentes: {total}
          </div>
          <div className="flex flex-col flex-wrap justify-end w-full h-full space-y-2 sm:space-y-0 sm:space-x-5 sm:flex-row sm:w-8/12">
            <button
              onClick={handleOpen}
              className={`text-white w-full sm:w-72 h-10 text-center bg-navy rounded-lg hover:shadow-lg font-semibold duration-300 hover:text-white/80`}
            >
              Agregar fuente externa
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
          className={`${filterVisible} flex flex-col-reverse  sm:flex-row justify-end w-full px-4 gap-4 sm:space-x-5 sm:px-8`}
        >
          <input
            type="text"
            className="w-full px-2 rounded-lg sm:px-5 h-9 sm:w-72 ring-1 ring-gray-300"
            placeholder="Buscar por título..."
            value={titleSearch}
            onChange={(e) => setTitleSearch(e.target.value)}
          />
          <div className="w-full sm:w-72">
            <Select
              closeMenuOnSelect={true}
              components={animatedComponents}
              isMulti={false}
              placeholder={
                categorySearch.label === ""
                  ? "Categoría..."
                  : categorySearch.label
              }
              value={categorySearch.label}
              onChange={(e) => setCategorySearch(e)}
              options={categories}
            />
          </div>
          <div className="flex items-end justify-end -order-last sm:order-none">
            <button
              className="flex items-center justify-center w-10 h-10 text-white duration-300 bg-red-600 rounded-lg hover:bg-red-700"
              onClick={() => {
                setTitleSearch("");
                setCategorySearch({ label: "", value: "" });
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
              <div className="grid items-center justify-between w-full h-24 grid-cols-3 p-5 font-bold text-center bg-white rounded-lg sm:grid-cols-4 ring-2 ring-gray-100">
                <div className="text-center">Título</div>
                <div>Categoría</div>
                <div className="hidden sm:block">URL</div>
                <div>Acción</div>
              </div>
              {currentPageData?.map((source: any, key: number) => {
                return (
                  <Card key={key} source={source} update={updatePartners} />
                );
              })}

              <div className="flex flex-row items-center w-full py-4 space-x-3 sm:justify-end">
                <button
                  className={`text-black  w-5/12 sm:w-32 h-8 text-center bg-gray-300 rounded-lg`}
                  disabled={currentPage === 1 ? true : false}
                  onClick={prevPage}
                >
                  Anterior
                </button>
                <div className="flex items-center justify-center w-10 h-10 text-black bg-white rounded-full sm:w-12 sm:h-12 ring-1 ring-gray-300">
                  {currentPage}/{totalPages}
                </div>
                <button
                  className={`text-black w-5/12 sm:w-32 h-8 text-center bg-gray-300 rounded-lg`}
                  disabled={currentPage === totalPages ? true : false}
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
        <>
          <PartnerDialog
            open={open}
            handleOpen={handleOpen}
            update={updatePartners}
          />
        </>
      ) : null}
    </>
  );
}
