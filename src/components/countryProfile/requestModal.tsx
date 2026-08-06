"use client";
import { Dialog, DialogBody, Button } from "@material-tailwind/react";
import { useCallback, useEffect, useState } from "react";
import {
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  DocumentPlusIcon,
} from "@heroicons/react/24/solid";

// Formulario institucional donde se registran las solicitudes de nuevos
// perfiles de países.
const FORM_URL =
  "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=ghXqEGP41EuvCTx0XnNcBScHwGRtP81GvVRSfxgYJaNUQTdYQjdGQjJHUjBIVlgwSzVOQTJXQ0hETi4u";

export default function RequestProfileModal() {
  const [open, setOpen] = useState(false);

  // Se abre solo al entrar al apartado de perfiles de países.
  useEffect(() => {
    setOpen(true);
  }, []);

  const handleOpen = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size="sm"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="rounded-2xl"
    >
      <DialogBody className="p-0 overflow-hidden rounded-2xl">
        {/* Franja superior con el degradado de la sección */}
        <div className="relative flex flex-col items-center px-6 py-8 bg-gradient-to-tr from-purpurita via-morado to-celeste">
          {/* Botón plano en vez de IconButton: el ripple de material-tailwind
              desplazaba el ícono al hacer click. */}
          <button
            type="button"
            onClick={handleOpen}
            aria-label="Cerrar"
            className="absolute flex items-center justify-center w-8 h-8 text-white duration-200 rounded-full right-3 top-3 hover:bg-white/20 focus:outline-none"
          >
            <XMarkIcon className="w-6" />
          </button>

          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20">
            <DocumentPlusIcon className="text-white w-9" />
          </div>
          <div className="mt-4 text-xl font-bold text-center text-white">
            Solicitud de incorporación de un perfil de país
          </div>
        </div>

        <div className="px-6 py-6">
          <p className="text-sm text-center text-neutral-600">
            Completa el formulario de solicitud y nuestro equipo evaluará la
            incorporación de un nuevo perfil.
          </p>

          <div className="flex flex-col-reverse gap-3 mt-6 sm:flex-row sm:justify-center">
            <Button
              variant="text"
              color="blue-gray"
              onClick={handleOpen}
              className="font-semibold normal-case rounded-full"
            >
              Ahora no
            </Button>
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex flex-row items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white duration-300 rounded-full bg-navy hover:shadow-lg hover:text-white/80"
            >
              Ir a la solicitud
              <ArrowTopRightOnSquareIcon className="w-4" />
            </a>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
