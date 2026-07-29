import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import DeleteButton from "../delete";
import CountryProfileDialog from "./dialog";
import { Tooltip } from "@material-tailwind/react";
import Image from "next/image";
import React from "react";

export default function Card({
  countryProfile,
  updateCountryProfiles,
}: {
  countryProfile: any;
  updateCountryProfiles: () => void;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(!deleteOpen);

  const deleteCreateNotification = {
    title: "Perfil de país eliminado",
    message: "El perfil de país ha sido eliminado exitosamente.",
    color: "green",
  };

  const deleteErrorNotification = {
    title: "Error eliminando el perfil de país",
    message: "Ha ocurrido un error, intenta nuevamente.",
    color: "red",
  };

  const country = countryProfile.country;
  const flag = `https://flagcdn.com/${country?.abbreviation?.toLowerCase()}.svg`;

  return (
    <>
      <div className="grid items-center w-full h-24 grid-cols-3 p-5 text-center bg-white rounded-lg sm:grid-cols-4 lg:grid-cols-5 ring-2 ring-gray-100">
        <div className="flex justify-center">
          <Image
            width={64}
            height={48}
            src={flag}
            alt={`Bandera de ${country?.name}`}
            className="object-cover w-12 rounded-sm h-9"
          />
        </div>
        <div className="truncate line-clamp-1">
          <Tooltip content={country?.name}>{country?.name}</Tooltip>
        </div>
        <div className="hidden truncate line-clamp-1 sm:block">
          {country?.region?.name ?? "Sin región"}
        </div>
        <div className="hidden truncate line-clamp-1 lg:block">
          <Tooltip content={countryProfile.pdf ?? "Sin documento"}>
            {countryProfile.pdf ?? "Sin documento"}
          </Tooltip>
        </div>
        <div className="flex justify-center space-x-5">
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
        update={updateCountryProfiles}
        title={"¿Estás seguro de eliminar este perfil de país?"}
        message="El perfil de país será eliminado y no podrá ser recuperado."
        endpoint={`/country-profile/${countryProfile.id}`}
        createNotification={deleteCreateNotification}
        errorNotification={deleteErrorNotification}
      />
      {open ? (
        <CountryProfileDialog
          countryProfile={countryProfile}
          open={open}
          handleOpen={handleOpen}
          updateCountryProfiles={updateCountryProfiles}
        />
      ) : null}
    </>
  );
}
