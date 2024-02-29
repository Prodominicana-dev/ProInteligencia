import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DataMarket from "@/src/models/datamarket";
import { notifications } from "@mantine/notifications";

interface DatamarketProps {
  datamarket: any;
  handleOpen: () => void;
  updateDatamarkets: () => void;
}

export function createDatamarket({
  datamarket,
  handleOpen,
  updateDatamarkets,
}: DatamarketProps) {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/datamarket`, datamarket)
    .then((res) => {
      if (res.status === 201) {
        notifications.show({
          id: "alertacomercial",
          autoClose: 5000,
          withCloseButton: false,
          title: "Datamarket creado",
          message: "El datamarket ha sido creado correctamente.",
          color: "green",
          loading: false,
        });
        handleOpen();
        updateDatamarkets();
      } else {
        notifications.show({
          id: "alertacomercial",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "El datamarket no se ha creado correctamente.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function updateDatamarket({
  datamarket,
  handleOpen,
  updateDatamarkets,
}: DatamarketProps) {
  return axios
    .patch(
      `${process.env.NEXT_PUBLIC_API_URL}/datamarket/${datamarket.id}`,
      datamarket
    )
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "alertacomercial",
          autoClose: 5000,
          withCloseButton: false,
          title: "Datamarket editado",
          message: "El datamarket ha sido actualizado correctamente.",
          color: "green",
          loading: false,
        });
        handleOpen();
        updateDatamarkets();
      } else {
        notifications.show({
          id: "alertacomercial",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "El datamarket no se ha actualizado correctamente.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function useOnlyCategories() {
  return useQuery({
    queryKey: ["onlyCategories"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/datamarket/only/category`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useDataMarkets() {
  return useQuery({
    queryKey: ["datamarkets"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/datamarket/active`;
      const { data } = await axios.get(url);
      return data.map((item: DataMarket) => item);
    },
  });
}

export function useAllDataMarkets() {
  return useQuery({
    queryKey: ["alldatamarkets"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/datamarket`;
      const { data } = await axios.get(url);
      return data.map((item: DataMarket) => item);
    },
  });
}

export function useDataMarketsCategories() {
  return useQuery({
    queryKey: ["datamarketsCategories"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/datamarket/group/category`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useDataMarketsByCategory(category: string) {
  return useQuery({
    queryKey: ["datamarketsCategories", category],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/datamarket/category/${category}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useDataMarket(id: string) {
  return useQuery({
    queryKey: ["datamarket", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/datamarket/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}
