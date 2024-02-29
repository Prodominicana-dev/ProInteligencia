import AlertaIED from "@/src/models/alertaIED";
import {
  EyeIcon,
  EyeSlashIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  CardHeader,
  CardBody,
  Tooltip,
  Typography,
  Card,
} from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";
import AlertaIEDDialog from "./dialog";
import HideButton from "../hide";
import ActiveButton from "../active";
import DeleteButton from "../delete";
import React from "react";

export default function SCard({
  data,
  update,
}: {
  data: AlertaIED;
  update: () => void;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const [hideOpen, setHideOpen] = useState(false);
  const handleHideOpen = () => {
    setHideOpen(!hideOpen);
  };

  const [activeOpen, setActiveOpen] = useState(false);
  const handleActiveOpen = () => {
    setActiveOpen(!activeOpen);
  };

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => {
    setDeleteOpen(!deleteOpen);
  };

  const hideCreateNotification = {
    title: "Alerta de IED ocultada",
    message: "La Alerta de IED ha sido ocultada exitosamente.",
    color: "green",
  };

  const hideErrorNotification = {
    title: "Error ocultando la Alertas de IED",
    message: "Ha ocurrido un error, intenta nuevamente.",
    color: "red",
  };

  const activeCreateNotification = {
    title: "Alerta de IED activada",
    message: "La Alerta de IED ha sido activada exitosamente.",
    color: "green",
  };

  const activeErrorNotification = {
    title: "Error activando la Alerta de IED",
    message: "Ha ocurrido un error, intenta nuevamente.",
    color: "red",
  };

  const deleteCreateNotification = {
    title: "Alerta de IED eliminada",
    message: "La Alerta de IED ha sido eliminada exitosamente.",
    color: "green",
  };

  const deleteErrorNotification = {
    title: "Error eliminando la Alerta de IED",
    message: "Ha ocurrido un error, intenta nuevamente.",
    color: "red",
  };

  const isActive =
    data.status === "active"
      ? ""
      : "group opacity-50 bg-gray-200 hover:opacity-100 duration-300";
  return (
    <Card className={`w-full h-full shadow-lg ${isActive}`}>
      <CardHeader floated={false} className="h-56">
        <Image
          width={1920}
          height={1080}
          src={`${process.env.NEXT_PUBLIC_API_URL}/data/alertaIED/${data.id}/img/${data.image}`}
          alt="foto"
          className="object-cover w-full h-full"
        />
      </CardHeader>
      <CardBody className="text-center">
        <div className="text-gray-500">{data.category.name}</div>
        <div className="flex items-center justify-center w-full h-16 mb-2 ">
          <span className="text-lg font-bold line-clamp-2">{data.title}</span>
        </div>
        <div className="flex justify-center my-4">
          <button
            onClick={handleOpen}
            className="flex items-center justify-center w-10 h-10 mx-3 duration-300 bg-green-600 rounded-full hover:bg-green-700"
          >
            <Tooltip content="Editar">
              <Typography variant="lead" color="green" textGradient>
                <PencilIcon className="w-6 h-6 text-white" />
              </Typography>
            </Tooltip>
          </button>
          {data.status === "active" ? (
            <button
              onClick={handleHideOpen}
              className="flex items-center justify-center w-10 h-10 mx-3 duration-300 bg-black rounded-full "
            >
              <Tooltip content="Ocultar">
                <Typography variant="lead" color="green" textGradient>
                  <EyeSlashIcon className="w-6 h-6 text-white" />
                </Typography>
              </Tooltip>
            </button>
          ) : (
            <button
              onClick={handleActiveOpen}
              className="flex items-center justify-center w-10 h-10 mx-3 duration-300 bg-white rounded-full hover:bg-gray-300"
            >
              <Tooltip content="Activar">
                <Typography variant="lead" color="green" textGradient>
                  <EyeIcon className="w-6 h-6 text-black" />
                </Typography>
              </Tooltip>
            </button>
          )}
          <button
            onClick={handleDeleteOpen}
            className="flex items-center justify-center w-10 h-10 mx-3 duration-300 bg-red-600 rounded-full hover:bg-red-700"
          >
            <Tooltip content="Eliminar">
              <Typography variant="lead" color="green" textGradient>
                <TrashIcon className="w-6 h-6 text-white" />
              </Typography>
            </Tooltip>
          </button>
        </div>
        <AlertaIEDDialog
          alertaIED={data}
          open={open}
          handleOpen={handleOpen}
          update={update}
        />
        <HideButton
          open={hideOpen}
          handleOpen={handleHideOpen}
          update={update}
          title={"¿Estás seguro de ocultar la Alertas de IED?"}
          message="La Alertas de IED será ocultada, no eliminada."
          endpoint={`/alertaIED/disable/${data.id}`}
          createNotification={hideCreateNotification}
          errorNotification={hideErrorNotification}
        />
        <ActiveButton
          open={activeOpen}
          handleOpen={handleActiveOpen}
          update={update}
          title={"¿Estás seguro de activar la Alertas de IED?"}
          message="La Alerta de IED se activará y podrá verla cualquier persona."
          endpoint={`/alertaIED/enable/${data.id}`}
          createNotification={activeCreateNotification}
          errorNotification={activeErrorNotification}
        />
        <DeleteButton
          open={deleteOpen}
          handleOpen={handleDeleteOpen}
          update={update}
          title={"¿Estás seguro de eliminar la Alertas de IED?"}
          message="La Alerta de IED será eliminada y no podrá ser recuperada."
          endpoint={`/alertaIED/d/${data.id}`}
          createNotification={deleteCreateNotification}
          errorNotification={deleteErrorNotification}
        />
      </CardBody>
    </Card>
  );
}
