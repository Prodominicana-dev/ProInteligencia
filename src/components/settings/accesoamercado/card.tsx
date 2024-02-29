import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import DeleteButton from "../delete";
import AccesoaMercadoEditDialog from "./dialogEdit";
import React from "react";

export default function Card({
  accesoamercado,
  updateAccesoaMercados,
}: {
  accesoamercado: any;
  updateAccesoaMercados: () => void;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(!deleteOpen);
  const deleteCreateNotification = {
    title: "Acceso a Mercado eliminado",
    message: "El Acceso a Mercado ha sido eliminada exitosamente.",
    color: "green",
  };

  const deleteErrorNotification = {
    title: "Error eliminando el Acceso a Mercado",
    message: "Ha ocurrido un error, intenta nuevamente.",
    color: "red",
  };

  return (
    <>
      <div className="grid items-center w-full h-24 grid-cols-3 p-5 text-center bg-white rounded-lg sm:grid-cols-4 ring-2 ring-gray-100">
        <div>{accesoamercado.product.name}</div>
        <div className="hidden sm:block">{accesoamercado.product.code}</div>
        <div>{accesoamercado.country.name}</div>
        <div className="flex justify-center space-x-5 ">
          <button
            onClick={handleOpen}
            className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
          >
            <PencilSquareIcon className="w-7" />
          </button>
          <button
            className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
            onClick={handleDeleteOpen}
          >
            <TrashIcon className="w-7" />
          </button>
        </div>
      </div>
      <DeleteButton
        open={deleteOpen}
        handleOpen={handleDeleteOpen}
        update={updateAccesoaMercados}
        title={"¿Estás seguro de eliminar este Requisito?"}
        message="El Acceso a Mercado será eliminada y no podrá ser recuperada."
        endpoint={`/accesoamercado/${accesoamercado.id}`}
        createNotification={deleteCreateNotification}
        errorNotification={deleteErrorNotification}
      />
      {open ? (
        <AccesoaMercadoEditDialog
          accesoamercado={accesoamercado}
          open={open}
          handleOpen={handleClose}
          updateAccesoaMercado={updateAccesoaMercados}
          title={"Editar Acceso a Mercado"}
        />
      ) : null}
    </>
  );
}
