import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

export function useDomains() {
  return useQuery({
    queryKey: ["domains"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/reserved-domains/all`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useDomainsOptions() {
  return useQuery({
    queryKey: ["domainsConf"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/reserved-domains/all`;
      const { data } = await axios.get(url);
      // Con la data tenemos que filtrar solo los que sean alertaIED y devolverlos como label y value
      const domains = data.filter((domain: any) => domain.platform === "alertaIED");
      const options = domains.map((domain: any) => ({
        label: domain.name,
        value: domain.id,
      }));
      return options;
    },
  });
}

export async function createDomain(
  domain: any,
  update: () => void,
) {
  try {
    
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/reserved-domains/`,
      domain,
      
    );

    if (res.status === 201) {
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Colaborador creada",
        message: "El colaborador ha sido creada correctamente.",
        color: "green",
        loading: false,
      });
      update();
    } else {
      handleErrorResponse(res);
    }
  } catch (error) {
    notifications.show({
      id: "member",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error creando al colaborador",
      message: "Ocurrió un error creando al colaborador.",
      color: "red",
      loading: false,
    });
  }
}

function handleErrorResponse(response: any) {
  switch (response.status) {
    case 500:
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error creando al colaborador",
        message: "Ocurrió un error creando al colaborador.",
        color: "red",
        loading: false,
      });
      break;

    case 401:
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Usuario no autorizado",
        message: "No tienes permisos para crear un colaborador.",
        color: "red",
        loading: false,
      });
      break;
    // Puedes agregar más casos según sea necesario
    default:
      break;
  }
}

export async function editDomain(
  id: string,
  domain: any,
  update: () => void,
) {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/reserved-domains/${id}`,
      domain,
    );

    if (res.status === 200) {
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Colaborador actualizada",
        message: "El colaborador ha sido actualizado correctamente.",
        color: "green",
        loading: false,
      });
      update();
    } else {
      handleEditErrorResponse(res);
    }
  } catch (error) {
    notifications.show({
      id: "member",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error editando al colaborador",
      message:
        "Ocurrió un error editando al colaborador. Por favor, intenta de nuevo.",
      color: "red",
      loading: false,
    });
  }
}

function handleEditErrorResponse(response: any) {
  switch (response.status) {
    case 500:
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error editando al colaborador",
        message:
          "Ocurrió un error editando al colaborador. Por favor, intenta de nuevo.",
        color: "red",
        loading: false,
      });
      break;

    case 401:
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Usuario inautorizado",
        message: "No tienes permisos para editar un colaborador.",
        color: "red",
        loading: false,
      });
      break;
    // Puedes agregar más casos según sea necesario
    default:
      break;
  }
}

export function deleteDomain(
  id: string,
  handleOpen: () => void,
  update: () => void,
  userId: string
) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/reserved-domains/${id}`, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "member",
          autoClose: 5000,
          withCloseButton: false,
          title: "Colaborador eliminada",
          message:
            "El colaborador ha sido eliminado correctamente. No podrás recuperarlo.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "member",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error borrando al colaborador.",
          color: "red",
          loading: false,
        });
      }
      if (res.status === 401) {
        notifications.show({
          id: "member",
          autoClose: 5000,
          withCloseButton: false,
          title: "Usuario inautorizado",
          message: "No tienes permisos para eliminar un colaborador.",
          color: "red",
          loading: false,
        });
      }
    });
}
