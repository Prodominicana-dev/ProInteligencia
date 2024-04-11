import Product from "@/src/models/product";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ProductProps {
  id?: string;
  product: any;
  handleOpen: () => void;
  updateProducts: () => void;
}

export function createProduct({
  product,
  handleOpen,
  updateProducts,
}: ProductProps) {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/product`, product)
    .then((res) => {
      if (res.status === 201) {
        notifications.show({
          id: "alertacomercial",
          autoClose: 5000,
          withCloseButton: false,
          title: "Producto creado",
          message: "El producto ha sido creado correctamente.",
          color: "green",
          loading: false,
        });
        handleOpen();
        updateProducts();
      } else {
        notifications.show({
          id: "alertacomercial",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "El producto no se ha creado correctamente.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function updateProduct({
  id,
  product,
  handleOpen,
  updateProducts,
}: ProductProps) {
  return axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, product)
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "alertacomercial",
          autoClose: 5000,
          withCloseButton: false,
          title: "Producto editado",
          message: "El producto ha sido actualizado correctamente.",
          color: "green",
          loading: false,
        });
        handleOpen();
        updateProducts();
      } else {
        notifications.show({
          id: "alertacomercial",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "El producto no se ha actualizado correctamente.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/products`;
      const { data } = await axios.get(url);
      return data.map((item: Product) => item);
    },
  });
}

export function useSelectProducts() {
  return useQuery({
    queryKey: ["selectProducts"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/products/select`;
      const { data } = await axios.get(url);
      return data.map((item: Product) => item);
    },
  });
}

export function useAllProducts() {
  return useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/products/all`;
      const { data } = await axios.get(url);
      return data.map((item: Product) => item);
    },
  });
}
