"use client";
import React from "react";
import { useEffect, useState } from "react";
import Header from "@/src/components/settings/header";
import { nfd } from "unorm";
import Settings from "@/src/components/validate/settings";
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import NotFound from "@/src/components/validate/notFound";
import PostDialog from "@/src/components/settings/post/dialog";
import Card from "@/src/components/settings/post/card";
import { usePosts } from "@/src/services/post/service";

export default function Page() {
  const { data, refetch } = usePosts();
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState<any>({
    label: "Categoría...",
    value: "",
  });
  // const [categories] = useState<any[]>([
  //   { label: "Nacional", value: "nacional" },
  //   { label: "Internacional", value: "internacional" },
  // ]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [currentPageData, setCurrentPageData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(
    (currentPage - 1) * itemsPerPage
  );
  const [endIndex] = useState(currentPage * itemsPerPage);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data?.posts.length / itemsPerPage)
  );

  const nextPage = () => {
    if (currentPage < posts.length / itemsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setPosts(data?.posts);
    setTotal(data?.posts.length || 0);
    setTotalPages(Math.ceil(data?.posts.length / itemsPerPage));
  }, [data]);

  useEffect(() => {
    refetch().then((res) => {
      setPosts(res.data.posts);
      setTotal(data?.posts.length || 0);
      setTotalPages(Math.ceil(data?.posts.length / itemsPerPage));
    });
  }, [refresh, refetch]);

  useEffect(() => {
    // Filtros iniciales
    if (posts) {
      let filteredPosts = posts;

      // Filtrar por país si se ha proporcionado una búsqueda de país
      if (search) {
        const searchLower = search.toLowerCase();
        filteredPosts = filteredPosts.filter((source: any) => {
          const title = nfd(source.title.toLowerCase());
          const category = nfd(source.category.toLowerCase());
          const type = nfd(source.type.toLowerCase());
          const language = nfd(source.language.toLowerCase());
          return (
            title.includes(searchLower) ||
            category.includes(searchLower) ||
            type.includes(searchLower) ||
            language.includes(searchLower)
          );
        });
      }

      // Actualizar los totales y la página actual
      const filteredTotalPages = Math.ceil(
        filteredPosts?.length / itemsPerPage
      );
      setTotalPages(filteredTotalPages);
      setTotal(filteredPosts?.length);

      if (currentPage > filteredTotalPages) {
        setCurrentPage(1);
      }

      // Actualizar los datos de la página actual
      setCurrentPageData(filteredPosts?.slice(startIndex, endIndex));
    }
  }, [currentPage, search, categorySearch]);

  useEffect(() => {
    if (posts) {
      setStartIndex((currentPage - 1) * itemsPerPage);
      const endIndex = startIndex + itemsPerPage;
      setCurrentPageData(posts?.slice(startIndex, endIndex));
    }
  }, [posts, currentPage]);

  const updatePosts = () => {
    setRefresh(!refresh);
  };

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const filterVisible = isVisible ? `block` : `hidden`;
  return (
    <>
      <Settings
        permissionsList={[
          "create:datamarket",
          "update:datamarket",
          "delete:datamarket",
        ]}
      >
        <Header
          title="Gestiona tus publicaciones"
          message="Tu centro de operaciones personal para gestionar las fuentes externas. Agrega, edita y oculta información clave al instante."
        />
        <div className="flex flex-col w-full p-4 space-y-2 sm:p-8 sm:space-y-0 sm:flex-row">
          <div className="flex items-center justify-start w-full text-xl font-semibold text-center text-black sm:text-left sm:w-4/12">
            Cantidad de publicaciones: {total}
          </div>
          <div className="flex flex-col flex-wrap justify-end w-full h-full space-y-2 sm:space-y-0 sm:space-x-5 sm:flex-row sm:w-8/12">
            <button
              onClick={handleOpen}
              className={`text-white w-full sm:w-72 h-10 text-center bg-navy rounded-lg hover:shadow-lg font-semibold duration-300 hover:text-white/80`}
            >
              Agregar publicación
            </button>
            <button
              onClick={handleVisibility}
              className={`text-black flex flex-row justify-center items-center space-x-2 w-full sm:w-44 h-10 text-center bg-white rounded-lg hover:shadow-lg font-semibold duration-300 hover:text-black/80 border-2 border-black`}
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              <div>Filtrar</div>
            </button>
          </div>
        </div>
        <div
          className={`${filterVisible} flex flex-col-reverse  sm:flex-row justify-end w-full px-4 gap-4 sm:space-x-5 sm:px-8`}
        >
          <input
            type="text"
            className="w-full px-2 rounded-lg sm:px-5 h-9 sm:w-72 ring-1 ring-gray-300"
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex items-end justify-end -order-last sm:order-none">
            <button
              className="flex items-center justify-center w-10 h-10 text-white duration-300 bg-red-600 rounded-lg hover:bg-red-700"
              onClick={() => {
                setSearch("");
                setCategorySearch({ label: "", value: "" });
                setIsVisible(false);
              }}
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <div className="w-full p-4 space-y-5 sm:p-8">
          {currentPageData?.length === 0 ? (
            <NotFound />
          ) : (
            <>
              <div className="grid items-center justify-between w-full h-24 grid-cols-3 p-5 font-bold text-center bg-white rounded-lg sm:grid-cols-4 lg:grid-cols-5 ring-2 ring-gray-100">
                <div className="text-center">Título</div>
                <div className="hidden sm:block">Categoría</div>
                <div className="hidden lg:block">Tipo</div>
                <div>Idioma</div>
                <div>Acción</div>
              </div>
              {currentPageData?.map((post: any, key: number) => {
                return (
                  <Card
                    key={key}
                    post={post}
                    updatePosts={updatePosts}
                    categories={data?.categories}
                    types={data?.types}
                    languages={data?.languages}
                  />
                );
              })}

              <div className="flex flex-row items-center w-full py-4 space-x-3 sm:justify-end">
                <button
                  className={`text-black  w-5/12 sm:w-32 h-8 text-center bg-gray-300 rounded-lg`}
                  disabled={currentPage === 1 ? true : false}
                  onClick={prevPage}
                >
                  Anterior
                </button>
                <div className="flex items-center justify-center w-10 h-10 text-black bg-white rounded-full sm:w-12 sm:h-12 ring-1 ring-gray-300">
                  {currentPage}/{totalPages}
                </div>
                <button
                  className={`text-black w-5/12 sm:w-32 h-8 text-center bg-gray-300 rounded-lg`}
                  disabled={currentPage === totalPages ? true : false}
                  onClick={nextPage}
                >
                  Siguiente
                </button>
              </div>
            </>
          )}
        </div>
      </Settings>
      {open ? (
        <>
          <PostDialog
            open={open}
            handleOpen={handleOpen}
            updatePosts={updatePosts}
            categories={data?.categories}
            types={data?.types}
            languages={data?.languages}
          />
        </>
      ) : null}
    </>
  );
}
