"use client";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import React from "react";
import { createRegion, updateRegion } from "@/src/services/region/service";

export default function RegionDialog({
  region,
  open,
  handleOpen,
  updateRegions,
}: {
  region?: any;
  open: boolean;
  handleOpen: () => void;
  updateRegions: () => void;
}) {
  const [name, setName] = useState(region?.name ?? "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (region) setName(region.name);
  }, [region]);

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const data = { name };
    region
      ? await updateRegion({
          id: region.id,
          region: data,
          handleOpen,
          updateRegions,
        })
      : await createRegion({ region: data, handleOpen, updateRegions });
    setIsLoading(false);
  };

  return (
    <div>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader>
          {region ? "Editar Región" : "Agregar Región"}
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
            <Input
              label="Nombre de la región"
              crossOrigin={""}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Button
              disabled={isLoading || !name}
              className="flex items-center justify-center bg-navy"
              onClick={handleSubmit}
            >
              {isLoading ? <Spinner /> : region ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}
