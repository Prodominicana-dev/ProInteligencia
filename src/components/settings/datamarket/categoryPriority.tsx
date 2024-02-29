import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import React from "react";
import axios from "axios";

export default function SortCategory({
  categories,
  open,
  handleOpen,
  updateDatamarkets,
}: {
  categories: any;
  open: boolean;
  handleOpen: () => void;
  updateDatamarkets: () => void;
}) {
  const handleDatamarketSubmit = async (category: string, priority: number) => {
    const data = {
      category,
      categoryPriority: priority,
    };
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/datamarket/update/categories`,
      data
    );
    if (res.status === 200) {
      updateDatamarkets();
    }
  };

  return (
    <div>
      <Dialog size="md" open={open} handler={handleOpen}>
        <DialogHeader className="text-black">
          {"Ordenar categorías de los DataMarkets"}
        </DialogHeader>
        <DialogBody>
          <table className="w-full text-left text-black table-auto">
            <thead>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                Categoría
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                Prioridad
              </th>
            </thead>
            <tbody>
              {categories?.map((category: any, key: number) => {
                return (
                  <tr key={key}>
                    <td className="p-4 border-b border-blue-gray-100">
                      {category.category}
                    </td>
                    <td className="p-4 border-b border-blue-gray-100">
                      <input
                        type="number"
                        className="w-16 text-center"
                        id=""
                        min={1}
                        max={categories.length}
                        defaultValue={category.categoryPriority}
                        onChange={(e) => {
                          handleDatamarketSubmit(
                            category.category,
                            Number(e.target.value)
                          );
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </DialogBody>
      </Dialog>
    </div>
  );
}
