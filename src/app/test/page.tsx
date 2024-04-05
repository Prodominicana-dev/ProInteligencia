"use client";
import React from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Card from "@/src/components/landing/alertacomercial/card";
import { Carousel as Carrusel } from "@material-tailwind/react";
import Slide from "@/src/components/landing/alertaIED/slide";
import { MantineProvider } from "@mantine/core";
import Partners from "@/src/components/landing/partner/section";
import { Montserrat } from "@next/font/google";

const monserratStyle = Montserrat({ subsets: ["latin"] });

export default function page() {
  const movement = (id: string) => {
    const element = document.getElementById(id);
    element!.scrollIntoView({ behavior: "smooth" });
  };
  // Año actual
  const date = new Date();
  const year = date.getFullYear();

  return (
    <MantineProvider>
      <div className={`w-full`} style={monserratStyle.style}>
        <section
          id="prointeligencia-front"
          className="w-full justify-center items-center lg:h-screen  bg-gradient-to-b from-light-blue from-[40%] to-dark-blue flex flex-col sm:pl-5 sm:pt-5 sm:pr-5 pl-3 pt-3 pr-3 space-y-6 sm:space-y-12"
        >
          <div className="flex items-center justify-center w-full lg:h-1/6">
            <Image
              src={"/prointeligencia.svg"}
              alt="logo"
              className="h-16 w-44"
              width={600}
              height={600}
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full space-y-5 lg:h-3/6">
            <h1 className="w-full text-3xl font-black text-center text-white lg:w-10/12 sm:w-8/12 lg:text-5xl ">
              Impulsando las exportaciones,
              <div>promoviendo la inversion extranjera directa</div>
            </h1>
            <p className="w-full font-normal text-center text-white lg:w-10/12 sm:w-8/12">
              Explora todas nuestras herramientas justo aqui
            </p>
            <button
              onClick={() => movement("prointeligencia")}
              className="h-12 text-white border-2 border-white rounded-md w-44"
            >
              Empezar
            </button>
          </div>
          <div className="w-full lg:h-full bg-gradient-to-tr from-[#764BD6] via-[#378EF3] to-[#37D584] rounded-t-xl sm:w-10/12 pt-2 px-2">
            <div className="relative w-full h-full rounded-t-lg">
              <div className="absolute inset-0 z-0">
                <video
                  autoPlay
                  loop
                  muted
                  className="object-cover w-full h-full"
                  src="/videos/charts.mp4"
                ></video>
              </div>
              <div className="absolute inset-0 border-0 bg-navy/50"></div>
            </div>
          </div>
        </section>

        <section
          id="prointeligencia"
          className="flex flex-col-reverse w-full h-full py-10 bg-white sm:h-screen xl:pl-32 sm:flex-row"
        >
          <div className="flex flex-col items-center justify-center w-full h-full pt-5 sm:pt-0 sm:items-start sm:w-6/12">
            <div className="w-10/12">
              <div>
                <p className="font-semibold text-purpurita">
                  Sistema de Inteligencia de Mercados
                </p>
                <h1 className="text-4xl font-bold text-black lg:text-5xl">
                  ProInteligencia
                </h1>
              </div>
              <p className="w-full py-4 font-normal text-gray-400">
                Una plataforma integral que reúne subsistemas especializados en
                comercio internacional e inversión extranjera directa (IED), con
                el objetivo de impulsar las exportaciones y la atracción de IED
                en República Dominicana.
              </p>
              <button
                onClick={() => movement("datamarket")}
                className="h-12 text-sm font-semibold border-2 rounded-full w-44 border-purpurita text-purpurita"
              >
                Descubre más
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center w-full h-full sm:w-6/12">
            <Image
              src={"/images/landing/graphics.png"}
              alt="imagen"
              width={2725}
              height={4096}
              className="object-cover object-center w-11/12 sm:w-8/12 rounded-[2rem] md:h-3/6 lg:h-4/6 xl:h-5/6"
            />
          </div>
        </section>

        <section
          id="datamarket"
          className="flex flex-col lg:flex-row w-full lg:h-screen h-[70rem] bg-white lg:space-x-40"
        >
          <div className="flex items-center justify-center w-11/12 h-full sm:w-10/12 lg:w-6/12">
            <div className="flex flex-col w-full h-full space-y-5 lg:h-5/6 lg:space-y-10">
              <div className="flex flex-row space-x-5 lg:space-x-10 h-3/6">
                <div className="w-2/6 bg-blue-700 rounded-r-2xl"></div>
                <div className="self-end w-4/6 bg-blue-700 rounded-2xl h-4/6"></div>
              </div>
              <div className="flex flex-row space-x-5 h-3/6 lg:space-x-10">
                <div className="flex flex-col w-full h-full space-y-5 lg:space-y-10">
                  <div className="w-full bg-blue-700 rounded-r-2xl h-2/6"></div>
                  <div className="w-full bg-blue-700 rounded-r-2xl h-4/6"></div>
                </div>
                <div className="w-full bg-blue-700 rounded-2xl h-4/6"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full lg:items-start lg:w-6/12 ">
            <div className="w-9/12">
              <div>
                <p className="font-semibold text-blue-700">Análisis de datos</p>
                <h1 className="text-5xl font-bold text-black">Data Market</h1>
              </div>
              <p className="w-full py-4 font-normal text-gray-400">
                Analice datos y estadísticas de comercio internacional e
                inversión extranjera directa con Data Market. Conozca las
                tendencias en compras internacionales y las oportunidades para
                su negocio mediante la inteligencia de mercado.
              </p>
              <Link
                href={"/dashboard/datamarket/1"}
                className="flex items-center justify-center h-12 text-sm font-semibold text-blue-700 duration-300 border-2 border-blue-700 rounded-full w-44 hover:shadow-lg"
              >
                <p>Descubre más</p>
              </Link>
            </div>
          </div>
        </section>

        <section
          id="alertacomercial"
          className="flex flex-col-reverse items-center justify-center w-full py-10 bg-white lg:h-screen xl:pl-32 sm:flex-row"
        >
          <div className="flex flex-col items-center justify-center w-full h-full pt-8 sm:pt-0 sm:pl-8 lg:pl-0 sm:items-start lg:w-6/12 ">
            <div className="w-10/12 sm:w-full lg:w-10/12">
              <div>
                <p className="font-semibold ">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-celeste to-morado">
                    Herramienta
                  </span>
                </p>
                <h1 className="text-4xl font-bold text-black lg:text-5xl">
                  Alertas Comerciales
                </h1>
              </div>
              <p className="w-full py-4 font-normal text-gray-400">
                Brindan a los exportadores información actualizada sobre
                oportunidades emergentes y desafíos en el comercio
                internacional. Impulsa tus exportaciones de manera más
                inteligente al mantenerte al tanto de las tendencias recientes
                en el mercado global.
              </p>

              <div className="flex items-center justify-center h-12 p-[2px] duration-300 rounded-full w-44 hover:shadow-lg bg-gradient-to-r from-celeste to-morado">
                <Link
                  href={"/dashboard/alertacomercial"}
                  className="flex items-center justify-center w-full h-full text-sm font-semibold duration-300 bg-white rounded-full"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-celeste to-morado">
                    Descubre más
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center w-full h-full lg:space-x-10 lg:w-6/12">
            <div className="flex flex-col items-end justify-center w-full pt-10 space-y-10 lg:w-3/6 h-5/6 lg:h-full">
              <Card icon="Refresh" title="Actualizaciones" />
              <Card icon="Error" title="Amenazas" />
            </div>
            <div className="flex flex-col items-center justify-start w-full pb-10 space-y-10 lg:w-3/6 lg:items-start h-5/6">
              <Card icon="Increase" title="Oportunidades" />
              <Card icon="Roadblock" title="Obstáculos" />
            </div>
          </div>
        </section>

        <section
          id="alertaIED"
          className="flex flex-col w-full py-10 space-y-5 bg-white sm:space-y-0 lg:h-screen sm:flex-row"
        >
          <div className="flex items-center justify-center w-full h-full p-8 sm:w-6/12">
            <Carrusel
              autoplay={true}
              loop={true}
              autoplayDelay={5000}
              className="w-full h-72 lg:w-10/12 bg-gradient-to-tr from-alertaIED-purple to-alertaIED-pink rounded-xl lg:h-5/6"
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute z-50 flex gap-2 bottom-4 left-2/4 -translate-x-2/4">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                        activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                      }`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              )}
            >
              <Slide icon={"Increase"} title="Oportunidades" />
              <Slide icon={"Increase"} title="Tendencias" />
              <Slide icon={"Increase"} title="Normativas" />
              <Slide icon={"Error"} title="Amenazas" />
            </Carrusel>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full sm:w-6/12">
            <div className="w-10/12 sm:w-9/12">
              <div>
                <p className="font-semibold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-alertaIED-purple to-alertaIED-pink">
                    Herramienta
                  </span>
                </p>
                <h1 className="text-4xl font-bold text-black lg:text-5xl">
                  Alertas de IED
                </h1>
              </div>
              <p className="w-full py-4 font-normal text-gray-400">
                Las Alertas de Inversión Extranjera Directa (IED) del
                ProInteligencia proporcionan información estratégica sobre las
                últimas novedades en IED, incluyendo oportunidades y tendencias
                tanto a nivel nacional como internacional. Facilitamos la
                gestión, promoción y atracción de la IED en República
                Dominicana.
              </p>
              <div className="flex items-center justify-center h-12 p-[2px] duration-300 rounded-full w-44 hover:shadow-lg bg-gradient-to-r from-alertaIED-purple to-alertaIED-pink">
                <Link
                  href={"/dashboard/alertaIED"}
                  className="flex items-center justify-center w-full h-full text-sm font-semibold duration-300 bg-white rounded-full"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-alertaIED-purple to-alertaIED-pink">
                    Descubre más
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="accesoamercado"
          className="flex items-center justify-center w-full py-10 bg-white lg:h-screen"
        >
          <div className="flex flex-row w-11/12 h-[80vh] md:h-3/6 lg:w-10/12 p-8 lg:p-16 lg:h-4/6 rounded-2xl bg-gradient-to-r from-dark-blue from-[20%] to-light-blue">
            <div className="flex flex-col justify-center w-full space-y-3 xl:w-8/12">
              <div>
                <p className="font-semibold text-white">Plataforma</p>
                <h1 className="text-3xl font-bold text-white lg:text-5xl">
                  Requisitos de Acceso a Mercados Internacionales
                </h1>
              </div>
              <p className="w-full font-normal text-gray-400 ">
                Inicia tus exportaciones explorando la herramienta Requisitos de
                Acceso a Mercados Internacionales (Acceso a Mercado). Consulta
                las medidas, requisitos y regulaciones establecidas por cada
                país para admitir la entrada y la comercialización de mercancías
                importadas desde República Dominicana.
              </p>
              <Link
                href={"/dashboard/accesoamercado"}
                className="flex flex-row items-center w-2/12 h-12 space-x-3 text-sm font-semibold text-white duration-300 lg:text-base hover:text-lg justify-left group"
              >
                <p>Empieza</p>
                <ArrowRightIcon className="w-5 h-5 duration-300 group-hover:w-6 group-hover:h-6" />
              </Link>
            </div>
          </div>
          <div className="absolute hidden h-full xl:block right-20">
            <Image
              src={"/images/landing/mockupAccesoaMercado.png"}
              alt="accesoamercado"
              width={1450}
              height={2936}
              className="object-cover object-center w-full h-full p-32 text-end"
            />
          </div>
        </section>

        <section
          id="post"
          className="flex flex-col-reverse items-center justify-center w-full py-10 bg-white lg:h-screen sm:flex-row xl:pl-32 "
        >
          <div className="flex flex-col items-center justify-center w-full h-full pt-8 lg:w-6/12 sm:pt-0">
            <div className="w-10/12">
              <div>
                <p className="font-semibold ">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-celeste to-morado">
                    Recursos
                  </span>
                </p>
                <h1 className="text-4xl font-bold text-black lg:text-5xl">
                  Publicaciones
                </h1>
              </div>
              <p className="w-full py-4 font-normal text-gray-400">
                Descarga documentos relacionados con inversión y exportación y
                utiliza nuestros filtros para encontrar exactamente lo que
                necesitas.
              </p>

              <div className="flex items-center justify-center h-12 p-[2px] duration-300 rounded-full w-44 hover:shadow-lg bg-gradient-to-r from-celeste to-morado">
                <Link
                  href={"/dashboard/post"}
                  className="flex items-center justify-center w-full h-full text-sm font-semibold duration-300 bg-white rounded-full"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-celeste to-morado">
                    Descubre más
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full h-full xl:justify-end lg:w-6/12">
            <Image
              src={"/svg/landing/post/publicaciones.svg"}
              width={600}
              height={600}
              alt="publicaciones"
              className=" object-cover object-center w-10/12 sm:w-10/12 h-[40vh] lg:h-[55vh] xl:h-full rounded-full  xl:rounded-r-none xl:rounded-l-[1300px]"
            />
          </div>
        </section>

        <Partners />

        <section
          id="footer"
          className="w-full lg:h-[50vh] bg-gradient-to-r from-dark-blue from-[20%] to-light-blue flex flex-col space-y-8 justify-center items-center p-8"
        >
          <div className="flex flex-col w-11/12 space-y-8 sm:space-y-0 sm:flex-row lg:h-5/6">
            <div className="flex items-center w-full sm:w-6/12 lg:h-full">
              <Image
                src={"/prointeligencia.svg"}
                alt="prointeligencia"
                width={218}
                height={87}
                className="h-24 w-80"
              />
            </div>
            <div className="flex flex-col w-full space-y-8 sm:space-y-0 sm:space-x-8 lg:space-x-16 sm:items-center sm:w-6/12 lg:h-full sm:flex-row">
              <div className="flex flex-col space-y-3 text-base text-white sm:h-52">
                <h1 className="font-bold">Herramientas</h1>
                <Link href={"/dashboard/datamarket/1"}>Data Market</Link>
                <Link href={"/dashboard/alertacomercial"}>
                  Alertas Comerciales
                </Link>
                <Link href={"/dashboard/alertaIED"}>Alertas de IED</Link>
                <Link href={"/dashboard/accesoamercado"}>Acceso a Mercado</Link>
              </div>
              <div className="flex flex-col space-y-3 text-base text-white sm:h-52">
                <h1 className="font-bold">Recursos</h1>
                <Link href={"/dashboard/posts"}>Publicaciones</Link>
                <Link href={"/dashboard/partners"}>Fuentes externas</Link>
                <Link href={"/"}>Manual de usuario</Link>
              </div>
              <div className="flex flex-col space-y-3 text-base text-white sm:h-52">
                <h1 className="font-bold">Legal</h1>
                <Link href={"/"}>Términos y condiciones</Link>
                <Link href={"/"}>Políticas de privacidad</Link>
              </div>
            </div>
          </div>
          <div className="w-11/12 lg:h-1/6 border-t-[1px] border-gray-300 py-4 flex flex-col-reverse sm:flex-row">
            <div className="flex items-center w-full h-full pt-4 text-xs text-center text-white sm:text-base sm:text-left sm:w-8/12 sm:pt-0">
              ProInteligencia © {year} ProDominicana. Todos los derechos
              reservados.
            </div>
            <div className="flex justify-center w-full h-full space-x-4 text-white sm:justify-end sm:w-4/12">
              <Link href={"https://www.instagram.com/prodominicana/"}>
                <Image
                  src={"/svg/landing/social/instagram.svg"}
                  width={30}
                  height={30}
                  alt="instagram"
                  className="w-8 h-8 "
                />
              </Link>
              <Link href={"https://twitter.com/prodominicana"}>
                <Image
                  src={"/svg/landing/social/twitter.svg"}
                  width={30}
                  height={30}
                  alt="instagram"
                  className="w-8 h-8 "
                />
              </Link>
              <Link href={"https://www.linkedin.com/company/ceird/"}>
                <Image
                  src={"/svg/landing/social/linkedin.svg"}
                  width={30}
                  height={30}
                  alt="instagram"
                  className="w-8 h-8"
                />
              </Link>
              <Link href={"https://www.youtube.com/c/ProDominicana"}>
                <Image
                  src={"/svg/landing/social/youtube.svg"}
                  width={30}
                  height={30}
                  alt="instagram"
                  className="w-8 h-8 "
                />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MantineProvider>
  );
}
