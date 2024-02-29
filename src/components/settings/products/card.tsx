import {
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Product from "@/src/models/product";
import ProductDialog from "./dialog";
import HideButton from "../hide";
import ActiveButton from "../active";
import React from "react";

export default function Card({
  product,
  updateProducts,
}: {
  product: Product;
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

  const [activeOpen, setActiveOpen] = useState(false);
  const handleActiveOpen = () => setActiveOpen(!deleteOpen);
  const handleActiveClose = () => setActiveOpen(false);
  const activeCreateNotification = {
    title: "Producto activado",
    message: "El producto ha sido activado exitosamente.",
    color: "green",
  };

  const activeErrorNotification = {
    title: "Error activando el producto",
    message: "Ha ocurrido un error, intenta nuevamente.",
    color: "red",
  };

  return (
    <>
      <div className="grid items-center w-full h-24 grid-cols-3 p-5 text-center bg-white rounded-lg sm:grid-cols-4 ring-2 ring-gray-100">
        <div className="line-clamp-2">{product.name}</div>
        <div className="hidden sm:block">{product.code}</div>
        {product.status === "active" ? <div>Activo</div> : <div>Oculto</div>}
        <div className="flex justify-center space-x-5 ">
          <button
            onClick={handleOpen}
            className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
          >
            <PencilSquareIcon className="w-7" />
          </button>
          {product.status === "active" ? (
            <button
              className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
              onClick={handleDeleteOpen}
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
        </div>
      </div>
      <HideButton
        open={deleteOpen}
        handleOpen={handleDeleteOpen}
        update={updateProducts}
        title={"¿Estás seguro de ocultar este producto?"}
        message="El producto será ocultado y podrá ser activado."
        endpoint={`/product/disable/${product.id}`}
        createNotification={deleteCreateNotification}
        errorNotification={deleteErrorNotification}
      />
      <ActiveButton
        open={activeOpen}
        handleOpen={handleActiveClose}
        update={updateProducts}
        title={"¿Estás seguro de activar este producto?"}
        message="El producto será activado y cualquier persona podría verlo."
        endpoint={`/product/enable/${product.id}`}
        createNotification={activeCreateNotification}
        errorNotification={activeErrorNotification}
      />
      {open ? (
        <ProductDialog
          open={open}
          handleOpen={handleOpen}
          updateProducts={updateProducts}
          product={product}
        />
      ) : null}
    </>
  );
}
