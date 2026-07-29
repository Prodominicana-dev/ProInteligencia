"use client";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
  IconButton,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Dropzone, FileWithPath, PDF_MIME_TYPE } from "@mantine/dropzone";
import { Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { CloudArrowUpIcon, DocumentIcon } from "@heroicons/react/24/outline";
import {
  createCountryProfile,
  updateCountryProfile,
} from "@/src/services/countryProfile/service";
import { useCountries, editCountry } from "@/src/services/countries/service";
import { useRegions } from "@/src/services/region/service";
import Image from "next/image";
import React from "react";

export default function CountryProfileDialog({
  countryProfile,
  open,
  handleOpen,
  updateCountryProfiles,
}: {
  countryProfile?: any;
  open: boolean;
  handleOpen: () => void;
  updateCountryProfiles: () => void;
}) {
  const { data: countries, refetch: refetchCountries } = useCountries();
  const { data: regions } = useRegions();
  const [countryId, setCountryId] = useState<string | null>(
    countryProfile ? String(countryProfile.countryId) : null
  );
  const [regionId, setRegionId] = useState<string | null>(
    countryProfile?.country?.region?.id
      ? String(countryProfile.country.region.id)
      : null
  );
  const [status, setStatus] = useState<string | null>(
    countryProfile?.status ?? "active"
  );
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const openRef = useRef<() => void>(null);

  const handleClickSelectFile = () => {
    if (openRef.current) {
      openRef.current();
    }
  };

  useEffect(() => {
    if (countryProfile) {
      setCountryId(String(countryProfile.countryId));
      setStatus(countryProfile.status ?? "active");
    }
  }, [countryProfile]);

  // Los países se listan en orden alfabético para facilitar la selección
  const countryOptions = (countries ?? [])
    .map((country: any) => ({
      value: String(country.id),
      label: country.name,
    }))
    .sort((a: any, b: any) => a.label.localeCompare(b.label));

  const selectedCountry = (countries ?? []).find(
    (country: any) => String(country.id) === countryId
  );

  // Al elegir un país se muestra la región que ya tiene asignada
  useEffect(() => {
    if (selectedCountry) {
      setRegionId(
        selectedCountry.region?.id ? String(selectedCountry.region.id) : null
      );
    }
  }, [countryId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // La región pertenece al país, así que se guarda sobre el país
    // seleccionado antes de guardar el perfil.
    const currentRegionId = selectedCountry?.region?.id
      ? String(selectedCountry.region.id)
      : null;
    if (countryId && regionId !== currentRegionId) {
      await editCountry(
        countryId,
        { regionId: regionId ? Number(regionId) : null },
        () => refetchCountries()
      );
    }

    const data = new FormData();
    data.append("countryId", countryId as string);
    data.append("status", status as string);
    if (files.length > 0) {
      data.append("file", files[0]);
    }

    countryProfile
      ? updateCountryProfile({
          countryProfile: data,
          handleOpen,
          updateCountryProfiles,
          id: countryProfile.id,
        }).then(() => setIsLoading(false))
      : createCountryProfile({
          countryProfile: data,
          handleOpen,
          updateCountryProfiles,
        }).then(() => setIsLoading(false));
  };

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size={"md"}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="flex flex-col sm:h-screen 2xl:h-[90vh]"
    >
      <DialogHeader className="justify-end">
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={() => {
            setFiles([]);
            handleOpen();
          }}
        >
          <XMarkIcon className="m-2 w-7" />
        </IconButton>
      </DialogHeader>

      <DialogBody className="justify-center h-[100vh] overflow-y-auto no-scrollbar text-black">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-full text-2xl font-bold text-left sm:w-10/12">
            {countryProfile
              ? "Editar Perfil de País"
              : "Agregar Perfil de País"}
          </div>
          <div className="w-full space-y-4 sm:w-10/12">
            <div className="w-full">
              <Select
                label="País"
                placeholder="Selecciona un país"
                data={countryOptions}
                value={countryId}
                onChange={setCountryId}
                searchable
                nothingFoundMessage="País no encontrado..."
                styles={{ dropdown: { zIndex: 9999 } }}
              />
            </div>
            {/* Así se verá la bandera en el cuadro del usuario */}
            {selectedCountry ? (
              <div className="flex flex-row items-center w-full gap-4 p-4 rounded-lg bg-gray-50 ring-1 ring-gray-200">
                <Image
                  src={`https://flagcdn.com/${selectedCountry.abbreviation?.toLowerCase()}.svg`}
                  alt={`Bandera de ${selectedCountry.name}`}
                  width={120}
                  height={90}
                  className="object-cover w-20 rounded-md h-14 ring-1 ring-gray-200"
                />
                <div className="flex flex-col">
                  <div className="text-sm font-semibold text-black">
                    {selectedCountry.name}
                  </div>
                  <div className="text-xs text-neutral-500">
                    Así se mostrará la bandera en el cuadro del usuario.
                  </div>
                </div>
              </div>
            ) : null}

            <div className="w-full">
              <Select
                label="Región"
                placeholder="Selecciona una región"
                description="La región se guarda en el país y es la que genera los filtros de la sección."
                data={(regions ?? []).map((region: any) => ({
                  value: String(region.id),
                  label: region.name,
                }))}
                value={regionId}
                onChange={setRegionId}
                searchable
                clearable
                nothingFoundMessage="Región no encontrada..."
                styles={{ dropdown: { zIndex: 9999 } }}
              />
            </div>

            <div className="w-full">
              <Select
                label="Estado"
                placeholder="Estado"
                data={[
                  { value: "active", label: "Activo" },
                  { value: "inactive", label: "Inactivo" },
                ]}
                value={status}
                onChange={setStatus}
                styles={{ dropdown: { zIndex: 9999 } }}
              />
            </div>

            <div className="relative w-full my-5 h-80 group">
              <div className="flex items-center justify-center w-full h-full text-base text-black border-2 border-black border-dashed rounded-xl">
                <Dropzone
                  openRef={openRef}
                  onDrop={handleDrop}
                  onReject={() => {
                    notifications.show({
                      id: "countryProfile",
                      autoClose: 5000,
                      withCloseButton: false,
                      title: "Error",
                      message: "El documento no puede pasar de 500 MB.",
                      color: "red",
                      loading: false,
                    });
                  }}
                  activateOnClick={false}
                  accept={PDF_MIME_TYPE}
                  maxFiles={1}
                  multiple={false}
                  maxSize={500 * 1024 * 1024}
                  styles={{ inner: { pointerEvents: "all" } }}
                  className="w-full bg-transparent group-hover:bg-transparent"
                >
                  <div className="flex flex-col items-center justify-center h-full gap-4">
                    {countryProfile || files.length > 0 ? (
                      <div className="flex flex-col items-center justify-center">
                        <DocumentIcon className="w-24" />
                        <Typography>
                          {files.length > 0
                            ? files[0].name
                            : countryProfile?.pdf}
                        </Typography>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <CloudArrowUpIcon className="w-24" />
                        <Typography>Solo se aceptan archivos PDF</Typography>
                      </div>
                    )}
                    <Button
                      onClick={handleClickSelectFile}
                      className={`text-black border-black group-hover:border-black/70 group-hover:text-black/70 duration-300 bg-transparent border-[1px] hover:shadow-none`}
                    >
                      Subir archivo
                    </Button>
                  </div>
                </Dropzone>
              </div>
            </div>

            <div className="flex justify-end w-full h-12 my-5 space-x-3">
              <Button
                disabled={
                  (countryProfile
                    ? !countryId
                    : !countryId || files.length === 0) || isLoading
                }
                onClick={!isLoading ? () => handleSubmit() : () => {}}
                color="green"
              >
                {isLoading ? (
                  <Spinner />
                ) : countryProfile ? (
                  "Actualizar"
                ) : (
                  "Guardar"
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
