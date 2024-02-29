import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import User from "@/src/models/user";
import UserDialog from "./dialog";
import HideButton from "../hide";
import ActiveButton from "../active";
import { Avatar } from "@material-tailwind/react";
import React from "react";

export default function Card({
  user,
  updateUsers,
}: {
  user: User;
  updateUsers: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(true);
  const handleOpen = (mode: boolean) => {
    setMode(mode);
    setOpen(!open);
  };
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(!deleteOpen);
  const deleteCreateNotification = {
    title: "Usero ocultado",
    message: "El Usuario ha sido ocultado exitosamente.",
    color: "green",
  };

  const deleteErrorNotification = {
    title: "Error eliminando el Ususuario",
    message: "Ha ocurrido un error, intenta nuevamente.",
    color: "red",
  };

  const [activeOpen, setActiveOpen] = useState(false);
  const handleActiveClose = () => setActiveOpen(!activeOpen);
  const activeCreateNotification = {
    title: "Usero activado",
    message: "El Usuario ha sido activado exitosamente.",
    color: "green",
  };

  const activeErrorNotification = {
    title: "Error activando el Usuario",
    message: "Ha ocurrido un error, intenta nuevamente.",
    color: "red",
  };

  return (
    <>
      <div className="grid items-center w-full h-24 grid-cols-4 p-5 text-center bg-white rounded-lg ring-2 ring-gray-100">
        <div className="flex justify-center">
          <Avatar src={`${user.picture}`}></Avatar>
        </div>
        <div className="line-clamp-2">{user.name}</div>
        <div className="line-clamp-1">{user.email}</div>
        <div className="flex justify-center space-x-5 ">
          <button
            onClick={() => handleOpen(true)}
            className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
          >
            <PlusIcon className="w-7" />
          </button>
          <button
            onClick={() => handleOpen(false)}
            className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
          >
            <MinusIcon className="w-7" />
          </button>
        </div>
      </div>
      <HideButton
        open={deleteOpen}
        handleOpen={handleDeleteOpen}
        update={updateUsers}
        title={"¿Estás seguro de ocultar este User?"}
        message="El User será ocultado y podrá ser activado."
        endpoint={`/user/deactive/${user.user_id}`}
        createNotification={deleteCreateNotification}
        errorNotification={deleteErrorNotification}
      />
      <ActiveButton
        open={activeOpen}
        handleOpen={handleActiveClose}
        update={updateUsers}
        title={"¿Estás seguro de activar este User?"}
        message="El User será activado y cualquier persona podría verlo."
        endpoint={`/user/active/${user.user_id}`}
        createNotification={activeCreateNotification}
        errorNotification={activeErrorNotification}
      />
      {open ? (
        <UserDialog
          open={open}
          mode={mode}
          handleOpen={() => handleOpen(mode)}
          updateUser={updateUsers}
          user={user}
        />
      ) : null}
    </>
  );
}
