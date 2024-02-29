import { Card, CardBody, CardHeader, Tooltip } from "@material-tailwind/react";
import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import AlertaComercial from "@/src/models/alertacomercial";
import React from "react";

export default function AlertaComercialCard(data: AlertaComercial) {
  return (
    <Link prefetch href={`/dashboard/alertacomercial/${data.id}`}>
      <Card className="w-full mt-6 cursor-pointer group h-80 ">
        <CardHeader color="white" className="relative ">
          <Image
            width={1920}
            height={1080}
            src={`${process.env.NEXT_PUBLIC_API_URL}/data/alertacomercial/${data.id}/img/${data.image}`}
            alt="card-image"
            className="object-cover h-52"
          />
        </CardHeader>
        <CardBody className="">
          <div className="text-gray-500 h-1/6">{data.category.name}</div>
          <div className="mb-2 text-xl font-bold line-clamp-2">
            <Tooltip content={data.title}>{data.title}</Tooltip>
          </div>
          <div className="text-xs text-end">
            {format(new Date(data.date), "dd MMMM yyyy", { locale: es })}
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
