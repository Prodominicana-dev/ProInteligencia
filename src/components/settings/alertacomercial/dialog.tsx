"use client";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import AlertaComercial from "@/src/models/alertacomercial";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { Group } from "@mantine/core";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ProductPopover from "../products/popover";
import TextEditor from "../rich-editor";
import Editor from "../rich-editor/config";
import Category from "@/src/models/category";
import { useAlertaComercialesCategory } from "@/src/services/alertacomercial/service";
import { useSelectCountries } from "@/src/services/countries/service";
import { useSelectProducts } from "@/src/services/products/service";
import React from "react";

const animatedComponents = makeAnimated();

export default function AlertaComercialDialog({
  alertacomercial,
  open,
  handleOpen,
  update,
}: {
  alertacomercial?: AlertaComercial;
  open: boolean;
  handleOpen: () => void;
  update: () => void;
}) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [description] = useState<any>("");
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const { data: categories, isLoading } = useAlertaComercialesCategory();
  const [category, setCategory] = useState<any>();
  const { data: productsSelect }: any = useSelectProducts();
  const { data: countries }: any = useSelectCountries();
  const [selectedCountries, setSelectedCountries] = useState<any>([]);
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [openProduct, setOpenProduct] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { refetch } = useSelectProducts();
  const [isLoadin, setIsLoadin] = useState(false);

  const openRef = useRef<() => void>(null);
  const handleClickSelectFile = () => {
    if (openRef.current) {
      openRef.current(); // solo se llama si openRef.current no es null
    }
  };

  useEffect(() => {
    setProducts(productsSelect);
  }, [productsSelect]);

  useEffect(() => {
    if (categories) {
      setCategory(categories[0]);
    }
  }, [categories]);

  const handleOpenProduct = () => {
    setOpenProduct(!openProduct);
  };
  useEffect(() => {
    refetch().then((res) => {
      setProducts(res.data);
    });
    //pagination.refetch();
  }, [refresh, refetch]);

  const updateProducts = () => {
    setRefresh(!refresh);
  };

  const editor1 = Editor({
    placeholder: "Contenido de la alerta comercial",
    content: alertacomercial?.description,
  });

  useEffect(() => {
    if (alertacomercial) {
      editor1?.commands.insertContent(alertacomercial.description);
      setTitle(alertacomercial.title);
      setCategory(alertacomercial.category);
      setIsPublic(alertacomercial.isPublic);
      const alertacomercialCountries = alertacomercial.countries?.map(
        (country: any) => {
          return { value: country, label: country.name };
        }
      );
      setSelectedCountries(alertacomercialCountries);
      const alertacomercialProducts = alertacomercial.products?.map(
        (product: any) => {
          return { value: product, label: `${product.name} - ${product.code}` };
        }
      );
      setSelectedProducts(alertacomercialProducts);
    }
  }, [alertacomercial]);

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  };
  const isHovering =
    files.length > 0
      ? "group-hover:bg-black/30"
      : "text-black border-black group-hover:border-black/70 group-hover:text-black/70 duration-300";

  const handleSubmit = async (published?: boolean) => {
    setIsLoadin(true);

    const formData = new FormData();

    const products = selectedProducts.map((product: any) => product.value);
    const countries = selectedCountries.map((country: any) => country.value);

    formData.append("title", title);
    formData.append(
      "description",
      editor1?.getHTML() !== undefined ? editor1?.getHTML() : ""
    );
    formData.append("categoryId", category?.id.toString());
    formData.append("countries", JSON.stringify(countries));
    formData.append("products", JSON.stringify(products));
    formData.append("isPublic", isPublic ? "true" : "false");

    if (files.length > 0) {
      formData.append("file", files[0]);
    }

    if (published) {
      formData.append("published", published.toString());
    }

    if (!alertacomercial) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/alertacomercial`,
        formData
      );
      if (res.status === 200) {
        notifications.show({
          id: "alertacomercial",
          autoClose: 5000,
          withCloseButton: false,
          title: "Alerta Comercial creada",
          message: "La Alerta Comercial ha sido creada correctamente.",
          color: "green",
          loading: false,
        });
        handleOpen();
        update();
        setIsLoadin(false);
        setFiles([]);
        editor1?.commands.clearContent();
        setTitle("");
        setSelectedCountries([]);
        setSelectedProducts([]);
        return;
      }
      notifications.show({
        id: "alertacomercial",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error",
        message: "La Alerta Comercial no se ha creado correctamente.",
        color: "green",
        loading: false,
      });
      setIsLoadin(false);
      return;
    }
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/alertacomercial/${alertacomercial.id}`,
      formData
    );
    if (res.status === 200) {
      notifications.show({
        id: "alertacomercial",
        autoClose: 5000,
        withCloseButton: false,
        title: "Alerta Comercial editada",
        message: "La Alerta Comercial ha sido modificada correctamente.",
        color: "green",
        loading: false,
      });
      handleOpen();
      update();
      setIsLoadin(false);
      setFiles([]);
      editor1?.commands.clearContent();
      setTitle("");
      setSelectedCountries([]);
      setSelectedProducts([]);
      return;
    }
    notifications.show({
      id: "alertacomercial",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error",
      message: "Hubo un error editando la Alerta Comercial.",
      color: "green",
      loading: false,
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
            if (!alertacomercial) {
              setFiles([]);
              editor1?.commands.clearContent();
              setTitle("");
              setSelectedCountries([]);
              setSelectedProducts([]);
            }
            handleOpen();
          }}
        >
          <XMarkIcon className="m-2 w-7" />
        </IconButton>
      </DialogHeader>

      <DialogBody className=" justify-center h-[100vh] overflow-y-auto no-scrollbar">
        <div className="flex justify-center ">
          <div className="w-full sm:w-8/12">
            <div className="w-full text-base text-black">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    variant="text"
                    className="flex items-center h-5 p-0 hover:bg-transparent "
                    ripple={false}
                  >
                    {category ? category.name : "Categoría"}
                  </Button>
                </MenuHandler>
                <MenuList className="w-40 z-[9999]">
                  {!isLoading ? (
                    categories?.map((category: Category) => (
                      <MenuItem
                        key={category.id}
                        onClick={() => setCategory(category)}
                      >
                        {category.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>Loading...</MenuItem>
                  )}
                </MenuList>
              </Menu>
            </div>

            <input
              className="w-full my-2 text-xl font-bold text-black placeholder-black resize-none sm:text-3xl"
              placeholder="Título"
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={alertacomercial ? title : ""}
            />
            <div className="text-xs font-light text-neutral-500">
              {format(Date.now(), "dd MMMM yyyy", { locale: es })}
            </div>

            <div className="my-3">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    variant="text"
                    className="flex items-center h-5 p-0 hover:bg-transparent "
                    ripple={false}
                  >
                    {isPublic ? "Público" : "Privado"}
                  </Button>
                </MenuHandler>
                <MenuList className="w-40 z-[9999]">
                  <MenuItem onClick={() => setIsPublic(true)}>Público</MenuItem>
                  <MenuItem onClick={() => setIsPublic(false)}>
                    Privado
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>

            <div className=" relative w-full h-[32rem] group my-5">
              <div
                className="absolute inset-0 z-0 cursor-pointer "
                onClick={handleClickSelectFile}
              >
                {/* ImagePreview */}
                {files.length > 0 ? (
                  <div className="flex justify-center w-full h-full">
                    <Image
                      src={URL.createObjectURL(files[0])}
                      width={1920}
                      height={1080}
                      alt="card-image"
                      className="object-cover h-full duration-500 rounded-md group-hover:blur-sm"
                    />
                  </div>
                ) : alertacomercial ? (
                  <div className="flex justify-center w-full h-full">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/data/alertacomercial/${alertacomercial?.id}/img/${alertacomercial?.image}`}
                      width={1920}
                      height={1080}
                      alt="alertacomercial-image"
                      className="object-cover h-full duration-500 rounded-md group-hover:blur-sm"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center w-full h-full border-2 border-black border-dashed rounded-xl"></div>
                )}
              </div>

              <div className="flex items-center justify-center w-full h-full text-base text-black">
                <Dropzone
                  openRef={openRef}
                  onDrop={handleDrop}
                  onReject={() => {
                    notifications.show({
                      id: "alertacomercial",
                      autoClose: 5000,
                      withCloseButton: false,
                      title: "¿Estás loco o qué?",
                      message: "La imagen no puede pasar de 5MB.",
                      color: "red",
                      loading: false,
                    });
                  }}
                  activateOnClick={false}
                  accept={IMAGE_MIME_TYPE}
                  maxFiles={1}
                  multiple={false}
                  maxSize={100 * 1024 * 1024}
                  styles={{ inner: { pointerEvents: "all" } }}
                  className="w-full bg-transparent border-0 group-hover:bg-transparent"
                >
                  <Group justify="center">
                    <Button
                      onClick={handleClickSelectFile}
                      className={`${isHovering} bg-transparent border-[1px] hover:shadow-none `}
                    >
                      Subir imagen
                    </Button>
                    <div className="text-black">{description}</div>
                  </Group>
                </Dropzone>
              </div>
            </div>

            <div className="text-lg font-normal text-black">
              <div className="text-lg font-bold text-black">
                Contenido de la Alerta Comercial
              </div>
              <TextEditor editor={editor1} />
            </div>

            <div className="w-full my-5">
              <div className="text-lg font-bold text-black">
                Seleccione los países de la Alerta Comercial
              </div>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                placeholder="Seleccione los países de la Alerta Comercial..."
                onChange={(e) => setSelectedCountries(e)}
                defaultValue={selectedCountries}
                options={countries}
              />
            </div>

            <div className="w-full my-5">
              <div className="text-lg font-bold text-black">
                Seleccione los productos de la Alerta Comercial
              </div>
              <div className="inline-flex w-full space-x-3">
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  placeholder="Seleccione los productos de la Alerta Comercial..."
                  onChange={(e) => setSelectedProducts(e)}
                  defaultValue={selectedProducts}
                  options={products}
                  className="w-11/12"
                />
                <ProductPopover
                  open={openProduct}
                  handleOpen={handleOpenProduct}
                  updateProducts={updateProducts}
                />
              </div>
            </div>

            <div className="flex justify-end w-full h-12 my-5 space-x-3">
              {isLoadin ? (
                <>
                  <Button disabled={isLoadin} color="green">
                    <Spinner />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    disabled={
                      !alertacomercial
                        ? title === "" ||
                          editor1?.isEmpty ||
                          files.length === 0 ||
                          selectedCountries.length === 0 ||
                          selectedProducts.length === 0
                        : title === "" ||
                          editor1?.isEmpty ||
                          selectedCountries.length === 0 ||
                          selectedProducts.length === 0
                    }
                    onClick={() => handleSubmit()}
                    color="green"
                  >
                    Guardar
                  </Button>
                  {alertacomercial?.published === false || !alertacomercial ? (
                    <Button
                      disabled={
                        !alertacomercial
                          ? title === "" ||
                            editor1?.isEmpty ||
                            files.length === 0 ||
                            selectedCountries.length === 0 ||
                            selectedProducts.length === 0
                          : title === "" ||
                            editor1?.isEmpty ||
                            selectedCountries.length === 0 ||
                            selectedProducts.length === 0
                      }
                      onClick={() => handleSubmit(true)}
                      color="green"
                    >
                      Guardar y Publicar
                    </Button>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
