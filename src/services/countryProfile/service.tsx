import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface CountryProfileProps {
  id?: string;
  countryProfile: any;
  handleOpen: () => void;
  updateCountryProfiles: () => void;
  onUploadError?: () => void;
}

// URL interna del servidor, usada SOLO para subir archivos (evita el
// limite de tiempo de Cloudflare en peticiones largas). Solo funciona
// para usuarios conectados a la red interna de la oficina.
export const INTERNAL_UPLOAD_URL = "https://192.168.0.81:8081/apiv2/country-profile";

// Todos los perfiles (incluye inactivos) - usado en el panel de configuracion
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

// Perfiles activos - usado en la vista publica
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
  onUploadError,
}: CountryProfileProps) {
  return axios
    .post(INTERNAL_UPLOAD_URL, countryProfile)
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "countryProfile",
          autoClose: 5000,
          withCloseButton: false,
          title: "Perfil de pais agregado",
          message: "El perfil de pais ha sido creado correctamente.",
          color: "green",
          loading: false,
        });
        handleOpen();
        updateCountryProfiles();
      }
    })
    .catch(() => {
      if (onUploadError) {
        onUploadError();
      } else {
        notifications.show({
          id: "countryProfile",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "El perfil de pais no se ha creado correctamente.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function updateCountryProfile({
  id,
  countryProfile,
  handleOpen,
  updateCountryProfiles,
  onUploadError,
}: CountryProfileProps) {
  return axios
    .patch(`${INTERNAL_UPLOAD_URL}/${id}`, countryProfile)
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "countryProfile",
          autoClose: 5000,
          withCloseButton: false,
          title: "Perfil de pais editado",
          message: "El perfil de pais ha sido actualizado correctamente.",
          color: "green",
          loading: false,
        });
        handleOpen();
        updateCountryProfiles();
      }
    })
    .catch(() => {
      if (onUploadError) {
        onUploadError();
      } else {
        notifications.show({
          id: "countryProfile",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "El perfil de pais no se ha actualizado correctamente.",
          color: "red",
          loading: false,
        });
      }
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
          title: "Perfil de pais eliminado",
          message: "El perfil de pais ha sido eliminado correctamente.",
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
        message: "El perfil de pais no se ha eliminado correctamente.",
        color: "red",
        loading: false,
      });
    });
}