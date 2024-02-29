"use client";
import React from "react";
// import { useEffect, useState } from "react";
// import Header from "@/src/components/settings/header";
// import { nfd } from "unorm";
// import Card from "@/src/components/settings/users/card";
// import User from "@/src/models/user";
// import { useUsers } from "@/src/services/users/service";
// import Settings from "@/src/components/validate/settings";

export default function Page() {
  return <></>;
  // const { data, refetch } = useUsers();
  // const [user, setUser] = useState<User[]>([]);
  // const [refresh, setRefresh] = useState(false);
  // const [search, setSearch] = useState("");
  // const [currentPageData, setCurrentPageData] = useState<any[]>([]);
  // const itemsPerPage = 10;
  // const [currentPage, setCurrentPage] = useState(1);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = currentPage * itemsPerPage;
  // const [totalPages, setTotalPages] = useState(
  //   Math.ceil(data?.length / itemsPerPage)
  // );

  // const nextPage = () => {
  //   if (currentPage < user.length / itemsPerPage) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const prevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // useEffect(() => {
  //   if (search) {
  //     const filteredUsers = user.filter((user) => {
  //       const name = nfd(user.name.toLowerCase());
  //       const email = nfd(user.email.toLowerCase());
  //       const _search = search.toLowerCase();
  //       return name.includes(_search) || email.includes(_search);
  //     });
  //     const filteredTotalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  //     setTotalPages(filteredTotalPages);
  //     if (currentPage > filteredTotalPages) {
  //       setCurrentPage(1);
  //     }
  //     return setCurrentPageData(filteredUsers?.slice(startIndex, endIndex));
  //   }
  //   const normalTotalPages = Math.ceil(user?.length / itemsPerPage);
  //   setTotalPages(normalTotalPages);
  //   setCurrentPageData(user?.slice(startIndex, endIndex));
  // }, [user, data, currentPage, search]);

  // useEffect(() => {
  //   setUser(data);
  // }, [data]);

  // //const pagination = useAlertaComercialesPage();

  // useEffect(() => {
  //   refetch().then((res) => {
  //     setUser(res.data);
  //   });
  //   //pagination.refetch();
  // }, [refresh, refetch]);

  // const updateUsers = () => {
  //   setRefresh(!refresh);
  // };
  // return (
  //   <>
  //     <Settings
  //       permissionsList={["create:users", "update:users", "delete:users"]}
  //     >
  //       <Header
  //         title="Gestión de Usuarios"
  //         message="Tu centro de operaciones personal de usuarios. Agrega, edita y oculta información clave al instante. Toma el control de tus usuarios."
  //       />
  //       <div className="w-full h-16">
  //         <div className="flex flex-row flex-wrap justify-end w-full h-full p-8 space-x-8">
  //           <input
  //             type="text"
  //             className="h-10 px-5 rounded-full w-72 ring-2 ring-gray-300"
  //             placeholder="Buscar..."
  //             value={search}
  //             onChange={(e) => setSearch(e.target.value)}
  //           />
  //         </div>
  //       </div>
  //       <div className="w-full p-8 space-y-5">
  //         <div className="grid items-center justify-between w-full h-24 grid-cols-4 p-5 font-bold text-center bg-white rounded-lg ring-2 ring-gray-100">
  //           <div></div>
  //           <div className="text-center">Nombre</div>
  //           <div>Correo</div>
  //           <div>Roles</div>
  //         </div>

  //         {currentPageData?.map((user: any, key: number) => {
  //           return <Card key={key} user={user} updateUsers={updateUsers} />;
  //         })}

  //         <div className="flex flex-row items-center justify-end w-full py-4 space-x-3">
  //           <button
  //             className={`text-black w-32 h-8 text-center bg-gray-300 rounded-lg`}
  //             disabled={currentPage === 1 ? true : false}
  //             onClick={prevPage}
  //           >
  //             Anterior
  //           </button>
  //           <div className="flex items-center justify-center w-12 h-12 text-black bg-white rounded-full ring-1 ring-gray-300">
  //             {currentPage}/{totalPages}
  //           </div>
  //           <button
  //             className={`text-black w-32 h-8 text-center bg-gray-300 rounded-lg`}
  //             disabled={currentPage === totalPages ? true : false}
  //             onClick={nextPage}
  //           >
  //             Siguiente
  //           </button>
  //         </div>
  //       </div>
  //     </Settings>
  //   </>
  // );
}
