"use client";
import Link from "next/link";
import React, { useRef } from "react";
import { useHover } from "usehooks-ts";

export default function Page() {
  const tools = [
    {
      name: "Data Market",
      video: "/videos/datamarket.mp4",
      link: "/dashboard/datamarket/242fe1e0-327e-405e-8611-f60f96c67e57",
    },
    {
      name: "Acceso a Mercados",
      video: "/videos/connection.mp4",
      link: "/dashboard/accesoamercado",
    },
    {
      name: "Alertas Comerciales",
      video: "/videos/accesoamercado.mp4",
      link: "/dashboard/alertacomercial",
    },
    {
      name: "Alertas IED",
      video: "/videos/charts.mp4#t=1",
      link: "/dashboard/alertaIED",
    },
  ];
  return (
    <div className="py-10 flex justify-center">
      <div className="w-10/12 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {tools.map((tool, index) => (
          <ToolCard
            name={tool.name}
            video={tool.video}
            link={tool.link}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

function ToolCard({ name, video, link }: any) {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const videoRef = useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      if (isHover) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHover]);

  return (
    <Link
      href={link}
      ref={hoverRef}
      className="rounded-xl group relative overflow-hidden"
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover group-hover:scale-125 transition-transform duration-1000"
        muted
        loop
      >
        <source src={video} type="video/mp4" className="absolute inset-0" />
      </video>
      <div className="absolute inset-0 bg-black/40 flex justify-center items-center uppercase text-white font-bold font-custom text-2xl">
        {name}
      </div>
    </Link>
  );
}
