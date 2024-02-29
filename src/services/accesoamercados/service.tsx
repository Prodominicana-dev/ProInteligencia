import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AccesoaMercado from "@/src/models/accesoamercado";

export function useAccesoaMercado(id: string) {
  return useQuery({
    queryKey: ["accesoamercado", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/accesoamercado/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useAccesoaMercados() {
  return useQuery({
    queryKey: ["accesoamercados"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/accesoamercado`;
      const { data } = await axios.get(url);
      return data.map((item: AccesoaMercado) => item);
    },
  });
}

export function useAccesoaMercadosSettings() {
  return useQuery({
    queryKey: ["accesoamercadosSettings"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/accesoamercado/settings`;
      const { data } = await axios.get(url);
      return data.map((item: AccesoaMercado) => item);
    },
  });
}

export function deleteAccesoaMercado(id: string) {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/accesoamercado/${id}`
  );
}
