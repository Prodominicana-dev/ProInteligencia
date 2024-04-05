"use client";
import { Select } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccesoaMercados } from "@/src/services/accesoamercados/service";
import AccesoaMercado from "@/src/models/accesoamercado";
import { useProducts } from "@/src/services/products/service";
import { useCountries } from "@/src/services/countries/service";
import Country from "@/src/models/country";
import country from "@/src/models/country";
import Product from "@/src/models/product";
import React from "react";
import Link from "next/link";

export default function Page() {
  const { data: products } = useProducts();
  const { data: countries } = useCountries();
  const { data: accesoamercados } = useAccesoaMercados();
  const [countriesSelect, setCountriesSelect] = useState<any>([]);
  const [productSelect, setProductSelect] = useState<any>([]);
  const [originalCountriesSelect, setOriginalCountriesSelect] = useState<any>(
    []
  );
  const [originalProductSelect, setOriginalProductSelect] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (countries && accesoamercados) {
      const countryidAccesoaMercados = accesoamercados.map(
        (accesoamercado: AccesoaMercado) => accesoamercado.countryId
      );

      const country = countries
        .filter((country: Country) =>
          countryidAccesoaMercados.includes(country.id)
        ) // Utiliza filter en lugar de map
        .map((country: country) => ({
          value: country.id.toString(),
          label: country.name,
        }));
      setOriginalCountriesSelect(country);
      setCountriesSelect(country);
    }
    if (products && accesoamercados) {
      const productidAccesoaMercados = accesoamercados.map(
        (accesoamercado: AccesoaMercado) => accesoamercado.productId
      );
      const product = products
        .filter((product: Product) =>
          productidAccesoaMercados.includes(product.id)
        ) // Utiliza filter en lugar de map
        .map((product: Product) => ({
          value: product.id.toString(),
          label: `${product.name} - ${product.code}`,
        }));
      setOriginalProductSelect(product);
      setProductSelect(product);
    }
  }, [accesoamercados, countries, products]);

  // Función para manejar la selección de producto
  const handleProductChange = (value: any) => {
    if (!value) {
      setProductSelect(originalProductSelect);
      setCountriesSelect(originalCountriesSelect);
      setSelectedProduct(value);
      return;
    }
    setSelectedProduct(value);

    const countryidAccesoaMercados = accesoamercados
      .filter(
        (accesoamercado: AccesoaMercado) => accesoamercado.productId === value
      )
      .map((accesoamercado: AccesoaMercado) => accesoamercado.countryId);

    const countryOptions = countries
      .filter((country: Country) =>
        countryidAccesoaMercados.includes(country.id)
      )
      .map((country: country) => ({
        value: country.id.toString(),
        label: country.name,
      }));
    setCountriesSelect(countryOptions);
  };

  const handleCountryChange = (value: any) => {
    if (!value) {
      setProductSelect(originalProductSelect);
      setCountriesSelect(originalCountriesSelect);
      setSelectedCountry(value);
      return;
    }
    setSelectedCountry(value);

    // Filtrar los productos basados en los AccesoaMercado que tienen el país seleccionado
    const productidAccesoaMercados = accesoamercados
      .filter(
        (accesoamercado: AccesoaMercado) =>
          accesoamercado.countryId === Number(value)
      )
      .map((accesoamercado: AccesoaMercado) => accesoamercado.productId);

    const productOptions = products
      .filter((product: Product) =>
        productidAccesoaMercados.includes(product.id)
      )
      .map((product: Product) => ({
        value: product.id.toString(),
        label: `${product.name} - ${product.code}`,
      }));
    setProductSelect(productOptions);
  };

  // Función para manejar la búsqueda
  const handleSearch = () => {
    const accesoamercado = accesoamercados.find(
      (accesoamercado: AccesoaMercado) =>
        accesoamercado.productId === selectedProduct &&
        accesoamercado.countryId === Number(selectedCountry)
    );
    if (accesoamercado) {
      router.push(`/dashboard/accesoamercado/${accesoamercado.id}`);
    }
  };
  return (
    <div className="w-full h-[90vh]">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            className="object-cover w-full h-full"
            src="/videos/connection.mp4"
          ></video>
        </div>
        <div className="absolute inset-0 border-0 bg-navy/50"></div>
        <div className="relative flex flex-col items-center justify-center w-full h-full px-5 sm:px-0">
          <div className="text-5xl font-bold text-center text-white sm:w-8/12 lg:w-6/12 xl:w-4/12 sm:text-5xl">
            ¿Ya sabes qué necesitas para exportar?
          </div>
          <div className="mt-4 text-sm text-center text-white sm:w-8/12 lg:w-6/12 xl:w-4/12">
            Selecciona tu producto y país de destino, y obtén al instante las
            principales prescripciones técnicas y requisitos de acceso para
            exportar.
          </div>
          <div className="my-5 space-y-5 sm:flex sm:w-8/12 lg:w-6/12 xl:w-5/12 sm:space-y-0 sm:space-x-5">
            <Select
              className="w-full"
              size="xl"
              radius="md"
              rightSection={<></>}
              placeholder="Producto"
              data={productSelect ? productSelect : []}
              searchable
              nothingFoundMessage="Nothing found..."
              onChange={handleProductChange}
            />
            <Select
              className="w-full"
              size="xl"
              radius="md"
              rightSection={<></>}
              placeholder="País"
              data={countriesSelect ? countriesSelect : []}
              searchable
              nothingFoundMessage="Nothing found..."
              onChange={handleCountryChange}
            />
            <button
              {...(selectedCountry && selectedProduct
                ? {}
                : { disabled: true })}
              className={`flex justify-center items-center h-16 w-full sm:w-60 bg-navy text-white p-0 rounded-lg ${
                selectedCountry && selectedProduct
                  ? "hover:bg-navy/80"
                  : "cursor-not-allowed"
              }`}
              onClick={() => {
                handleSearch();
              }}
            >
              <IconSearch />
            </button>
          </div>
          <div className="w-full text-xs font-normal text-center text-white sm:w-6/12 sm:p-8">
            Si desea solicitar la incorporación de un reporte producto - mercado
            a esta herramienta, puede ponerse en contacto con ProDominicana a
            través de{" "}
            <Link href={"mailto:accesoamercado@prodominicana.gob.do"}>
              <span className="text-blue-400">
                accesoamercado@prodominicana.gob.do
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
