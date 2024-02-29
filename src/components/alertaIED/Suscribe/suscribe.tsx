"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { notifications } from "@mantine/notifications";
import {
  Dialog,
  DialogBody,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import React from "react";

const animatedComponents = makeAnimated();

interface SuscribeProps {
  open: boolean;
  handleOpen: () => void;
  email: string;
}

export default function AlertaIEDSubscribe({
  open,
  handleOpen,
  email,
}: SuscribeProps) {
  const { user } = useUser();
  const [selectCategories, setSelectecCategories] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/category/select/alertaIED`)
        .then((res) => {
          setSelectecCategories(res.data);
        });
    };
    getCategories();
  }, [selectCategories]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/suscriber/${user?.email}/alertaIED`
      );
      if (data) {
        const categories = data.suscriber_category.map((c: any) => ({
          value: c.category.id,
          label: c.category.name,
        }));
        setSelectedCategories(categories);
      }
    };
    getData();
  }, [user?.email]);

  const handleSuscribe = async () => {
    setIsLoaded(true);
    const categoriesId = selectedCategories.map((category: any) => {
      return category.value;
    });
    const data = {
      email: email,
      categories: categoriesId,
      name: user?.name,
      platform: "alertaIED",
    };
    console.log(data);
    await axios
      .patch(`${process.env.NEXT_PUBLIC_API_URL}/suscriber/alertaIED`, data)
      .then((res) => {
        if (res.status === 200) {
          notifications.show({
            title: "¡Suscripción Exitosa!",
            message: "¡Te has suscrito a nuestras alertas!",
            color: "green",
            autoClose: 5000,
            withCloseButton: false,
          });
          handleOpen();
          setIsLoaded(false);
        }
      });
  };

  return (
    <>
      <Dialog open={open} handler={handleOpen} size="md" className="h-[60vh]">
        <DialogBody className="h-full overflow-y-auto no-scrollbar">
          <div className="flex flex-col items-center justify-center w-full space-y-4 h-36">
            <Typography className="w-11/12 text-xl font-bold text-center text-black sm:w-10/12 sm:text-2xl md:text-4xl">
              ¡Suscríbete a nuestras alertas de IED!
            </Typography>
            <Typography
              className="w-11/12 text-xs font-thin text-center text-gray-500 sm:w-10/12 sm:text-sm"
              variant="lead"
            >
              ¡Deja que te mantengamos al día con las tendencias más recientes!
            </Typography>
          </div>
          <div className="flex flex-col items-center justify-center w-full space-y-4 h-82">
            <div className="w-10/12">
              <Input
                label="Correo electrónico"
                disabled
                value={email}
                type="email"
                crossOrigin={undefined}
              />
            </div>
            <div className="w-10/12">
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                placeholder="Seleccione las categorías de su interés..."
                onChange={(e: any) => {
                  // Setear solo el value de e en selectedCategories
                  setSelectedCategories(e);
                }}
                options={selectCategories}
                value={selectedCategories}
              />
            </div>
          </div>
          <div className="flex justify-center w-full pt-4">
            <button
              onClick={handleSuscribe}
              disabled={isLoaded}
              className="w-10/12 p-2 rounded-lg text-lg font-bold text-white bg-gradient-to-r from-purple-600 hover:from-purple-700  hover:via-purple-500 hover:to-sky-500 duration-700 from-[20%] via-purple-400 to-sky-400 flex justify-center items-center"
            >
              {!isLoaded ? "Suscribirse" : <Spinner className="text-white" />}
            </button>
          </div>
          <div className="flex justify-center w-full pt-4">
            <Typography className="w-11/12 text-[10px] text-center sm:text-xs text-gray-500">
              ¡Asegúrate de seleccionar las categorías de tu interés!
            </Typography>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
