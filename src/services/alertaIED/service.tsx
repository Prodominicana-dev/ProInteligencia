import AlertaIED from "@/src/models/alertaIED";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useActiveAlertasIED() {
  return useQuery({
    queryKey: ["AlertasIED"],
    queryFn: async () => {
      const alertaIEDEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/alertaIED`;
      const { data } = await axios.get(alertaIEDEndpoint);
      return data.map((item: AlertaIED) => item);
    },
  });
}

export function useActiveAlertasIEDPage() {
  const fetchActiveAlertasIEDData = async (pageParam: any) => {
    const alertaIEDEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/alertaIED/page/${pageParam}`;
    const { data } = await axios.get(alertaIEDEndpoint);
    return data;
  };
  return useInfiniteQuery({
    queryKey: ["activeAlertasIED"],
    queryFn: ({ pageParam }) => fetchActiveAlertasIEDData(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.next,
  });
}

export function usePublicAlertasIEDPage() {
  const fetchActiveAlertasIEDData = async (pageParam: any) => {
    const alertaIEDEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/alertaIED/page/public/${pageParam}`;
    const { data } = await axios.get(alertaIEDEndpoint);
    return data;
  };
  return useInfiniteQuery({
    queryKey: ["publicAlertasIED"],
    queryFn: ({ pageParam }) => fetchActiveAlertasIEDData(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.next,
  });
}

export function useAlertaIED(id: string) {
  return useQuery({
    queryKey: ["alertaIED", id],
    queryFn: async () => {
      const alertaIEDEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/alertaIED/${id}`;
      const { data } = await axios.get(alertaIEDEndpoint);
      return data;
    },
  });
}

export function useAlertasIED() {
  return useQuery({
    queryKey: ["alertasIED"],
    queryFn: async () => {
      const alertaIEDEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/alertaIED/all`;
      const { data } = await axios.get(alertaIEDEndpoint);
      return data.map((item: AlertaIED) => item);
    },
  });
}

export function useAlertasIEDPage() {
  const fetchAlertasIEDData = async (pageParam: any) => {
    const alertaIEDEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/alertaIED/page/all/${pageParam}`;
    const { data } = await axios.get(alertaIEDEndpoint);
    return data;
  };

  return useInfiniteQuery({
    queryKey: ["alertasIEDPage"],
    queryFn: ({ pageParam }) => fetchAlertasIEDData(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.next,
  });
}

export function useAlertasIEDCategory() {
  return useQuery({
    queryKey: ["alertasIEDcategory"],
    queryFn: async () => {
      const alertaIEDEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/category/alertaIED`;
      const { data } = await axios.get(alertaIEDEndpoint);
      return data;
    },
  });
}
