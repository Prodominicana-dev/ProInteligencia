import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[90vh] px-4 py-12 space-y-8 sm:p-12">
      <Image
        width={300}
        height={300}
        src="/svg/illustrations/nopermissions.svg"
        className="w-full h-52"
        alt="svg"
      />
      <div className="text-3xl font-bold text-black">Acceso restringido</div>
      <div className="w-11/12 text-lg font-normal text-left text-gray-500 sm:text-center sm:w-8/12 xl:w-4/12">
        El acceso a esta vista está restringido. Si crees que deberías tener
        acceso, por favor, ponte en contacto con el administrador.
      </div>
      <Link
        href={`/`}
        className="flex items-center justify-center w-56 h-10 text-white rounded-lg shadow-sm bg-navy"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
