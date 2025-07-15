"use client";
import React, { useState, useEffect, ChangeEvent, useMemo } from "react";
import AlertaIED from "@/src/models/alertaIED";
import {
  PlusIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import SCard from "@/src/components/settings/alertaIED/card";
import AlertaIEDDialog from "@/src/components/settings/alertaIED/dialog";
import { Select } from "@mantine/core";
import Header from "@/src/components/settings/header";
import {
  useAlertasIEDPage,
  useAlertasIED,
  useAlertasIEDCategory,
} from "@/src/services/alertaIED/service";
import Category from "@/src/models/category";
import Settings from "@/src/components/validate/settings";
import NotFound from "@/src/components/validate/notFound";

export default function Page() {
  const [data, setData] = useState<AlertaIED[]>([]);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("Todos");
  const [open, setOpen] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [filterAlertasIED, setFilterAlertasIED] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");
  const [total, setTotal] = useState<number>(0);

  const { data: d, refetch } = useAlertasIED();
  const pagination = useAlertasIEDPage();
  const { data: categories, isLoading } = useAlertasIEDCategory();


  useEffect(() => {
    if (d) {
      setData(d);
      setTotal(d.length);
    }
  }, [d]);

  
  useEffect(() => {
    (async () => {
      const res = await refetch();
      if (res?.data) {
        setData(res.data);
        setTotal(res.data.length);
      }
      pagination.refetch();
    })();
  }, [refresh, refetch, pagination]);

  useEffect(() => {
    if (!isLoading && categories) {
      const names = categories.map((c: Category) => c.name);
      names.unshift("Todos");
      setFilterAlertasIED(names);
    }
  }, [categories, isLoading]);


  const handleOpen = () => setOpen((prev) => !prev);

  const handleFilterOpen = () => setFilterOpen((prev) => !prev);

  const handleFilter = (selectedCategory: string | null) => {
    const statusToFilter = status || "active";
    const categoryToFilter = selectedCategory || "Todos";
    setCategory(categoryToFilter);

    const filtered = data.filter((alerta) => {
      const matchCategory =
        categoryToFilter.toLowerCase() === "todos"
          ? true
          : alerta.category.name.toLowerCase() ===
            categoryToFilter.toLowerCase();
      const matchStatus =
        alerta.status.toLowerCase() === statusToFilter.toLowerCase();
      return matchCategory && matchStatus;
    });

    setTotal(filtered.length);
    setFilteredData(filtered);
  };

  const handleStatus = (selectedStatus: string | null) => {
    const statusToFilter = selectedStatus || "active";
    setStatus(statusToFilter);

    const filtered = data.filter((alerta) => {
      const matchStatus =
        alerta.status.toLowerCase() === statusToFilter.toLowerCase();
      const matchCategory =
        category.toLowerCase() === "todos"
          ? true
          : alerta.category.name.toLowerCase() === category.toLowerCase();
      return matchStatus && matchCategory;
    });

    setTotal(filtered.length);
    setFilteredData(filtered);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredData = useMemo(() => {
    let filteredByCategory =
      category.toLowerCase() === "todos"
        ? data
        : data.filter(
            (alerta) =>
              alerta.category.name.toLowerCase() === category.toLowerCase()
          );

    if (status) {
      filteredByCategory = filteredByCategory.filter(
        (alerta) => alerta.status.toLowerCase() === status.toLowerCase()
      );
    }

    if (!search) {
      setTotal(filteredByCategory.length);
      return filteredByCategory;
    }

    const filteredBySearch = filteredByCategory.filter(
      (alerta) =>
        alerta.title.toLowerCase().includes(search.toLowerCase()) ||
        alerta.category.name.toLowerCase().includes(search.toLowerCase())
    );

    setTotal(filteredBySearch.length);
    return filteredBySearch;
  }, [data, category, status, search]);

  
  const isVisible = filterOpen ? "visible" : "hidden";

  const [filteredDataState, setFilteredData] = useState<AlertaIED[]>([]);
  useEffect(() => {
    setFilteredData(filteredData);
  }, [filteredData]);

  const statusAlertasIED = [
    { label: "Publicados", value: "active" },
    { label: "Ocultos", value: "deleted" },
  ];


  const update = () => setRefresh((prev) => !prev);

  return (
    <>
      <Settings
        permissionsList={[
          "create:alertaIED",
          "update:alertaIED",
          "delete:alertaIED",
        ]}
      >
        <div>
          <div className="flex flex-col items-center justify-center w-full h-full">
            <Header
              title="Gestión de Alertas de IED"
              message="Tu centro de operaciones personal para alertas de IED. Agrega, edita y oculta información clave al instante. Toma el control de tus alertas."
            />
            <div className="flex flex-col w-full p-4 space-y-2 sm:p-8 sm:space-y-0 sm:flex-row ">
              <div className="flex items-center justify-start w-full text-xl font-semibold text-center text-black sm:text-left sm:w-4/12">
                Cantidad de alertas de IED: {total}
              </div>
              <div className="flex flex-col justify-end w-full h-full space-y-2 sm:w-8/12 sm:space-y-0 sm:space-x-8 sm:flex-row sm:flex-wrap">
                <button
                  onClick={handleOpen}
                  className={
                    total === 0
                      ? `flex items-center justify-center w-full h-10 gap-3 text-white duration-100 rounded-lg sm:rounded-full shadow-none bg-navy sm:w-44`
                      : `hidden`
                  }
                >
                  Crear alerta de IED
                </button>
                <input
                  type="text"
                  className="w-full h-10 px-5 rounded-full sm:80 lg:w-56 ring-2 ring-gray-300"
                  placeholder="Buscar..."
                  value={search}
                  onChange={handleSearchChange}
                />

                <button
                  onClick={handleFilterOpen}
                  className={`text-navy flex flex-row justify-center items-center space-x-2 w-full sm:w-44 h-10 text-center bg-white rounded-lg sm:border-full hover:shadow-lg font-semibold duration-300 hover:text-navy/80 border-2 border-navy`}
                >
                  <AdjustmentsHorizontalIcon className="w-5 h-5" />
                  <div>Filtrar</div>
                </button>
              </div>
            </div>

            <div
              className={`${isVisible} flex sm:flex-row flex-col w-full px-4 sm:px-8 pb-4 sm:space-x-8 space-y-2 sm:space-y-0 justify-center sm:justify-end`}
            >
              <div className="flex flex-col w-full space-y-2 sm:w-2/12">
                <label className="">Categorías</label>
                <Select
                  className="w-full"
                  size="md"
                  radius="md"
                  data={filterAlertasIED}
                  defaultValue="Todos"
                  searchable={false}
                  value={category}
                  onChange={(e: string | null) => handleFilter(e)}
                />
              </div>
              <div className="flex flex-col w-full space-y-2 sm:w-2/12">
                <label className="">Estado</label>
                <Select
                  className="w-full"
                  size="md"
                  radius="md"
                  data={statusAlertasIED}
                  placeholder="Estado"
                  searchable={false}
                  value={status}
                  onChange={(e: string | null) => handleStatus(e)}
                />
              </div>
              <div className="flex items-end justify-end">
                <button
                  className="flex items-center justify-center w-10 h-10 text-white duration-300 bg-red-600 rounded-lg hover:bg-red-700"
                  onClick={() => {
                    setFilterOpen(false);
                    setCategory("Todos");
                    setStatus("");
                    setSearch("");
                  }}
                >
                  <XMarkIcon className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {filteredDataState.length === 0 ? (
              <NotFound />
            ) : (
              <div className="grid w-full h-full grid-cols-1 gap-10 px-8 py-4 sm:grid-cols-2 lg:grid-cols-4 ">
                <button
                  className="hidden sm:flex items-center justify-center w-full duration-300 border-2 border-black border-dashed cursor-pointer h-[28rem] rounded-3xl hover:bg-gray-200"
                  onClick={handleOpen}
                >
                  <PlusIcon className="w-16 h-16 text-black" />
                </button>

                {filteredDataState.map((alertaIED) => (
                  <SCard key={alertaIED.id} data={alertaIED} update={update} />
                ))}
              </div>
            )}

            <AlertaIEDDialog
              open={open}
              handleOpen={handleOpen}
              update={update}
            />
          </div>
        </div>
      </Settings>
    </>
  );
}
