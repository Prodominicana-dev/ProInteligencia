"use client";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  IconButton,
  Input,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Dropzone, FileWithPath, PDF_MIME_TYPE } from "@mantine/dropzone";
import { Autocomplete } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { CloudArrowUpIcon, DocumentIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { createPost, updatePost, INTERNAL_POST_UPLOAD_URL } from "@/src/services/post/service";
import React from "react";

export default function PostDialog({
  post,
  open,
  handleOpen,
  updatePosts,
  categories,
  types,
  languages,
}: {
  post?: any;
  open: boolean;
  handleOpen: () => void;
  updatePosts: () => void;
  categories: any[];
  types: any[];
  languages: any[];
}) {
  const [title, setTitle] = useState(post?.title);
  const [category, setCategory] = useState(post?.category);
  const [type, setType] = useState(post?.type);
  const [language, setLanguage] = useState(post?.language);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCertHelp, setShowCertHelp] = useState(false);
  const openRef = useRef<() => void>(null);
  const handleClickSelectFile = () => {
    if (openRef.current) {
      openRef.current(); // solo se llama si openRef.current no es null
    }
  };

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setCategory(post.category);
      setType(post.type);
      setLanguage(post.language);
    }
  }, [post]);

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  };

  const handleUploadError = () => {
    setIsLoading(false);
    setShowCertHelp(true);
  };

  const handleOpenVerificationLink = () => {
    window.open(INTERNAL_POST_UPLOAD_URL.replace("/apiv2/post", ""), "_blank");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const data = new FormData();
    data.append("title", title);
    data.append("category", category);
    data.append("type", type);
    data.append("language", language);
    if (files.length > 0) {
      data.append("file", files[0]);
    }
    post
      ? updatePost({
          post: data,
          handleOpen,
          updatePosts,
          id: post.id,
          onUploadError: handleUploadError,
        }).then(() => setIsLoading(false))
      : createPost({
          post: data,
          handleOpen,
          updatePosts,
          onUploadError: handleUploadError,
        }).then(() => setIsLoading(false));
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        size={"md"}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="flex flex-col sm:h-screen 2xl:h-[90vh] "
      >
        <DialogHeader className="justify-end">
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={() => {
              setFiles([]);
              setTitle("");
              handleOpen();
            }}
          >
            <XMarkIcon className="m-2 w-7" />
          </IconButton>
        </DialogHeader>

        <DialogBody className=" justify-center h-[100vh] overflow-y-auto no-scrollbar text-black">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-full text-2xl font-bold text-left sm:w-10/12">
              {post ? "Editar Publicacion" : "Agregar Publicacion"}
            </div>
            <div className="w-full space-y-4 sm:w-10/12">
              <div className="w-full">
                <Input
                  label="Titulo"
                  crossOrigin={""}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="w-full">
                <Autocomplete
                  label="Categoria"
                  onChange={(e) => setCategory(e)}
                  placeholder="Categoria"
                  defaultValue={post?.category}
                  data={categories}
                  styles={{ dropdown: { zIndex: 9999 } }}
                />
              </div>
              <div className="flex flex-col w-full space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
                <div className="w-full sm:w-6/12">
                  <Autocomplete
                    label="Tipo"
                    onChange={(e) => setType(e)}
                    placeholder="Tipo"
                    defaultValue={post?.type}
                    data={types}
                    styles={{ dropdown: { zIndex: 9999 } }}
                  />
                </div>
                <div className="w-full sm:w-6/12">
                  <Autocomplete
                    label="Idioma"
                    onChange={(e) => setLanguage(e)}
                    placeholder="Idioma"
                    defaultValue={post?.language}
                    data={languages}
                    styles={{ dropdown: { zIndex: 9999 } }}
                  />
                </div>
              </div>

              <div className="relative w-full my-5 h-80 group">
                <div className="flex items-center justify-center w-full h-full text-base text-black border-2 border-black border-dashed rounded-xl">
                  <Dropzone
                    openRef={openRef}
                    onDrop={handleDrop}
                    onReject={() => {
                      notifications.show({
                        id: "post",
                        autoClose: 5000,
                        withCloseButton: false,
                        title: "Error",
                        message: "El documento no puede pasar de 500 MB.",
                        color: "red",
                        loading: false,
                      });
                    }}
                    activateOnClick={false}
                    accept={PDF_MIME_TYPE}
                    maxFiles={1}
                    multiple={false}
                    maxSize={500 * 1024 * 1024}
                    styles={{ inner: { pointerEvents: "all" } }}
                    className="w-full bg-transparent group-hover:bg-transparent"
                  >
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                      {post || files.length > 0 ? (
                        <div className="flex flex-col items-center justify-center">
                          <DocumentIcon className="w-24" />
                          <Typography>
                            {files.length > 0 ? files[0].name : post?.pdf}
                          </Typography>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          <CloudArrowUpIcon className="w-24" />
                          <Typography>Solo se aceptan archivos PDF</Typography>
                        </div>
                      )}
                      <Button
                        onClick={handleClickSelectFile}
                        className={`text-black border-black group-hover:border-black/70 group-hover:text-black/70 duration-300 bg-transparent border-[1px] hover:shadow-none `}
                      >
                        Subir archivo
                      </Button>
                    </div>
                  </Dropzone>
                </div>
              </div>

              <div className="flex justify-end w-full h-12 my-5 space-x-3">
                <Button
                  disabled={
                    (post
                      ? title === "" ||
                        category === undefined ||
                        type === "" ||
                        language === ""
                      : title === "" ||
                        category === undefined ||
                        type === "" ||
                        language === "" ||
                        files.length === 0) || isLoading
                  }
                  onClick={!isLoading ? () => handleSubmit() : () => {}}
                  color="green"
                >
                  {isLoading ? <Spinner /> : post ? "Actualizar" : "Guardar"}
                </Button>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>

      {/* Modal de ayuda cuando falla la conexion interna por certificado */}
      <Dialog
        open={showCertHelp}
        handler={() => setShowCertHelp(false)}
        size="sm"
      >
        <DialogHeader className="flex items-center gap-2">
          <ExclamationTriangleIcon className="w-6 h-6 text-amber-500" />
          Verificacion necesaria
        </DialogHeader>
        <DialogBody className="text-black">
          <Typography className="mb-3">
            Para subir documentos grandes, tu navegador necesita verificar
            una conexion interna una sola vez. Sigue estos pasos:
          </Typography>
          <ol className="pl-5 space-y-2 list-decimal">
            <li>Haz clic en el boton de abajo para abrir la pagina de verificacion.</li>
            <li>Cuando aparezca una advertencia de seguridad, haz clic en <strong>&quot;Avanzado&quot;</strong> y luego en <strong>&quot;Continuar&quot;</strong>.</li>
            <li>Cierra esa pestana y vuelve aqui para intentar subir el archivo de nuevo.</li>
          </ol>
          <Typography className="mt-3 text-sm text-neutral-500">
            Este paso solo es necesario la primera vez, en cada computadora y navegador.
          </Typography>
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button
            variant="outlined"
            color="blue-gray"
            onClick={() => setShowCertHelp(false)}
          >
            Cerrar
          </Button>
          <Button color="blue" onClick={handleOpenVerificationLink}>
            Abrir pagina de verificacion
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}