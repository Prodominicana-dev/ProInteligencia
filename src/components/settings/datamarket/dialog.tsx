import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useState } from "react";
import Datamarket from "@/src/models/datamarket";
import {
  createDatamarket,
  updateDatamarket,
  useDataMarketsCategories,
} from "@/src/services/datamarket/service";
import React from "react";
import axios from "axios";

export default function DatamarketDialog({
  datamarket,
  open,
  handleOpen,
  updateDatamarkets,
}: {
  datamarket?: Datamarket;
  open: boolean;
  handleOpen: () => void;
  updateDatamarkets: () => void;
}) {
  const [datamarketTitle, setDatamarketTitle] = useState<any>(
    datamarket?.title
  );
  const [datamarketUrl, setDatamarketUrl] = useState<any>(datamarket?.url);
  const [datamarketCategory, setDatamarketCategory] = useState(
    datamarket?.category
  );
  const [categoryPriority, setCategoryPriority] = useState<number | undefined>(
    datamarket?.categoryPriority
  );
  const { data } = useDataMarketsCategories();
  const [isLoading, setIsLoading] = useState(false);

  const showPriorityInput =
    datamarket && datamarketCategory === "Comercio de bienes";

  const handleDatamarketSubmit = async () => {
    setIsLoading(true);
    const data: { [key: string]: any } = {
      title: datamarketTitle,
      category: datamarketCategory,
      url: datamarketUrl,
    };

    if (datamarket) {
      data["id"] = datamarket.id;
    }

    const action = datamarket ? updateDatamarket : createDatamarket;

    try {
      await action({ datamarket: data, handleOpen, updateDatamarkets });

      // Si es comercio de bienes y se está editando, hacer patch para actualizar prioridad
      if (showPriorityInput && typeof categoryPriority === "number") {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/datamarket/update/categories`,
          {
            id: datamarket.id,
            category: "Comercio de bienes",
            categoryPriority: categoryPriority,
          }
        );
        updateDatamarkets();
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader>
          {datamarket ? "Editar Datamarket" : "Agregar Datamarket"}
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
            <Input
              label="Título"
              crossOrigin={""}
              onChange={(e) => setDatamarketTitle(e.target.value)}
              defaultValue={datamarket?.title || ""}
            />
            <Input
              label="Url"
              crossOrigin={""}
              onChange={(e) => setDatamarketUrl(e.target.value)}
              defaultValue={datamarket?.url || ""}
            />
            <Input
              list="categories"
              crossOrigin={""}
              label="Categoría"
              onChange={(e) => setDatamarketCategory(e.target.value)}
              defaultValue={datamarket?.category || ""}
              value={datamarketCategory}
            />
            <datalist id="categories">
              {data?.map((value: any, index: any) => (
                <option key={index} value={value.category} />
              ))}
            </datalist>

            {showPriorityInput && (
              <Input
                type="number"
                min={1}
                max={data?.length || 10}
                label="Posición"
                value={categoryPriority === undefined ? "" : categoryPriority}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") {
                    setCategoryPriority(undefined);
                  } else {
                    setCategoryPriority(Number(value));
                  }
                }}
                crossOrigin=""
              />
            )}
            <Button
              className="bg-navy"
              disabled={
                isLoading ||
                !datamarketTitle ||
                !datamarketCategory ||
                !datamarketUrl
              }
              onClick={!isLoading ? handleDatamarketSubmit : () => {}}
            >
              {isLoading ? <Spinner /> : datamarket ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}
