import {
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Datamarket from "@/src/models/datamarket";
import DatamarketDialog from "./dialog";
import HideButton from "../hide";
import ActiveButton from "../active";
import React from "react";
import DeleteButton from "../delete";

export default function Card({
  datamarket,
  updateDatamarkets,
}: {
  datamarket: Datamarket;
  updateDatamarkets: () => void;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(!deleteOpen);

  const [activeOpen, setActiveOpen] = useState(false);
  const handleActiveOpen = () => setActiveOpen(!activeOpen);

  const [hideOpen, setHideOpen] = useState(false);
  const handleHideOpen = () => setHideOpen(!hideOpen);

  const HideCreateNotification = {
    title: "Datamarket ocultado",
    message: "El Datamarket ha sido ocultado exitosamente.",
    color: "green",
  };

  const HideErrorNotification = {
    title: "Error ocultando el Datamarket",
    message: "Ha ocurrido un error, intenta nuevamente.",
    color: "red",
  };

  const deleteNotification = {
    title: "Datamarket eliminado",
    message: "El Datamarket ha sido eliminado exitosamente.",
    color: "green",
  };

  const deleteErrorNotification = {
    title: "Error eliminando el Datamarket",
    message: "Ha ocurrido un error, intenta nuevamente.",
    color: "red",
  };

  const activeCreateNotification = {
    title: "Datamarket activado",
    message: "El Datamarket ha sido activado exitosamente.",
    color: "green",
  };

  const activeErrorNotification = {
    title: "Error activando el Datamarket",
    message: "Ha ocurrido un error, intenta nuevamente.",
    color: "red",
  };

  return (
    <>
      <div className="grid items-center w-full h-24 grid-cols-3 p-5 text-center bg-white rounded-lg sm:grid-cols-5 ring-2 ring-gray-100">
        <div className="line-clamp-2">{datamarket.title}</div>
        <div className="hidden truncate line-clamp-1 sm:block">
          {datamarket.url}
        </div>
        <div className="hidden line-clamp-1 sm:block">
          {datamarket.category}
        </div>
        <div>
          {datamarket.status === "active" ? (
            <div>Activo</div>
          ) : (
            <div>Oculto</div>
          )}
        </div>
        <div className="flex justify-center space-x-5 ">
          <button
            onClick={handleOpen}
            className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
          >
            <PencilSquareIcon className="w-7" />
          </button>
          {datamarket.status === "active" ? (
            <button
              className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
              onClick={handleHideOpen}
            >
              <EyeSlashIcon className="w-7" />
            </button>
          ) : (
            <button
              className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
              onClick={handleActiveOpen}
            >
              <EyeIcon className="w-7" />
            </button>
          )}
          <button
            className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
            onClick={handleDeleteOpen}
          >
            <TrashIcon className="w-7" />
          </button>
        </div>
      </div>
      <HideButton
        open={hideOpen}
        handleOpen={handleHideOpen}
        update={updateDatamarkets}
        title={"¿Estás seguro de ocultar este Datamarket?"}
        message="El Datamarket será ocultado y podrá ser activado."
        endpoint={`/datamarket/deactive/${datamarket.id}`}
        createNotification={HideCreateNotification}
        errorNotification={HideErrorNotification}
      />
      <ActiveButton
        open={activeOpen}
        handleOpen={handleActiveOpen}
        update={updateDatamarkets}
        title={"¿Estás seguro de activar este Datamarket?"}
        message="El Datamarket será activado y cualquier persona podría verlo."
        endpoint={`/datamarket/active/${datamarket.id}`}
        createNotification={activeCreateNotification}
        errorNotification={activeErrorNotification}
      />
      <DeleteButton
        open={deleteOpen}
        handleOpen={handleDeleteOpen}
        update={updateDatamarkets}
        title={"¿Estás seguro de eliminar este Datamarket?"}
        message="El Datamarket será eliminado y no podrá ser recuperado."
        endpoint={`/datamarket/${datamarket.id}`}
        createNotification={deleteNotification}
        errorNotification={deleteErrorNotification}
      />
      {open ? (
        <DatamarketDialog
          open={open}
          handleOpen={handleOpen}
          updateDatamarkets={updateDatamarkets}
          datamarket={datamarket}
        />
      ) : null}
    </>
  );
}
