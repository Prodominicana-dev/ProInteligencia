"use client";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function InfoDialog({
  open,
  handleOpen,
  title,
  description,
  link,
  image,
  color = "bg-black",
  imageList = [],
}: {
  open: boolean;
  handleOpen: () => void;
  title: string;
  description: string;
  link: string;
  image: string;
  color?: string;
  imageList?: string[];
}) {
  return (
    <Dialog
      open={open}
      size="lg"
      handler={handleOpen}
      className="w-full py-10 md:py-0 md:h-[50vh] bg-white flex justify-center items-center"
    >
      <DialogBody className="flex flex-col w-11/12 gap-10 text-black h-5/6 md:flex-row">
        <div className="flex flex-col justify-center w-full gap-5 md:w-6/12">
          <div className="flex flex-row items-center gap-5">
            <div
              className={`flex items-center justify-center w-16 md:w-24 p-2 bg-gradient-to-br ${color} rounded-lg`}
            >
              <Image
                src={image}
                alt={title}
                width={800}
                height={800}
                className="w-full"
              />
            </div>
            <h1 className="text-2xl xl:text-4xl font-custom">{title}</h1>
          </div>
          <p className="text-sm md:text-base">{description}</p>
          <div
            className={`w-full md:w-6/12 bg-gradient-to-br rounded-full p-[2px] ${color}`}
          >
            <Link
              href={link}
              className="flex items-center justify-center w-full py-4 text-sm text-black uppercase bg-white rounded-full"
            >
              Accede ahora
            </Link>
          </div>
        </div>
        <div className="relative flex-col hidden w-full gap-5 md:flex md:w-6/12">
          <div className="absolute left-0 z-10 rounded-lg -top-20 ">
            <Image
              src={imageList[0] || "/images/landing/graphics.png"}
              alt=""
              width={1920}
              height={1080}
              className="object-cover h-[12rem] w-[16rem] rounded-lg"
            />
          </div>
          <div className="absolute z-20 rounded-lg top-50 -right-20">
            <Image
              src={imageList[1] || "/images/landing/graphics.png"}
              alt=""
              width={1920}
              height={1080}
              className="object-cover h-[12rem] w-[16rem]  rounded-lg"
            />
          </div>
          <div className="absolute left-0 z-30 rounded-lg -bottom-20">
            <Image
              src={imageList[2] || "/images/landing/graphics.png"}
              alt=""
              width={1920}
              height={1080}
              className="object-cover h-[12rem] w-[16rem] rounded-lg"
            />
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
