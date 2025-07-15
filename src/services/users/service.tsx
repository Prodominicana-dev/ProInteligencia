import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "typescript-cookie";

const header = {
  headers: {
    Authorization: `Bearer ${getCookie("authToken")}`,
  },
};

interface AssignUsersRolesProps {
  id: String;
  data: {
    roles: String[];
  };
  handleOpen: () => void;
  updateUser: () => void;
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`;
      const { data } = await axios.get(url, header);
      // console.log(header);
      return data;
    },
  });
}

export function useUsersPermissions(id: String) {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${id}/permissions`;
      const { data } = await axios.get(url, header);
      return data;
    },
  });
}

export function useUserRoles(id: String) {
  return useQuery({
    queryKey: ["usersRoles"],
    queryFn: async () => {
      const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${id}/roles`;
      const { data } = await axios.get(url, header);
      return data;
    },
  });
}

export function useRoles() {
  return useQuery({
    queryKey: ["Roles"],
    queryFn: async () => {
      const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/roles`;
      const { data } = await axios.get(url, header);
      return data;
    },
  });
}

export function assignUserRoles({
  id,
  data,
  handleOpen,
  updateUser,
}: AssignUsersRolesProps) {
  return axios
    .post(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${id}/roles`,
      data,
      header
    )

    .then((res) => {
      if (res.status === 204) {
        notifications.show({
          id: "alertacomercial",
          autoClose: 5000,
          withCloseButton: false,
          title: "Roles asignados",
          message: "Se han actualizado los roles del usuario",
          color: "green",
          loading: false,
        });
        handleOpen();
        updateUser();
      } else {
        notifications.show({
          id: "alertacomercial",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message:
            "No se ha podido asignar los roles al usuario, favor intente de nuevo.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function removeUserRoles({
  id,
  data,
  handleOpen,
  updateUser,
}: AssignUsersRolesProps) {
  return axios
    .delete(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${id}/roles`, {
      ...header,
      data,
    })

    .then((res) => {
      if (res.status === 204) {
        notifications.show({
          id: "alertacomercial",
          autoClose: 5000,
          withCloseButton: false,
          title: "Roles eliminados",
          message: "Se han actualizado los roles del usuario",
          color: "green",
          loading: false,
        });
        handleOpen();
        updateUser();
      } else {
        notifications.show({
          id: "alertacomercial",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message:
            "No se ha podido eliminar los roles al usuario, favor intente de nuevo.",
          color: "red",
          loading: false,
        });
      }
    });
}
