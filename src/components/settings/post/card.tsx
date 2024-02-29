import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import DeleteButton from "../delete";
import PostDialog from "./dialog";
import { Tooltip } from "@material-tailwind/react";
import React from "react";

export default function Card({
  post,
  updatePosts,
  categories,
  types,
  languages,
}: {
  post: any;
  updatePosts: () => void;
  categories: any[];
  types: any[];
  languages: any[];
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(!deleteOpen);
  const deleteCreateNotification = {
    title: "Publicación eliminada",
    message: "La publicación ha sido eliminada exitosamente.",
    color: "green",
  };

  const deleteErrorNotification = {
    title: "Error eliminando la publicación",
    message: "Ha ocurrido un error, intenta nuevamente.",
    color: "red",
  };

  return (
    <>
      <div className="grid items-center w-full h-24 grid-cols-3 p-5 text-center bg-white rounded-lg sm:grid-cols-4 lg:grid-cols-5 ring-2 ring-gray-100">
        <div className="truncate line-clamp-1">
          <Tooltip content={post.title}>{post.title}</Tooltip>
        </div>
        <div className="hidden truncate line-clamp-1 sm:block">
          <Tooltip content={post.category}>{post.category}</Tooltip>
        </div>
        <div className="hidden truncate line-clamp-1 lg:block">
          <Tooltip content={post.type}>{post.type}</Tooltip>
        </div>
        <div>
          <Tooltip content={post.language}>{post.language}</Tooltip>
        </div>
        <div className="flex justify-center space-x-5 ">
          <button
            onClick={handleOpen}
            className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
          >
            <PencilSquareIcon className="w-7" />
          </button>
          <button
            className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
            onClick={handleDeleteOpen}
          >
            <TrashIcon className="w-7" />
          </button>
        </div>
      </div>
      <DeleteButton
        open={deleteOpen}
        handleOpen={handleDeleteOpen}
        update={updatePosts}
        title={"¿Estás seguro de eliminar esta publicación?"}
        message="La publicación será eliminada y no podrá ser recuperada."
        endpoint={`/post/${post.id}`}
        createNotification={deleteCreateNotification}
        errorNotification={deleteErrorNotification}
      />
      {open ? (
        <>
          <PostDialog
            post={post}
            open={open}
            handleOpen={handleOpen}
            updatePosts={updatePosts}
            categories={categories}
            types={types}
            languages={languages}
          />
        </>
      ) : null}
    </>
  );
}
