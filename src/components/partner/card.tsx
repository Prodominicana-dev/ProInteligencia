import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Card({ partner }: { partner: any }) {
  return (
    <>
      <div className="flex flex-col items-center justify-between p-4 space-y-3 rounded-lg shadow-lg w-full h-[30rem]">
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <Image
            width={1920}
            height={1080}
            src={`${process.env.NEXT_PUBLIC_API_URL}/data/partner/${partner.id}/img/${partner.image}`}
            alt="image"
            className="object-cover w-64 h-56 rounded-lg shadow-md"
          />
          <div className="flex flex-col items-center justify-center w-11/12">
            <div className="w-10/12 text-xl font-semibold text-center text-black truncate">
              <Tooltip content={partner.title}>{partner.title}</Tooltip>
            </div>
            <div className="text-base font-thin text-center text-black truncate line-clamp-1">
              {partner.type === "nacional" ? "Nacional" : "Internacional"}
            </div>
          </div>
        </div>
        <div className="w-11/12 text-sm font-normal text-center text-zinc-600 line-clamp-3">
          <Tooltip content={partner.description}>{partner.description}</Tooltip>
        </div>
        <Link
          href={partner.url}
          target="_blank"
          className="flex flex-row items-center justify-center w-11/12 h-10 space-x-1 text-white duration-300 rounded-lg bg-navy hover:shadow-lg hover:text-white/80"
        >
          <div>Visitar</div>{" "}
          <ArrowTopRightOnSquareIcon className="w-6 h-6 text-white" />
        </Link>
      </div>
    </>
  );
}
