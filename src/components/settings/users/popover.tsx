import { createProduct } from "@/src/services/products/service";
import { PlusIcon } from "@heroicons/react/24/solid";
import React from "react";
import {
  Popover,
  Button,
  PopoverHandler,
  PopoverContent,
  Typography,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";

interface popoverProps {
  open: boolean;
  handleOpen: () => void;
  updateProducts: () => void;
}

export default function ProductPopover({
  open,
  handleOpen,
  updateProducts,
}: popoverProps) {
  const [productName, setProductName] = useState<any>("");
  const [productCode, setProductCode] = useState<any>("");
  const handleProductSubmit = async () => {
    const product = {
      name: productName,
      code: productCode,
    };
    // console.log(product);
    createProduct({ product, handleOpen, updateProducts });
    setProductName("");
    setProductCode("");
  };
  return (
    <Popover open={open} handler={handleOpen} placement="top">
      <PopoverHandler>
        <button className="bg-navy p-2 rounded-md w-1/12 flex justify-center items-center ">
          <PlusIcon className="w-5 text-white" />
        </button>
      </PopoverHandler>
      <PopoverContent className="w-64 z-[9999]">
        <Typography variant="h6" color="blue-gray" className="mb-6">
          Agregar Producto
        </Typography>
        <div className="flex flex-col gap-4">
          <Input
            label="Nombre"
            crossOrigin={""}
            onChange={(e) => setProductName(e.target.value)}
          />
          <Input
            label="Codigo"
            crossOrigin={""}
            onChange={(e) => setProductCode(e.target.value)}
          />
          <Button className="bg-navy" onClick={handleProductSubmit}>
            Agregar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
