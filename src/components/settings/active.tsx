import { EyeIcon } from "@heroicons/react/24/solid";
import { notifications } from "@mantine/notifications";
import { Dialog, DialogBody } from "@material-tailwind/react";
import axios from "axios";
import React from "react";

interface Notificatione {
  title: string;
  message: string;
  color: string;
}

export default function ActiveButton({
  open,
  handleOpen,
  update,
  title,
  message,
  endpoint,
  createNotification,
  errorNotification,
}: {
  open: boolean;
  handleOpen: () => void;
  update: () => void;
  title: string;
  message: string;
  endpoint: string;
  createNotification: Notificatione;
  errorNotification: Notificatione;
}) {
  const handleActive = async () => {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`
    );
    if (res.status === 200) {
      notifications.show({
        title: createNotification.title,
        message: createNotification.message,
        color: createNotification.color,
        autoClose: 5000,
      });
      handleOpen();
      update();
      return;
    }
    notifications.show({
      title: errorNotification.title,
      message: errorNotification.message,
      color: errorNotification.color,
      autoClose: 5000,
    });
    handleOpen();
    update();
    return;
  };
  return (
    <>
      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogBody className="font-sans text-black">
          <div className="flex flex-col items-center justify-center p-3 space-y-12">
            <EyeIcon className="w-full h-24 text-green-700 md:h-40" />
            <div className="space-y-2">
              <p className="w-full text-lg font-bold md:text-3xl">{title}</p>
              <p className="w-full text-xs font-thin md:w-11/12 md:text-base">
                {message}
              </p>
            </div>
            <div className="flex flex-row w-full space-x-3">
              <button
                className="w-full h-12 font-thin text-white duration-300 bg-green-700 rounded-lg hover:shadow-lg hover:text-white/80"
                onClick={handleActive}
              >
                Activar
              </button>
              <button
                onClick={handleOpen}
                className="w-full h-12 font-thin text-green-700 duration-300 bg-white border-2 border-green-700 rounded-lg hover:bg-green-700 hover:text-white"
              >
                Cancelar
              </button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
