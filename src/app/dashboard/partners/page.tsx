"use client";
import Header from "@/src/components/home/header";
import Card from "@/src/components/partner/card";
import NotFound from "@/src/components/validate/notFound";
import { usePartners } from "@/src/services/partners/service";
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { nfd } from "unorm";
import React from "react";
const animatedComponents = makeAnimated();

export default function Page() {
  const { data, isLoading } = usePartners();
  const [partners, setPartners] = useState<any[]>([]);
  const [titleSearch, setTitleSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState<any>({
    label: "Categoría...",
    value: "",
  });
  const [categories] = useState<any[]>([
    { label: "Nacional", value: "nacional" },
    { label: "Internacional", value: "internacional" },
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const [partnersFiltered, setPartnersFiltered] = useState<any[]>([]);
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
    setPartnersFiltered(filteredAccesoaMercados);
  }, [partners, titleSearch, categorySearch]);
  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const filterVisible = isVisible ? `block` : `hidden`;

  useEffect(() => {
    setPartners(data);
  }, [data]);

  if (isLoading)
    return (
      <div className="flex flex-col w-full h-[90vh] items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <Header
        title="Fuentes Externas"
        message="Nuestra plataforma se nutre de una red diversa de fuentes externas para proporcionarte información precisa y actualizada. Explora la selección de enlaces a sitios web que albergan bases de datos e instituciones, tanto nacionales como internacionales, que ofrecen información de interés sobre el comercio internacional y la inversión extranjera directa."
      />
      <div className="flex flex-col w-full p-8 space-y-4">
        <div className="flex flex-row justify-end w-full">
          <button
            onClick={handleVisibility}
            className={`text-black flex flex-row justify-center items-center space-x-2 w-full sm:w-44 h-10 text-center bg-white rounded-full hover:shadow-lg font-semibold duration-300 hover:text-black/80 border-2 border-black`}
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5" />
            <div>Filtrar</div>
          </button>
        </div>
        <div
          className={`${filterVisible} flex flex-col-reverse  sm:flex-row justify-end w-full gap-4 sm:space-x-5 `}
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

        {partners?.length === 0 ? (
          <NotFound />
        ) : (
          <>
            {titleSearch === "" && categorySearch.label === "" ? (
              <>
                <div className="grid grid-cols-1 place-items-center sm:gap-8 sm:p-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {partners?.map((partner, key) => (
                    <Card partner={partner} key={key} />
                  ))}
                </div>
              </>
            ) : (
              <>
                {partnersFiltered?.length === 0 ? (
                  <NotFound />
                ) : (
                  <>
                    <div className="grid grid-cols-1 place-items-center sm:gap-8 sm:p-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                      {partnersFiltered?.map((partner, key) => (
                        <Card partner={partner} key={key} />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
