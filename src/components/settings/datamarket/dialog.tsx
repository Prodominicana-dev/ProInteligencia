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
  const { data } = useDataMarketsCategories();
  const [isLoading, setIsLoading] = useState(false);

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

    action({ datamarket: data, handleOpen, updateDatamarkets }).then(() => {
      setIsLoading(false);
    });
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
