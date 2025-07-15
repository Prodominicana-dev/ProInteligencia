import { Card, CardBody, CardHeader, Tooltip } from "@material-tailwind/react";
import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import AlertaIED from "@/src/models/alertaIED";
import React from "react";

export default function AlertaIEDCard(data: AlertaIED) {
  return (
    <Link prefetch href={`/dashboard/alertaIED/${data.id}`}>
      <Card className="w-full mt-6 cursor-pointer group h-80">
        <CardHeader color="white" className="relative ">
          <Image
            width={400}
            height={220}
            sizes="(max-width: 768px) 100vw, 25vw"
            src={`${process.env.NEXT_PUBLIC_API_URL}/data/alertaIED/${data.id}/img/${data.image}`}
            alt="card-image"
            className="object-cover h-52 w-full"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
          />
        </CardHeader>
        <CardBody>
          <div className="text-gray-500">{data.category.name}</div>
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
