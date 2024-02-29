"use client";
import React from "react";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import Autoplay from "embla-carousel-autoplay";
import Slider from "@/src/components/landing/partner/slider";

export default function Partners() {
  const autoplay = React.useRef(Autoplay({ delay: 3000 }));
  const partners = [
    "/svg/landing/partners/atlas.svg",
    "/svg/landing/partners/bancocentral.svg",
    "/svg/landing/partners/cepal.svg",
    "/svg/landing/partners/dga.svg",
    "/svg/landing/partners/eurostat.svg",
    "/svg/landing/partners/fiatpanis.svg",
    "/svg/landing/partners/internationalmonetaryfund.svg",
    "/svg/landing/partners/jad.svg",
    "/svg/landing/partners/omc.svg",
    "/svg/landing/partners/one.svg",
    "/svg/landing/partners/trademap.svg",
    "/svg/landing/partners/uncomtrade.svg",
    "/svg/landing/partners/unctad.svg",
    "/svg/landing/partners/usacensus.svg",
    "/svg/landing/partners/zonasfrancas.svg",
  ];
  return (
    <section
      id="partner"
      className="flex flex-col w-full space-y-8 h-[55vh] md:h-[60vh] lg:h-[70vh] bg-white  items-center pt-10"
    >
      <div className="flex flex-col w-10/12">
        <p className="font-semibold ">
          <span className="text-black">Recursos</span>
        </p>
        <h1 className="text-2xl font-bold text-black lg:text-3xl">
          Fuentes externas
        </h1>
      </div>
      <div className="flex items-center justify-center w-full ">
        <Carousel
          slideSize={{
            base: "100%",
            sm: "50%",
            md: "33.333333%",
            lg: "20%",
          }}
          slideGap={{ base: 0, sm: "md" }}
          loop
          align="start"
          height={400}
          plugins={[autoplay.current]}
          // onMouseEnter={autoplay.current.stop}
          // onMouseLeave={autoplay.current.reset}
          className="w-10/12 border-2 rounded-xl h-[30vh]  sm:h-[40vh] border-blue-gray-600/40 flex items-center justify-center "
        >
          {partners.map((partner, key) => {
            return <Slider key={key} logo={partner} />;
          })}
        </Carousel>
      </div>
    </section>
  );
}
