"use client";
import React from "react";
import { useEffect, useState } from "react";
import Card from "@/src/components/settings/accesoamercado/card";
import Header from "@/src/components/settings/header";
import { useAccesoaMercadosSettings } from "@/src/services/accesoamercados/service";
import { nfd } from "unorm";
import AccesoaMercadoCreateDialog from "@/src/components/settings/accesoamercado/dialogCreate";
import Settings from "@/src/components/validate/settings";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import NotFound from "@/src/components/validate/notFound";

export default function Page() {
  const { data, refetch } = useAccesoaMercadosSettings();
  const [accesoamercados, setAccesoaMercados] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [currentPageData, setCurrentPageData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  // const [startIndex, setStartIndex] = useState(
  //   (currentPage - 1) * itemsPerPage
  // );
  // const [endIndex] = useState(currentPage * itemsPerPage);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data?.length / itemsPerPage)
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    // Filtros iniciales
    let filteredAccesoaMercados = accesoamercados;

    // Filtrar por producto si se ha proporcionado una búsqueda de producto
    if (productSearch) {
      const productSearchLower = productSearch.toLowerCase();
      filteredAccesoaMercados = filteredAccesoaMercados?.filter(
        (accesoamercado) => {
          const productName = nfd(accesoamercado.product.name.toLowerCase());
          const productCode = nfd(accesoamercado.product.code.toLowerCase());
          return (
            productName.includes(productSearchLower) ||
            productCode.includes(productSearchLower)
          );
        }
      );
    }

    // Filtrar por país si se ha proporcionado una búsqueda de país
    if (countrySearch) {
      const countrySearchLower = countrySearch.toLowerCase();
      filteredAccesoaMercados = filteredAccesoaMercados?.filter(
        (accesoamercado) => {
          const countryName = nfd(accesoamercado.country.name.toLowerCase());
          return countryName.includes(countrySearchLower);
        }
      );
    }

    // Actualizar los totales y la página actual
    const filteredTotalPages = Math.ceil(
      filteredAccesoaMercados?.length / itemsPerPage
    );
    setTotalPages(filteredTotalPages);
    setTotal(filteredAccesoaMercados?.length);

    // Actualizar los datos de la página actual
    const newStartIndex = (currentPage - 1) * itemsPerPage;
    const newEndIndex = newStartIndex + itemsPerPage;
    setCurrentPageData(
      filteredAccesoaMercados?.slice(newStartIndex, newEndIndex)
    );

    // Asegurarse de que el currentPage se mantenga dentro de los límites
    if (currentPage > filteredTotalPages) {
      setCurrentPage(1);
    }
  }, [accesoamercados, currentPage, productSearch, countrySearch]);

  useEffect(() => {
    setAccesoaMercados(data);
    setTotal(data?.length);
  }, [data]);

  useEffect(() => {
    refetch().then((res) => {
      setAccesoaMercados(res.data);
      setTotal(data?.length);
    });
  }, [refresh, refetch]);

  const updateAccesoaMercados = () => {
    setRefresh(!refresh);
    setProductSearch("");
    setCountrySearch("");
    setIsVisible(false);
  };

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const filterVisible = isVisible ? `block` : `hidden`;
  return (
    <>
      <Settings
        permissionsList={[
          "create:accesoamercados",
          "update:accesoamercados",
          "delete:accesoamercados",
        ]}
      >
        <Header
          title="Gestión de los Accesos a Mercado"
          message="Tu centro de operaciones personal para los Accesos a Mercado. Agrega, edita y oculta información clave al instante. Toma el control de tus Accesos a Mercados."
        />
        <div className="flex flex-col w-full p-4 space-y-2 sm:p-8 sm:space-y-0 sm:flex-row">
          <div className="flex items-center justify-start w-full text-xl font-semibold text-center text-black sm:text-left sm:w-4/12">
            Cantidad de Acceso a Mercado: {total}
          </div>
          <div className="flex flex-col flex-wrap justify-end w-full h-full space-y-2 sm:space-y-0 sm:space-x-5 sm:flex-row sm:w-8/12">
            <button
              onClick={handleOpen}
              className={`text-white w-full sm:w-44 h-10 text-center bg-navy rounded-lg hover:shadow-lg font-semibold duration-300 hover:text-white/80`}
            >
              Crear Acceso a Mercado
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
          className={`${filterVisible} flex flex-row justify-end w-full px-4 space-x-5 sm:px-8`}
        >
          <input
            type="text"
            className="w-full h-10 px-5 rounded-full sm:w-72 ring-2 ring-gray-300"
            placeholder="Buscar por producto..."
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
          />
          <input
            type="text"
            className="w-full h-10 px-5 rounded-full sm:w-72 ring-2 ring-gray-300"
            placeholder="Buscar por país..."
            value={countrySearch}
            onChange={(e) => setCountrySearch(e.target.value)}
          />
        </div>

        <div className="w-full p-4 space-y-5 sm:p-8">
          {currentPageData?.length === 0 ? (
            <NotFound />
          ) : (
            <>
              <div className="grid items-center justify-between w-full h-24 grid-cols-3 p-5 font-bold text-center bg-white rounded-lg sm:grid-cols-4 ring-2 ring-gray-100">
                <div className="text-center">Producto</div>
                <div className="hidden sm:block">Código</div>
                <div>País</div>
                <div>Acción</div>
              </div>
              {currentPageData?.map((accesoamercado: any, key: number) => {
                return (
                  <Card
                    key={key}
                    accesoamercado={accesoamercado}
                    updateAccesoaMercados={updateAccesoaMercados}
                  />
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
        {open ? (
          <AccesoaMercadoCreateDialog
            open={open}
            handleOpen={handleOpen}
            updateAccesoaMercado={updateAccesoaMercados}
            title={"Crear Acceso a Mercado"}
          />
        ) : null}
      </Settings>
    </>
  );
}
