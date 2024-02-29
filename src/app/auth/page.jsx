import Background from "@/src/components/home/background";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <>
      <Background
        video={"/videos/accesoamercado.mp4"}
        color={"bg-gradient-to-l from-blue-700 from-[40%] to-sky-500/70"}
      />
      <div className="w-full h-screen ">
        <div className="w-6/12 h-full ml-auto flex flex-col justify-center items-center">
          <div className="w-full flex justify-center ">
            <Image
              src={"/images/logo/prointeligencia-white.png"}
              width={500}
              height={500}
              draggable={false}
              alt=""
              className="w-96"
            />
          </div>
          <div className="w-10/12 h-20 flex flex-row justify-center mt-8 space-x-8">
            <Link
              href={"/api/auth/login"}
              className="flex justify-center items-center text-lg text-blue-700 w-64 h-16 bg-white hover:bg-gray-100 duration-200 shadow-md rounded-[30px]
            "
            >
              Iniciar sesión
            </Link>
            <Link
              href={"/api/auth/signup"}
              className="flex justify-center items-center text-lg text-blue-700 w-64 h-16 bg-white hover:bg-gray-100 duration-200 shadow-md rounded-[30px]"
            >
              Crear cuenta
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
