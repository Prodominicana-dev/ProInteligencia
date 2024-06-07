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
import AlertaIED from "@/src/models/alertaIED";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { Group } from "@mantine/core";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import TextEditor from "../rich-editor";
import Editor from "../rich-editor/config";
import { useAlertasIEDCategory } from "@/src/services/alertaIED/service";
import Category from "@/src/models/category";
import React from "react";

export default function AlertaIEDDialog({
  alertaIED,
  open,
  handleOpen,
  update,
}: {
  alertaIED?: AlertaIED;
  open: boolean;
  handleOpen: () => void;
  update: () => void;
}) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [description] = useState<any>("");
  const [isPublic, setIsPublic] = useState(true);
  const [title, setTitle] = useState("");
  const { data: categories } = useAlertasIEDCategory();
  const [category, setCategory] = useState<any>();
  const [isLoadin, setIsLoadin] = useState(false);

  const openRef = useRef<() => void>(null);
  const handleClickSelectFile = () => {
    if (openRef.current) {
      openRef.current(); // solo se llama si openRef.current no es null
    }
  };

  const editor1 = Editor({
    placeholder: "Contenido de la alerta de IED",
    content: alertaIED?.description,
  });

  useEffect(() => {
    if (categories) {
      setCategory(categories[0]);
    }
  }, [categories]);

  useEffect(() => {
    if (alertaIED) {
      editor1?.commands.insertContent(alertaIED.description);
      setTitle(alertaIED.title);
      setCategory(alertaIED.category);
      setIsPublic(alertaIED.isPublic);
    }
  }, [alertaIED]);
  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  };
  const isHovering =
    files.length > 0
      ? "group-hover:bg-black/30"
      : "text-black border-black group-hover:border-black/70 group-hover:text-black/70 duration-300";

  const handleSubmit = async (published?: boolean) => {
    setIsLoadin(true);
    const data = new FormData();
    data.append("title", title);
    data.append("isPublic", isPublic ? "true" : "false");
    data.append(
      "description",
      editor1?.getHTML() !== undefined ? editor1?.getHTML() : ""
    );
    data.append("categoryId", category.id.toString());
    if (files.length > 0) {
      data.append("file", files[0]);
    }
    if (published) data.append("published", published.toString());
    const formDataObject: any = {};
    data.forEach((value, key) => {
      formDataObject[key] = value;
    });

    if (!alertaIED) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/alertaIED`,
        data
      );
      if (res.status === 200) {
        notifications.show({
          id: "alertaIED",
          autoClose: 5000,
          withCloseButton: false,
          title: "Alerta de IED creada",
          message: "La Alerta de IED ha sido creada correctamente.",
          color: "green",
          loading: false,
        });
        handleOpen();
        update();
        setIsLoadin(false);
        setTitle("");
        setFiles([]);
        editor1?.commands.clearContent();
        return;
      }
      notifications.show({
        id: "alertaIED",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error",
        message: "La Alerta de IED no se ha creado correctamente.",
        color: "green",
        loading: false,
      });
      setIsLoadin(false);
      return;
    }
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/alertaIED/${alertaIED.id}`,
      data
    );
    if (res.status === 200) {
      notifications.show({
        id: "alertaIED",
        autoClose: 5000,
        withCloseButton: false,
        title: "Alerta de IED editado",
        message: "La Alerta de IED ha sido modificada correctamente.",
        color: "green",
        loading: false,
      });
      handleOpen();
      update();
      setIsLoadin(false);
      setTitle("");
      setFiles([]);
      editor1?.commands.clearContent();
      return;
    }
    notifications.show({
      id: "alertaIED",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error",
      message: "Hubo un error editando la Alerta de IED.",
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
            if (!alertaIED) {
              setFiles([]);
              editor1?.commands.clearContent();
              setTitle("");
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
                  {categories ? (
                    categories.map((category: Category) => (
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
              defaultValue={alertaIED ? title : ""}
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
                ) : alertaIED ? (
                  <div className="flex justify-center w-full h-full">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/data/alertaIED/${alertaIED?.id}/img/${alertaIED?.image}`}
                      width={1920}
                      height={1080}
                      alt="alertaIED-image"
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
                      id: "alertaIED",
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
                Contenido de la Alerta de IED
              </div>
              <TextEditor editor={editor1} />
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
                      !alertaIED
                        ? title === "" || editor1?.isEmpty || files.length === 0
                        : title === "" || editor1?.isEmpty
                    }
                    onClick={() => handleSubmit()}
                    color="green"
                  >
                    Guardar
                  </Button>
                  {alertaIED?.published === false || !alertaIED ? (
                    <Button
                      disabled={
                        !alertaIED
                          ? title === "" ||
                            editor1?.isEmpty ||
                            files.length === 0
                          : title === "" || editor1?.isEmpty
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
