import { createProduct, updateProduct } from "@/src/services/products/service";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useState } from "react";
import Product from "@/src/models/product";
import React from "react";

export default function ProductDialog({
  product,
  open,
  handleOpen,
  updateProducts,
}: {
  product?: Product;
  open: boolean;
  handleOpen: () => void;
  updateProducts: () => void;
}) {
  const [productName, setProductName] = useState<any>(product?.name);
  const [productCode, setProductCode] = useState<any>(product?.code);
  const [isLoading, setIsLoading] = useState(false);

  const handleProductSubmit = async () => {
    setIsLoading(true);
    const _product = {
      id: product?.id || 0,
      name: productName,
      code: productCode,
    };

    const action = _product.id !== 0 ? updateProduct : createProduct;

    action({ product: _product, handleOpen, updateProducts }).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <div>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader>
          {product ? "Editar Producto" : "Agregar Producto"}
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
            <Input
              label="Nombre"
              crossOrigin={""}
              onChange={(e) => setProductName(e.target.value)}
              defaultValue={product?.name || ""}
            />
            <Input
              label="Código"
              crossOrigin={""}
              onChange={(e) => setProductCode(e.target.value)}
              defaultValue={product?.code || ""}
            />
            <Button
              disabled={isLoading || !productName || !productCode}
              className="bg-navy"
              onClick={!isLoading ? handleProductSubmit : () => {}}
            >
              {isLoading ? <Spinner /> : product ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}
