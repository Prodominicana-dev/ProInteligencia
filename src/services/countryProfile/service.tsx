import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface CountryProfileProps {
  id?: string;
  countryProfile: any;
  handleOpen: () => void;
  updateCountryProfiles: () => void;
}

// Todos los perfiles (incluye inactivos) — usado en el panel de configuración
export function useCountryProfiles() {
  return useQuery({
    queryKey: ["countryProfiles"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/country-profile`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

// Perfiles activos — usado en la vista pública
export function useActiveCountryProfiles() {
  return useQuery({
    queryKey: ["activeCountryProfiles"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/country-profile/active`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useCountryProfile(id: string) {
  return useQuery({
    queryKey: ["countryProfile", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/country-profile/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function createCountryProfile({
  countryProfile,
  handleOpen,
  updateCountryProfiles,
}: CountryProfileProps) {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/country-profile`, countryProfile)
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "countryProfile",
          autoClose: 5000,
          withCloseButton: false,
          title: "Perfil de país agregado",
          message: "El perfil de país ha sido creado correctamente.",
          color: "green",
          loading: false,
        });
        handleOpen();
        updateCountryProfiles();
      }
    })
    .catch(() => {
      notifications.show({
        id: "countryProfile",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error",
        message: "El perfil de país no se ha creado correctamente.",
        color: "red",
        loading: false,
      });
    });
}

export function updateCountryProfile({
  id,
  countryProfile,
  handleOpen,
  updateCountryProfiles,
}: CountryProfileProps) {
  return axios
    .patch(
      `${process.env.NEXT_PUBLIC_API_URL}/country-profile/${id}`,
      countryProfile
    )
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "countryProfile",
          autoClose: 5000,
          withCloseButton: false,
          title: "Perfil de país editado",
          message: "El perfil de país ha sido actualizado correctamente.",
          color: "green",
          loading: false,
        });
        handleOpen();
        updateCountryProfiles();
      }
    })
    .catch(() => {
      notifications.show({
        id: "countryProfile",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error",
        message: "El perfil de país no se ha actualizado correctamente.",
        color: "red",
        loading: false,
      });
    });
}

export function deleteCountryProfile({
  id,
  handleOpen,
  updateCountryProfiles,
}: any) {
  return axios
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/country-profile/${id}`)
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "countryProfile",
          autoClose: 5000,
          withCloseButton: false,
          title: "Perfil de país eliminado",
          message: "El perfil de país ha sido eliminado correctamente.",
          color: "green",
          loading: false,
        });
        handleOpen();
        updateCountryProfiles();
      }
    })
    .catch(() => {
      notifications.show({
        id: "countryProfile",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error",
        message: "El perfil de país no se ha eliminado correctamente.",
        color: "red",
        loading: false,
      });
    });
}
