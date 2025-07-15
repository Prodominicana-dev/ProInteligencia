"use client";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
  IconButton,
  Tabs,
  Tab,
  TabPanel,
  TabsBody,
  TabsHeader,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import TextEditor from "../rich-editor";
import {
  useAccesoaMercado,
  useAccesoaMercados,
} from "@/src/services/accesoamercados/service";
import Editor from "../rich-editor/config";
import { useSelectProducts } from "@/src/services/products/service";
import { useSelectCountries } from "@/src/services/countries/service";
import AccesoaMercado from "@/src/models/accesoamercado";
import React from "react";

const animatedComponents = makeAnimated();
function isValidDateString(dateStr: string) {
  return /^\d{2}\/\d{2}\/\d{4}$/.test(dateStr);
}

function parseDateString(dateStr: string): Date | null {
  if (!isValidDateString(dateStr)) return null;

  const [day, month, year] = dateStr.split("/").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  ) {
    return date;
  }
  return null;
}

function normalizeDateInput(dateStr: string): string {
  const parts = dateStr.split("/");
  if (parts.length !== 3) return dateStr;

  let [day, month, year] = parts;
  if (day.length === 1) day = "0" + day;
  if (month.length === 1) month = "0" + month;

  return `${day}/${month}/${year}`;
}

export default function AccesoaMercadoEditDialog({
  accesoamercado,
  open,
  handleOpen,
  updateAccesoaMercado,
  title,
}: {
  accesoamercado?: any;
  open: boolean;
  handleOpen: () => void;
  updateAccesoaMercado: () => void;
  title: string;
}) {
  const { data: products }: any = useSelectProducts();
  const { data: countries }: any = useSelectCountries();
  const { data: accesoamercados } = useAccesoaMercados();
  const [countriesSelect, setCountriesSelect] = useState<any>([]);
  const [productSelect, setProductSelect] = useState<any>([]);
  const [selectedCountries, setSelectedCountries] = useState<any>([]);
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const { data, isLoading } = useAccesoaMercado(accesoamercado?.id);
  const [accesoamercadoData, setAccesoaMercadoData] = useState<any>([]);
  const [outputRequirement, setOutputRequirement] = useState<any>("");
  const [productDATE, setProductDATE] = useState<any>("");
  const [importRequirement, setImportRequirement] = useState<any>("");
  const [technicalRequirements, setTechnicalRequirements] = useState<any>("");
  const [permitsCertifications, setPermitsCertifications] = useState<any>("");
  const [labelingCertifications, setLabelingCertifications] = useState<any>("");
  const [tradeAgreement, setTradeAgreement] = useState<any>("");
  const [tariffsImposed, setTariffsImposed] = useState<any>("");
  const [webResource, setWebResource] = useState<any>("");
  const [isLoadin, setIsLoadin] = useState(false);

  // console.log("data", data);

  // const date = new Date(data.date);
  // const day = String(date.getDate()).padStart(2, "0");
  // const month = String(date.getMonth() + 1).padStart(2, "0");
  // const year = date.getFullYear();
  // const formattedDate = `${day}/${month}/${year}`;

  const outputReq = Editor({
    placeholder: "Requisitos de exportacion...",
    content: data?.outputRequirement,
  });
  const importReq = Editor({
    placeholder: "Requisitos de importación...",
    content: data?.importRequirement,
  });
  const regTecnicas = Editor({
    placeholder: "Regulaciones técnicas...",
    content: data?.technicalRequirements,
  });
  const permCertf = Editor({
    placeholder: "Permisos y certificaciones...",
    content: data?.permitsCertifications,
  });
  const etiquetado = Editor({
    placeholder: "Etiquetado...",
    content: data?.labelingCertifications,
  });
  const acComerciales = Editor({
    placeholder: "Acuerdos comerciales...",
    content: data?.tradeAgreement,
  });
  const impAran = Editor({
    placeholder: "Impuestos y aranceles...",
    content: data?.tariffsImposed,
  });
  const recursos = Editor({
    placeholder: "Recursos web...",
    content: data?.webResource,
  });

  useEffect(() => {
    const accesoamercadodata = [
      {
        label: "Requerimientos salida",
        value: "salida",
        editor: outputReq,
      },
      {
        label: "Requisitos importación",
        value: "importacion",
        editor: importReq,
      },
      {
        label: "Regulaciones técnicas",
        value: "regulaciones",
        editor: regTecnicas,
      },
      {
        label: "Permisos y certificaciones",
        value: "certificaciones",
        editor: permCertf,
      },
      {
        label: "Etiquetado",
        value: "etiquetado",
        editor: etiquetado,
      },
      {
        label: "Acuerdos comerciales",
        value: "acuerdos",
        editor: acComerciales,
      },
      {
        label: "Impuestos y aranceles",
        value: "aranceles",
        editor: impAran,
      },
      {
        label: "Recursos web",
        value: "recursosweb",
        editor: recursos,
      },
    ];
    setAccesoaMercadoData(accesoamercadodata);
  }, [
    outputReq,
    importReq,
    regTecnicas,
    permCertf,
    etiquetado,
    acComerciales,
    impAran,
    recursos,
  ]);

  useEffect(() => {
    if (countries && accesoamercados) {
      setCountriesSelect(countries);
    }
    if (products && accesoamercados) {
      setProductSelect(products);
    }
  }, [accesoamercados, countries, products, open]);

  const handleProductChange = (product: any) => {
    const countriesWithProduct = accesoamercados
      .filter(
        (accesoamercado: AccesoaMercado) =>
          accesoamercado.productId === product.value.id
      )
      .map((accesoamercado: AccesoaMercado) => accesoamercado.countryId);

    // console.log(countriesWithProduct);

    const updatedCountries = countries.filter(
      (country: any) =>
        !countriesWithProduct.some(
          (selectedCountry: any) => selectedCountry === country.value.id
        )
    );
    setSelectedProducts(product);
    setCountriesSelect(updatedCountries);
  };

  const handleCountryChange = (country: any) => {
    const productsWithCountries = accesoamercados
      .filter(
        (accesoamercado: AccesoaMercado) =>
          accesoamercado.countryId === country.value.id
      )
      .map((accesoamercado: AccesoaMercado) => accesoamercado.productId);

    const updatedProducts = products.filter(
      (product: any) =>
        !productsWithCountries.some(
          (selectedProduct: any) => selectedProduct === product.value.id
        )
    );
    setSelectedCountries(country);
    setProductSelect(updatedProducts);
  };

  useEffect(() => {
    if (!isLoading && data && countries && products) {
      const accesoamercadoCountry = countries.find(
        (country: any) => country.value.id === data.country?.id
      );
      setSelectedCountries(accesoamercadoCountry);

      const accesoamercadoProduct = products.find(
        (product: any) => product.value.id === data.product?.id
      );
      setSelectedProducts(accesoamercadoProduct);

      outputReq?.commands?.setContent(data?.outputRequirement);
      importReq?.commands?.setContent(data?.importRequirement);
      regTecnicas?.commands?.setContent(data?.technicalRequirements);
      permCertf?.commands?.setContent(data?.permitsCertifications);
      etiquetado?.commands?.setContent(data?.labelingCertifications);
      acComerciales?.commands?.setContent(data?.tradeAgreement);
      impAran?.commands?.setContent(data?.tariffsImposed);
      recursos?.commands?.setContent(data?.webResource);

      setOutputRequirement(data?.outputRequirement);
      setImportRequirement(data?.importRequirement);
      setTechnicalRequirements(data?.technicalRequirements);
      setPermitsCertifications(data?.permitsCertifications);
      setLabelingCertifications(data?.labelingCertifications);
      setTradeAgreement(data?.tradeAgreement);
      setTariffsImposed(data?.tariffsImposed);
      setWebResource(data?.webResource);

      if (data?.date) {
        const date = new Date(data.date);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        setProductDATE(formattedDate);
      }
    }
  }, [data, isLoading, countries, products]);

  useEffect(() => {
    setOutputRequirement(outputReq?.getHTML());
    setImportRequirement(importReq?.getHTML());
    setTechnicalRequirements(regTecnicas?.getHTML());
    setPermitsCertifications(permCertf?.getHTML());
    setLabelingCertifications(etiquetado?.getHTML());
    setTradeAgreement(acComerciales?.getHTML());
    setTariffsImposed(impAran?.getHTML());
    setWebResource(recursos?.getHTML());
  }, [
    outputReq?.getHTML(),
    importReq?.getHTML(),
    regTecnicas?.getHTML(),
    permCertf?.getHTML(),
    etiquetado?.getHTML(),
    acComerciales?.getHTML(),
    impAran?.getHTML(),
    recursos?.getHTML(),
  ]);

  const handleSubmit = async () => {
    setIsLoadin(true);
    const normalizedDateStr = productDATE
      ? normalizeDateInput(productDATE)
      : "";
   if (normalizedDateStr && !isValidDateString(normalizedDateStr)) {
    setIsLoadin(false);
    notifications.show({
      title: "Fecha inválida",
      message: "Por favor ingrese una fecha válida en formato dd/mm/aaaa.",
      color: "red",
      autoClose: 5000,
    });
    return;
  }

    const parsedDate = normalizedDateStr ? parseDateString(normalizedDateStr) : null;

  if (normalizedDateStr && !parsedDate) {
    setIsLoadin(false);
    notifications.show({
      title: "Fecha inválida",
      message: "Por favor ingrese una fecha válida en formato dd/mm/aaaa.",
      color: "red",
      autoClose: 5000,
    });
    return;
  }

    const data = {
      countryId: Number(selectedCountries.value.id),
      productId: selectedProducts.value.id,
      outputRequirement: outputRequirement,
      importRequirement: importRequirement,
      technicalRequirements: technicalRequirements,
      permitsCertifications: permitsCertifications,
      labelingCertifications: labelingCertifications,
      tradeAgreement: tradeAgreement,
      tariffsImposed: tariffsImposed,
      webResource: webResource,
      date: parsedDate ? parsedDate.toISOString() : null,
    };
    // console.log(data.outputRequirement);
    if (!accesoamercado) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/accesoamercado`,
        data
      );
      if (res.status < 300) {
        notifications.show({
          title: "Acceso a Mercado creado correctamente",
          message: "El Acceso a Mercado se creó correctamente.",
          color: "teal",
          autoClose: 5000,
        });
        updateAccesoaMercado();
        handleOpen();
        setIsLoadin(false);
        return;
      }
      notifications.show({
        title: "Error creando el Acceso a Mercado",
        message: "Ha ocurrido un error, intenta nuevamente.",
        color: "red",
        autoClose: 5000,
      });
      setIsLoadin(false);
      return;
    }
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/accesoamercado/${accesoamercado.id}`,
      data
    );

    if (res.status === 200) {
      notifications.show({
        title: "Acceso a Mercado actualizado correctamente",
        message: "El Acceso a Mercado se actualizó correctamente.",
        color: "teal",
        autoClose: 5000,
      });
      updateAccesoaMercado();
      handleOpen();
      setIsLoadin(false);
      return;
    }
    notifications.show({
      title: "Error actualizando el Acceso a Mercado",
      message: "Ha ocurrido un error, intenta nuevamente.",
      color: "red",
      autoClose: 5000,
    });
    setIsLoadin(false);
    return;
  };

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size={"xl"}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="flex flex-col h-screen"
    >
      <DialogHeader className="justify-end">
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={() => {
            handleOpen();
          }}
        >
          <XMarkIcon className="m-2 w-7" />
        </IconButton>
      </DialogHeader>

      <DialogBody className=" justify-center h-[100vh] overflow-y-auto font-normal no-scrollbar">
        <div className="flex justify-center ">
          <div className="flex-col w-full space-y-4 sm:w-11/12">
            <p className="w-full text-3xl font-bold text-black">{title}</p>

            <div className="flex flex-row w-full space-x-8">
              <div className="w-6/12">
                <div className="text-lg font-bold text-black">
                  Seleccione el país del Acceso a Mercado
                </div>
                <Select
                  components={animatedComponents}
                  isMulti={false}
                  placeholder="Seleccione el país..."
                  onChange={(e) => handleCountryChange(e)}
                  value={selectedCountries}
                  options={countriesSelect}
                  className="z-[9999] "
                />
              </div>

              <div className="w-6/12">
                <div className="text-lg font-bold text-black">
                  Seleccione el producto del Acceso a Mercado
                </div>
                <Select
                  components={animatedComponents}
                  isMulti={false}
                  placeholder="Seleccione el producto..."
                  onChange={(e) => handleProductChange(e)}
                  value={selectedProducts}
                  options={productSelect}
                  className="z-[9999] "
                />
              </div>
              <div className="w-6/12">
                <div className="text-lg font-bold text-black">Fecha</div>
                <div className="react-select-container">
                  <div
                    className="react-select__control"
                    style={{
                      padding: "6px 12px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="dd/mm/aaaa"
                      value={productDATE}
                      onChange={(e) => setProductDATE(e.target.value)}
                      className="w-full text-base  text-black focus:outline-none bg-transparent"
                      style={{
                        border: "none",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 ">
              <div className="hidden sm:block">
                <UnderlineTabs data={accesoamercadoData} />
              </div>
              <div className="block sm:hidden">
                {accesoamercadoData.map(
                  ({ label, editor }: any, index: number) => (
                    <div className="p-2" key={index}>
                      <SectionAccesoaMercado title={label} editor={editor} />
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex justify-end w-full h-12 my-5">
              <Button
                color="green"
                disabled={
                  selectedCountries === null ||
                  selectedProducts === null ||
                  outputRequirement === "" ||
                  importRequirement === "" ||
                  technicalRequirements === "" ||
                  permitsCertifications === "" ||
                  labelingCertifications === "" ||
                  tradeAgreement === "" ||
                  tariffsImposed === "" ||
                  webResource === "" ||
                  isLoadin
                }
                onClick={!isLoadin ? handleSubmit : () => {}}
              >
                {isLoadin ? <Spinner /> : "Actualizar"}
              </Button>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}

function UnderlineTabs({ data }: any) {
  const [activeTab, setActiveTab] = useState("salida");

  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="flex flex-wrap justify-center p-0 bg-white rounded-none"
        indicatorProps={{
          className:
            "bg-gradient-to-r from-purple-700 to-sky-500 shadow-none rounded-none w-[80vw] sm:w-[9vw] lg:w-[8vw]",
        }}
      >
        {data.map(({ label, value }: any, index: number) => (
          <Tab
            key={index}
            value={value}
            onClick={() => setActiveTab(value)}
            className={`${
              activeTab === value ? "text-gray-900 w-full" : "bg-white"
            } py-0 px-0 w-[80vw] sm:w-[9vw] lg:w-[8vw]`}
          >
            <div className="bg-white w-[80vw] sm:w-[9vw] lg:w-[8vw] h-16 grow ml-2 sm:ml-0 sm:mb-0.5 lg:mb-1 flex items-center justify-center  sm:text-[10px] lg:text-sm">
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ label, value, editor }: any, index: number) => (
          <TabPanel className="p-0" key={index} value={value}>
            <SectionAccesoaMercado title={label} editor={editor} />
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}

function SectionAccesoaMercado({ title, editor }: any) {
  return (
    <div className="text-lg font-normal text-black">
      <p className="text-lg font-bold text-black">{title}</p>
      <TextEditor editor={editor} />
    </div>
  );
}
