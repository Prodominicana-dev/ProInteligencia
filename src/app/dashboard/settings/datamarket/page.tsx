"use client";
import React from "react";
import { useEffect, useState } from "react";
import Header from "@/src/components/settings/header";
import {
  useAllDataMarkets,
  useDataMarketsCategories,
  useOnlyCategories,
} from "@/src/services/datamarket/service";
import { nfd } from "unorm";
import Card from "@/src/components/settings/datamarket/card";
import DatamarketDialog from "@/src/components/settings/datamarket/dialog";
import Settings from "@/src/components/validate/settings";
import NotFound from "@/src/components/validate/notFound";
import DataMarket from "@/src/models/datamarket";
import SortCategory from "@/src/components/settings/datamarket/categoryPriority";

export default function Page() {
  const { data, refetch } = useAllDataMarkets();
  const [datamarket, setDatamarket] = useState<DataMarket[]>([]);
  const { data: categories, refetch: categoriesRefetch } = useOnlyCategories();
  const { refetch: sidebarCategoriesRefetch }: any = useDataMarketsCategories();
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const handleCategoryOpen = () => setCategoryOpen(!categoryOpen);
  const [currentPageData, setCurrentPageData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data?.length / itemsPerPage)
  );

  const nextPage = () => {
    if (currentPage < datamarket.length / itemsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (search) {
      const filteredDatamarkets = datamarket.filter((datamarket) => {
        const title = nfd(datamarket.title.toLowerCase());
        const url = nfd(datamarket.url.toLowerCase());
        const _search = search.toLowerCase();
        return title.includes(_search) || url.includes(_search);
      });
      const filteredTotalPages = Math.ceil(
        filteredDatamarkets.length / itemsPerPage
      );
      setTotalPages(filteredTotalPages);
      setTotal(filteredDatamarkets?.length);
      if (currentPage > filteredTotalPages) {
        setCurrentPage(1);
      }
      return setCurrentPageData(
        filteredDatamarkets?.slice(startIndex, endIndex)
      );
    }
    const normalTotalPages = Math.ceil(datamarket?.length / itemsPerPage);
    setTotalPages(normalTotalPages);
    setTotal(datamarket?.length);
    setCurrentPageData(datamarket?.slice(startIndex, endIndex));
  }, [datamarket, data, currentPage, search]);

  useEffect(() => {
    setDatamarket(data);
    setTotal(data?.length);
  }, [data]);

  //const pagination = useAlertaComercialesPage();

  useEffect(() => {
    refetch().then((res) => {
      setDatamarket(res.data);
      setTotal(res.data?.length);
    });

    categoriesRefetch();
    sidebarCategoriesRefetch();
    //pagination.refetch();
  }, [refresh]);

  const updateDatamarkets = () => {
    setRefresh(!refresh);
  };

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
          title="Gestión de Datamarket"
          message="Tu centro de operaciones personal para Datamarket. Agrega, edita y oculta información clave al instante. Toma el control de tus Datamarket."
        />
        <div className="flex flex-col w-full p-4 space-y-2 sm:p-8 sm:space-y-0 sm:flex-row">
          <div className="flex items-center justify-start w-full text-xl font-semibold text-center text-black sm:text-left sm:w-4/12">
            Cantidad de datamarket: {total}
          </div>
          <div className="flex flex-col justify-end w-full h-full space-y-2 sm:space-y-0 sm:space-x-8 sm:flex-wrap sm:flex-row">
            <button
              onClick={handleCategoryOpen}
              className={`text-white w-full sm:w-52 text-center bg-navy h-10 rounded-lg hover:shadow-lg font-semibold duration-300 hover:text-white/80`}
            >
              Ordenar Datamarkets
            </button>
            <button
              onClick={handleOpen}
              className={`text-white w-full sm:w-52 text-center bg-navy h-10 rounded-lg hover:shadow-lg font-semibold duration-300 hover:text-white/80`}
            >
              Crear Datamarket
            </button>
            <input
              type="text"
              className="w-full h-10 px-5 rounded-full sm:w-72 ring-2 ring-gray-300"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full p-4 space-y-5 sm:p-8">
          {currentPageData?.length === 0 ? (
            <NotFound />
          ) : (
            <>
              <div className="grid items-center justify-between w-full h-24 grid-cols-3 p-5 font-bold text-center bg-white rounded-lg sm:grid-cols-5 ring-2 ring-gray-100">
                <div className="text-center">Título</div>
                <div className="hidden sm:block">Url</div>
                <div className="hidden sm:block">Categoría</div>
                <div>Estado</div>
                <div>Acción</div>
              </div>

              {currentPageData?.map((datamarket: any, key: number) => {
                return (
                  <Card
                    key={key}
                    datamarket={datamarket}
                    updateDatamarkets={updateDatamarkets}
                  />
                );
              })}

              <div className="flex flex-row items-center justify-end w-full py-4 space-x-3">
                <button
                  className={`text-black w-32 h-8 text-center bg-gray-300 rounded-lg`}
                  disabled={currentPage === 1 ? true : false}
                  onClick={prevPage}
                >
                  Anterior
                </button>
                <div className="flex items-center justify-center w-12 h-12 text-black bg-white rounded-full ring-1 ring-gray-300">
                  {currentPage}/{totalPages}
                </div>
                <button
                  className={`text-black w-32 h-8 text-center bg-gray-300 rounded-lg`}
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
          <DatamarketDialog
            open={open}
            handleOpen={handleOpen}
            updateDatamarkets={updateDatamarkets}
          />
        ) : null}
        {categoryOpen ? (
          <SortCategory
            categories={categories}
            open={categoryOpen}
            handleOpen={handleCategoryOpen}
            updateDatamarkets={updateDatamarkets}
          />
        ) : null}
      </Settings>
    </>
  );
}
