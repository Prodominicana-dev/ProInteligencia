"use client";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
} from "@material-tailwind/react";
import { useCallback, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useAlertaIED } from "@/src/services/alertaIED/service";
import React from "react";

export default function Modal({ id }: any) {
  const { data, isLoading }: any = useAlertaIED(id);
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const handleOpen = useCallback(() => {
    setOpen(!open);
    router.back();
  }, [router, open]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size={"xl"}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="h-screen overflow-scroll"
    >
      <DialogHeader className="justify-end">
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={handleOpen}
        >
          <XMarkIcon className="m-2 w-7" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="flex justify-center h-[100vm] overflow-y-auto">
        <div className="w-10/12 sm:w-8/12">
          <div className="text-base text-neutral-500">{data.category.name}</div>
          <div className="my-2 text-xl font-bold text-black sm:text-3xl">
            {data.title}
          </div>
          <div className="text-xs font-light text-neutral-500">
            {format(new Date(data.date), "dd MMMM yyyy", { locale: es })}
          </div>
          <Image
            width={1920}
            height={1080}
            src={`${process.env.NEXT_PUBLIC_API_URL}/data/alertaIED/${data.id}/img/${data.image}`}
            alt="card-image"
            className="object-cover w-full my-5 rounded-lg"
          />
          <div
            className="pb-10 font-normal text-justify text-black"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
