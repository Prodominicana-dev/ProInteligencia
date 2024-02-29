import AlertaComercial from "@/src/models/alertacomercial";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useActiveAlertaComerciales() {
  return useQuery({
    queryKey: ["AlertaComerciales"],
    queryFn: async () => {
      const alertacomercialEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/alertacomercial`;
      const { data } = await axios.get(alertacomercialEndpoint);
      return data.map((item: AlertaComercial) => item);
    },
  });
}

export function useActiveAlertaComercialesPage() {
  const fetchActiveAlertaComercialesData = async (pageParam: any) => {
    const alertacomercialEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/alertacomercial/page/${pageParam}`;
    const { data } = await axios.get(alertacomercialEndpoint);
    return data;
  };
  return useInfiniteQuery({
    queryKey: ["activeAlertaComerciales"],
    queryFn: ({ pageParam }) => fetchActiveAlertaComercialesData(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.next,
  });
}

export function usePublicAlertaComercialesPage() {
  const fetchActiveAlertaComercialesData = async (pageParam: any) => {
    const alertacomercialEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/alertacomercial/page/public/${pageParam}`;
    const { data } = await axios.get(alertacomercialEndpoint);
    return data;
  };
  return useInfiniteQuery({
    queryKey: ["publicAlertaComerciales"],
    queryFn: ({ pageParam }) => fetchActiveAlertaComercialesData(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.next,
  });
}

export function useAlertaComercial(id: string) {
  return useQuery({
    queryKey: ["alertacomercial", id],
    queryFn: async () => {
      const alertacomercialEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/alertacomercial/${id}`;
      const { data } = await axios.get(alertacomercialEndpoint);
      return data;
    },
  });
}

export default function useAlertaComerciales() {
  return useQuery({
    queryKey: ["alertacomercials"],
    queryFn: async () => {
      const alertacomercialEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/alertacomercial/all`;
      const { data } = await axios.get(alertacomercialEndpoint);
      return data.map((item: AlertaComercial) => item);
    },
  });
}

export function useAlertaComercialesPage() {
  const fetchAlertaComercialesData = async (pageParam: any) => {
    const alertacomercialEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/alertacomercial/page/all/${pageParam}`;
    const { data } = await axios.get(alertacomercialEndpoint);
    return data;
  };

  return useInfiniteQuery({
    queryKey: ["alertacomercialsPage"],
    queryFn: ({ pageParam }) => fetchAlertaComercialesData(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.next,
  });
}

export function useAlertaComercialesCategory() {
  return useQuery({
    queryKey: ["alertacomercialscategory"],
    queryFn: async () => {
      const alertacomercialEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/category/alertacomercial`;
      const { data } = await axios.get(alertacomercialEndpoint);
      return data;
    },
  });
}
