"use client";
import React from "react";

export default function Header({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <>
      <div className="w-full h-[26rem] bg-gradient-to-r from-sky-600 from-[15%] via-green-400 to-green-500 flex flex-col justify-center items-center space-y-6">
        <div className="text-3xl font-bold text-center text-white lg:text-5xl">
          {title}
        </div>
        <div className="w-10/12 text-base font-thin text-center text-white sm:w-8/12 lg:w-6/12 sm:text-xl">
          {message}
        </div>
      </div>
    </>
  );
}
