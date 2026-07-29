import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface RegionProps {
  id?: number;
  region: any;
  handleOpen: () => void;
  updateRegions: () => void;
}

export function useRegions() {
  return useQuery({
    queryKey: ["regions"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/regions`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useActiveRegions() {
  return useQuery({
    queryKey: ["activeRegions"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/regions/active`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function createRegion({ region, handleOpen, updateRegions }: RegionProps) {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/region`, region)
    .then((res) => {
      if (res.status === 201 || res.status === 200) {
        notifications.show({
          id: "region",
          autoClose: 5000,
          withCloseButton: false,
          title: "Región agregada",
          message: "La región ha sido creada correctamente.",
          color: "green",
          loading: false,
        });
        handleOpen();
        updateRegions();
      }
    })
    .catch(() => {
      notifications.show({
        id: "region",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error",
        message: "La región no se ha creado correctamente.",
        color: "red",
        loading: false,
      });
    });
}

export function updateRegion({
  id,
  region,
  handleOpen,
  updateRegions,
}: RegionProps) {
  return axios
    .patch(`${process.env.NEXT_PUBLIC_API_URL}/region/${id}`, region)
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "region",
          autoClose: 5000,
          withCloseButton: false,
          title: "Región editada",
          message: "La región ha sido actualizada correctamente.",
          color: "green",
          loading: false,
        });
        handleOpen();
        updateRegions();
      }
    })
    .catch(() => {
      notifications.show({
        id: "region",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error",
        message: "La región no se ha actualizado correctamente.",
        color: "red",
        loading: false,
      });
    });
}
