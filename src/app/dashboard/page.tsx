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
      name: "Alertas de IED",
      video: "/videos/charts.mp4#t=1",
      link: "/dashboard/alertaIED",
    },
  ];
  return (
    <div className="flex justify-center py-10">
      <div className="grid w-10/12 grid-cols-1 gap-4 lg:grid-cols-2">
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
      className="relative overflow-hidden rounded-xl group"
    >
      <video
        ref={videoRef}
        className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-125
         [&::-webkit-media-controls]:!hidden
             [&::-webkit-media-controls-enclosure]:!hidden
             [&::-webkit-media-controls-panel]:!hidden
             [&::-webkit-media-controls-play-button]:!hidden
             [&::-webkit-media-controls-start-playback-button]:!hidden
        "
        muted
        loop
      >
        <source src={video} type="video/mp4" className="absolute inset-0" />
      </video>
      <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white uppercase bg-black/40 font-custom">
        {name}
      </div>
    </Link>
  );
}
