"use client";
import React, { useState } from "react";
import Header from "@/src/components/settings/header";
import Settings from "@/src/components/validate/settings";
import NotFound from "@/src/components/validate/notFound";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import RegionDialog from "@/src/components/settings/regions/dialog";
import DeleteButton from "@/src/components/settings/delete";
import { useRegions } from "@/src/services/region/service";
import Region from "@/src/models/region";

function RegionRow({
  region,
  updateRegions,
}: {
  region: Region;
  updateRegions: () => void;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(!deleteOpen);

  return (
    <>
      <div className="grid items-center w-full h-24 grid-cols-2 p-5 text-center bg-white rounded-lg ring-2 ring-gray-100">
        <div className="truncate line-clamp-1">{region.name}</div>
        <div className="flex justify-center space-x-5">
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
      <DeleteButton
        open={deleteOpen}
        handleOpen={handleDeleteOpen}
        update={updateRegions}
        title={"¿Estás seguro de eliminar esta región?"}
        message="Solo se puede eliminar una región que no tenga países asignados."
        endpoint={`/region/${region.id}`}
        createNotification={{
          title: "Región eliminada",
          message: "La región ha sido eliminada exitosamente.",
          color: "green",
        }}
        errorNotification={{
          title: "Error eliminando la región",
          message:
            "No se pudo eliminar. Verifica que no tenga países asignados.",
          color: "red",
        }}
      />
      {open ? (
        <RegionDialog
          region={region}
          open={open}
          handleOpen={handleOpen}
          updateRegions={updateRegions}
        />
      ) : null}
    </>
  );
}

export default function Page() {
  const { data: regions, refetch } = useRegions();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const updateRegions = () => {
    refetch();
  };

  return (
    <>
      <Settings
        permissionsList={[
          "create:datamarket",
          "update:datamarket",
          "delete:datamarket",
        ]}
      >
        <Header
          title="Gestiona las regiones"
          message="Las regiones se asignan a cada país y son las que aparecen como filtros en la sección de Perfiles de Países."
        />
        <div className="flex flex-col w-full p-4 space-y-2 sm:p-8 sm:space-y-0 sm:flex-row">
          <div className="flex items-center justify-start w-full text-xl font-semibold text-black sm:w-4/12">
            Cantidad de regiones: {regions?.length ?? 0}
          </div>
          <div className="flex justify-end w-full sm:w-8/12">
            <button
              onClick={handleOpen}
              className={`text-white w-full sm:w-72 h-10 text-center bg-navy rounded-lg hover:shadow-lg font-semibold duration-300 hover:text-white/80`}
            >
              Agregar región
            </button>
          </div>
        </div>

        <div className="w-full p-4 space-y-5 sm:p-8">
          {!regions || regions.length === 0 ? (
            <NotFound />
          ) : (
            <>
              <div className="grid items-center w-full h-24 grid-cols-2 p-5 font-bold text-center bg-white rounded-lg ring-2 ring-gray-100">
                <div>Región</div>
                <div>Acción</div>
              </div>
              {regions.map((region: Region) => (
                <RegionRow
                  key={region.id}
                  region={region}
                  updateRegions={updateRegions}
                />
              ))}
            </>
          )}
        </div>
      </Settings>
      {open ? (
        <RegionDialog
          open={open}
          handleOpen={handleOpen}
          updateRegions={updateRegions}
        />
      ) : null}
    </>
  );
}
