import {

    PencilSquareIcon,
    TrashIcon,
  } from "@heroicons/react/24/outline";
  import { useState } from "react";
  import React from "react";
import DeleteButton from "../delete";
import EditDomainDialog from "./edit";
  
  export default function Card({
    domain,
    updateProducts,
  }: {
    domain: any;
    updateProducts: () => void;
  }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
  
    const [deleteOpen, setDeleteOpen] = useState(false);
    const handleDeleteOpen = () => setDeleteOpen(!deleteOpen);
    const deleteCreateNotification = {
      title: "Producto ocultado",
      message: "El producto ha sido ocultado exitosamente.",
      color: "green",
    };
  
    const deleteErrorNotification = {
      title: "Error eliminando el producto",
      message: "Ha ocurrido un error, intenta nuevamente.",
      color: "red",
    };
  
   
  
    return (
      <>
        <div className="grid items-center w-full h-24 grid-cols-3 p-5 text-center bg-white rounded-lg ring-2 ring-gray-100">
          <div className="line-clamp-2">{domain.name}</div>
          <div className="hidden sm:block">{domain.platform === 'alertacomercial' ? "Alerta Comercial" : domain.platform === 'alertaIED' && 'Alerta de IED'}</div>
          <div className="flex justify-center space-x-5 ">
            <button
              onClick={handleOpen}
              className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
            >
              <PencilSquareIcon className="w-7" />
            </button>
            <button
              onClick={handleDeleteOpen}
              className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
            >
              <TrashIcon className="w-7" />
            </button>
          </div>
        </div>
        
        {deleteOpen && (
            <DeleteButton
            open={deleteOpen}
            handleOpen={handleDeleteOpen}
            update={updateProducts}
            title={"¿Estás seguro de eliminar este dominio?"}
            message="El dominio será eliminado de forma permanente."
            endpoint={`/reserved-domains/${domain.id}`}
            createNotification={deleteCreateNotification}
            errorNotification={deleteErrorNotification}
          />
        )}
        
        {open && (
          <EditDomainDialog
            open={open}
            handleOpen={handleOpen}
            updateProducts={updateProducts}
            domain={domain}
          />
        ) }
      </>
    );
  }
  