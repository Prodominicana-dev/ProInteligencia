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
      <div className="w-full h-[26rem] bg-gradient-to-tr from-purple-500 from-[15%] via-sky-600 to-sky-400 flex flex-col justify-center items-center space-y-6">
        <div className="text-3xl lg:text-5xl font-bold text-white text-center">
          {title}
        </div>
        <div className="w-10/12 sm:w-8/12 lg:w-6/12 text-base sm:text-xl font-thin text-center text-white">
          {message}
        </div>
      </div>
    </>
  );
}
