"use client";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import { useCallback, useState } from "react";
import { XMarkIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCountryProfile } from "@/src/services/countryProfile/service";
import React from "react";

export default function Modal({ id }: any) {
  const { data, isLoading }: any = useCountryProfile(id);
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleOpen = useCallback(() => {
    setOpen(!open);
    router.back();
  }, [router, open]);

  if (isLoading) {
    return (
      <Dialog open={open} handler={handleOpen} size={"xl"} className="h-[90vh]">
        <DialogBody className="flex items-center justify-center h-full">
          <Spinner />
        </DialogBody>
      </Dialog>
    );
  }

  if (!data) return <div></div>;

  const country = data.country;
  const flag = `https://flagcdn.com/${country?.abbreviation?.toLowerCase()}.svg`;
  const pdfUrl = `${process.env.NEXT_PUBLIC_API_URL}/data/country-profile/${data.id}/pdf/${data.pdf}`;

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size={"xl"}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="h-[95vh]"
    >
      <DialogHeader className="justify-between">
        <div className="flex flex-row items-center gap-3">
          <Image
            width={64}
            height={48}
            src={flag}
            alt={`Bandera de ${country?.name}`}
            className="object-cover w-10 h-7 rounded-sm"
          />
          <div>
            <div className="text-lg font-bold text-black">{country?.name}</div>
            <div className="text-xs font-normal text-neutral-500">
              {country?.region?.name ?? "Sin región"}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          {data.pdf ? (
            <a
              href={pdfUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row items-center gap-2 px-4 py-2 text-sm text-white duration-300 rounded-lg bg-navy hover:shadow-lg hover:text-white/80"
            >
              <ArrowDownTrayIcon className="w-4" />
              Descargar
            </a>
          ) : null}
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
            <XMarkIcon className="m-2 w-7" />
          </IconButton>
        </div>
      </DialogHeader>
      <DialogBody className="h-[85%] p-2">
        {data.pdf ? (
          // El visor nativo del navegador se encarga de mostrar el PDF
          <iframe
            src={pdfUrl}
            title={`Perfil de ${country?.name}`}
            className="w-full h-full border-0 rounded-lg"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-neutral-500">
            Este país aún no tiene un documento disponible.
          </div>
        )}
      </DialogBody>
    </Dialog>
  );
}
