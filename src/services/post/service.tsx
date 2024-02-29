import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface PostsProps {
  id?: number;
  post: any;
  handleOpen: () => void;
  updatePosts: () => void;
}

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

export function createPost({ post, handleOpen, updatePosts }: PostsProps) {
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/post`, post)
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "post",
          autoClose: 5000,
          withCloseButton: false,
          title: "Fuente de información agregada",
          message: "La publicación ha sido creada correctamente.",
          color: "green",
          loading: false,
        });
        handleOpen();
        updatePosts();
      }
      notifications.show({
        id: "post",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error",
        message: "La publicación no se ha creado correctamente.",
        color: "green",
        loading: false,
      });
    });
}

export function updatePost({ id, post, handleOpen, updatePosts }: PostsProps) {
  return axios
    .patch(`${process.env.NEXT_PUBLIC_API_URL}/post/${id}`, post)
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "post",
          autoClose: 5000,
          withCloseButton: false,
          title: "Publicacion editada",
          message: "La publicación ha sido actualizado correctamente.",
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
          message: "La publicación no se ha actualizado correctamente.",
          color: "red",
          loading: false,
        });
      }
    });
}
