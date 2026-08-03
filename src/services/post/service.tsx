import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface PostsProps {
  id?: number;
  post: any;
  handleOpen: () => void;
  updatePosts: () => void;
  onUploadError?: () => void;
}

// URL interna del servidor, usada SOLO para subir archivos (evita el
// limite de tiempo de Cloudflare en peticiones largas). Solo funciona
// para usuarios conectados a la red interna de la oficina.
export const INTERNAL_POST_UPLOAD_URL = "https://192.168.0.81:8081/apiv2/post";

export function usePosts() {
  return useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/post`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function usePost(id: string) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/post/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function createPost({
  post,
  handleOpen,
  updatePosts,
  onUploadError,
}: PostsProps) {
  return axios
    .post(INTERNAL_POST_UPLOAD_URL, post)
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "post",
          autoClose: 5000,
          withCloseButton: false,
          title: "Fuente de informacion agregada",
          message: "La publicacion ha sido creada correctamente.",
          color: "green",
          loading: false,
        });
        handleOpen();
        updatePosts();
      } else {
        notifications.show({
          id: "post",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "La publicacion no se ha creado correctamente.",
          color: "red",
          loading: false,
        });
      }
    })
    .catch(() => {
      if (onUploadError) {
        onUploadError();
      } else {
        notifications.show({
          id: "post",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "La publicacion no se ha creado correctamente.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function updatePost({
  id,
  post,
  handleOpen,
  updatePosts,
  onUploadError,
}: PostsProps) {
  return axios
    .patch(`${INTERNAL_POST_UPLOAD_URL}/${id}`, post)
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "post",
          autoClose: 5000,
          withCloseButton: false,
          title: "Publicacion editada",
          message: "La publicacion ha sido actualizado correctamente.",
          color: "green",
          loading: false,
        });
        handleOpen();
        updatePosts();
      } else {
        notifications.show({
          id: "post",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "La publicacion no se ha actualizado correctamente.",
          color: "red",
          loading: false,
        });
      }
    })
    .catch(() => {
      if (onUploadError) {
        onUploadError();
      } else {
        notifications.show({
          id: "post",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "La publicacion no se ha actualizado correctamente.",
          color: "red",
          loading: false,
        });
      }
    });
}