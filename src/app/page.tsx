"use client";
import {
  Button,
  Collapse,
  Drawer,
  Menu,
  MenuHandler,
  MenuList,
  Spinner,
} from "@material-tailwind/react";
// import Autoplay from "embla-carousel-autoplay";
import "@mantine/carousel/styles.css";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "../components/swiper/swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import InfoDialog from "@/src/components/landing/dialog/info";
import TermsDialog from "@/src/components/landing/dialog/terms";
import PolicyDialog from "@/src/components/landing/dialog/policy";
import { usePathname } from "next/navigation";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { Bars3Icon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Page() {
  // const autoplay = useRef(Autoplay({ delay: 5000 }));
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const pathname = usePathname();
  const [currentSlide, setCurrentSlide] = useState(2);
  const [open, setOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const swiperRef = useRef<any>();
  const [index, setIndex] = useState(0);
  const year = new Date().getFullYear();
  const [isLoading, setIsLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const [openCollapse, setOpenCollapse] = useState(false);

  const handleCollapse = () => {
    setOpenCollapse(!openCollapse);
  };

  const openDrawer = () => setOpenMenu(true);
  const closeDrawer = () => setOpenMenu(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleTermsOpen = () => {
    setTermsOpen(!termsOpen);
  };

  const handlePolicyOpen = () => {
    setPolicyOpen(!policyOpen);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5);
  }, []);

  const tools = [
    {
      title: "Data Market",
      description:
        "Analice datos y estadísticas de comercio internacional e inversión extranjera directa con Data Market. Conozca las tendencias en compras internacionales y las oportunidades para su negocio mediante la inteligencia de mercado.",
      image: "/svg/datamarket/datamarket.svg",
      imageWhite: "/svg/datamarket/datamarket-white.svg",
      link: "/dashboard/datamarket/242fe1e0-327e-405e-8611-f60f96c67e57",
      color: "from-purple-500  via-sky-400 to-green-300",
    },
    {
      title: "Acceso a Mercados",
      description:
        "Inicia tus exportaciones explorando la herramienta Acceso a Mercados. Consulta las medidas, requisitos y regulaciones establecidas por cada país para admitir la entrada y la comercialización de mercancías importadas desde República Dominicana.",
      image: "/svg/accesoamercado/accesoamercado.svg",
      imageWhite: "/svg/accesoamercado/accesoamercado-white.svg",
      link: "/dashboard/accesoamercado",
      color: "from-purple-500  via-sky-400 to-green-300",
    },
    {
      title: "Alertas Comerciales",
      description:
        "Las Alertas Comerciales de ProInteligencia brindan a los exportadores información actualizada sobre oportunidades emergentes y desafíos en el comercio internacional. Impulsa tus exportaciones de manera más inteligente al mantenerte al tanto de las tendencias recientes en el mercado global.",
      image: "/svg/alertacomercial/alertacomercial.svg",
      imageWhite: "/svg/alertacomercial/alertacomercial-white.svg",
      link: "/dashboard/alertacomercial",
      color: "from-purple-500  via-sky-400 to-green-300",
    },
    {
      title: "Alertas de IED",
      description:
        "Las Alertas de Inversión Extranjera Directa (IED) de ProInteligencia proporcionan información estratégica sobre las últimas novedades en IED, incluyendo oportunidades y tendencias tanto a nivel nacional como internacional. Facilitamos la gestión, promoción y atracción de la IED en República Dominicana.",
      image: "/svg/alertaIED/alertaIED.svg",
      imageWhite: "/svg/alertaIED/alertaIED-white.svg",
      link: "/dashboard/alertaIED",
      color: "from-purple-500  via-sky-400 to-green-300",
    },
    {
      title: "Publicaciones",
      description:
        "Consulta documentos relacionados con inversión y exportación y utiliza nuestros filtros para encontrar exactamente lo que necesitas.",
      image: "/svg/post/posts.svg",
      imageWhite: "/svg/post/posts-white.svg",
      link: "/dashboard/posts",
      color: "from-purple-500  via-sky-400 to-green-300",
    },
    {
      title: "Data Market",
      description:
        "Analice datos y estadísticas de comercio internacional e inversión extranjera directa con Data Market. Conozca las tendencias en compras internacionales y las oportunidades para su negocio mediante la inteligencia de mercado.",
      image: "/svg/datamarket/datamarket.svg",
      imageWhite: "/svg/datamarket/datamarket-white.svg",
      link: "/dashboard/datamarket/242fe1e0-327e-405e-8611-f60f96c67e57",
      color: "from-purple-500  via-sky-400 to-green-300",
    },
    {
      title: "Acceso a Mercados",
      description:
        "Inicia tus exportaciones explorando la herramienta Acceso a Mercados. Consulta las medidas, requisitos y regulaciones establecidas por cada país para admitir la entrada y la comercialización de mercancías importadas desde República Dominicana.",
      image: "/svg/accesoamercado/accesoamercado.svg",
      imageWhite: "/svg/accesoamercado/accesoamercado-white.svg",
      link: "/dashboard/accesoamercado",
      color: "from-purple-500  via-sky-400 to-green-300",
    },
    {
      title: "Alertas Comerciales",
      description:
        "Las Alertas Comerciales de ProInteligencia brindan a los exportadores información actualizada sobre oportunidades emergentes y desafíos en el comercio internacional. Impulsa tus exportaciones de manera más inteligente al mantenerte al tanto de las tendencias recientes en el mercado global.",
      image: "/svg/alertacomercial/alertacomercial.svg",
      imageWhite: "/svg/alertacomercial/alertacomercial-white.svg",
      link: "/dashboard/alertacomercial",
      color: "from-purple-500  via-sky-400 to-green-300",
    },
    {
      title: "Alertas de IED",
      description:
        "Las Alertas de Inversión Extranjera Directa (IED) de ProInteligencia proporcionan información estratégica sobre las últimas novedades en IED, incluyendo oportunidades y tendencias tanto a nivel nacional como internacional. Facilitamos la gestión, promoción y atracción de la IED en República Dominicana.",
      image: "/svg/alertaIED/alertaIED.svg",
      imageWhite: "/svg/alertaIED/alertaIED-white.svg",
      link: "/dashboard/alertaIED",
      color: "from-purple-500  via-sky-400 to-green-300",
    },
    {
      title: "Publicaciones",
      description:
        "Consulta documentos relacionados con inversión y exportación y utiliza nuestros filtros para encontrar exactamente lo que necesitas.",
      image: "/svg/post/posts.svg",
      imageWhite: "/svg/post/posts-white.svg",
      link: "/dashboard/posts",
      color: "from-purple-500  via-sky-400 to-green-300",
    },
  ];

  return (
    <div className="relative w-full min-h-screen font-montserrat">
      <video
        playsInline
        autoPlay
        loop
        muted
        className="object-cover w-full h-full"
        src="/videos/digitalworld.mp4"
      ></video>
      <div className="absolute inset-0 border-0 bg-gradient-to-r from-[#000072]/60 to-[#07ef96]/60"></div>
      <div className="absolute p-5 inset-0 flex flex-col border-0 bg-gradient-to-t from-black/40 from-[1%] to-transparent">
        <div className="flex items-center justify-between w-full py-2 lg:hidden">
          <Image
            src="/favicon.svg"
            width={240}
            height={240}
            alt="prointeligencia"
            className="size-16"
          />

          <div className="w-2/12">
            <button onClick={openDrawer}>
              <Bars3Icon className="w-8 h-8 text-white" />
            </button>
            <Drawer open={openMenu} onClose={closeDrawer} className="">
              <div className="flex flex-col gap-8 ">
                <div className="h-[8rem] flex justify-center items-center w-full bg-blue-950">
                  <Image
                    src="/ProInteligencia.svg"
                    width={240}
                    height={240}
                    alt="prointeligencia"
                    className="w-56"
                  />
                </div>
                <div className="flex flex-col gap-3 px-4">
                  {tools.slice(5).map((tool, index) => (
                    <Link
                      key={index}
                      className="flex flex-row items-center gap-1 px-5 py-3 text-black rounded-lg outline-none hover:bg-transparent hover:text-mint bg-gray-50"
                      href={tool.link}
                    >
                      {tool.title}
                    </Link>
                  ))}
                  <Link
                    className="flex flex-row items-center gap-1 px-5 py-3 text-black rounded-lg outline-none hover:bg-transparent hover:text-mint bg-gray-50"
                    href={"/dashboard/partners"}
                  >
                    Recursos
                  </Link>
                  <a
                    href={`/api/auth/login?returnTo=${baseUrl}/dashboard`}
                    className="px-5 py-2 text-center text-green-400 bg-transparent border-2 border-green-400 rounded-full shadow-greenn hover:shadow-greenHover hover:bg-green-400"
                  >
                    Regístrate
                  </a>
                  <a
                    href={`/api/auth/login?returnTo=${baseUrl}/dashboard`}
                    className="px-5 py-2 text-center bg-green-400 border-2 border-green-400 rounded-full shadow-greenn hover:shadow-greenHover hover:bg-green-400"
                  >
                    Accede
                  </a>
                </div>
              </div>
            </Drawer>
          </div>
        </div>
        <div className="items-center justify-center hidden w-full lg:flex">
          <div className="flex items-center justify-between w-10/12 p-5 bg-transparent md:p-10">
            <Image
              src="/ProInteligencia.svg"
              width={240}
              height={240}
              alt="prointeligencia"
              className="w-64"
            />
            <div className="items-center justify-center hidden gap-5 text-white xl:flex">
              <Menu allowHover>
                <MenuHandler>
                  <div className="cursor-pointer">Herramientas</div>
                </MenuHandler>
                <MenuList className="flex flex-col gap-4 p-4 text-black bg-white">
                  {tools.slice(5).map((tool, index) => (
                    <Link
                      key={index}
                      className="outline-none hover:bg-transparent hover:text-mint"
                      href={tool.link}
                    >
                      {tool.title}
                    </Link>
                  ))}
                </MenuList>
              </Menu>
              <Link href="/dashboard/partners">Recursos</Link>
              <a
                href={`/api/auth/login?returnTo=${baseUrl}/dashboard`}
                className="px-5 py-2 bg-transparent border-2 border-green-400 rounded-full shadow-greenn hover:shadow-greenHover hover:bg-green-400"
              >
                Regístrate
              </a>
              <a
                href={`/api/auth/login?returnTo=${baseUrl}/dashboard`}
                className="px-5 py-2 bg-green-400 border-2 border-green-400 rounded-full shadow-greenn hover:shadow-greenHover hover:bg-green-400"
              >
                Accede
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center h-full gap-2 text-center text-white lg:gap-7">
          <h1 className="w-full text-base lg:text-lg xl:text-4xl font-custom">
            Impulsando las exportaciones,
            <div>promoviendo la inversión extranjera directa</div>
          </h1>
          <p className="w-11/12 text-xs lg:text-sm xl:w-6/12 xl:text-lg">
            Bienvenido a ProInteligencia, una plataforma integral de
            herramientas especializadas en comercio internacional e inversión
            extranjera directa (IED).
          </p>
          <p className="w-11/12 text-xs lg:text-sm xl:w-6/12 xl:text-lg">
            Explora todas nuestras herramientas
          </p>
          <div className="flex items-center justify-center w-full">
            <div className="w-8/12">
              {!isLoading && (
                <Swiper
                  ref={swiperRef}
                  modules={[Autoplay]}
                  loop={true}
                  initialSlide={0}
                  centeredSlides={true}
                  // pagination={{
                  //   clickable: true,
                  //   dynamicBullets: true,
                  // }}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 20 },
                    1280: { slidesPerView: 3, spaceBetween: 20 },
                    1920: { slidesPerView: 5, spaceBetween: 20 },
                  }}
                  on={{
                    slideChange: (slide: any) => {
                      setCurrentSlide(slide.realIndex);
                    },
                  }}
                >
                  {tools.map((tool, index) => (
                    <SwiperSlide key={index}>
                      <button
                        className=""
                        onClick={() => {
                          setIndex(index);
                          handleOpen();
                        }}
                      >
                        <div
                          className={`${
                            currentSlide === index ? "" : ""
                          } flex flex-col items-center self-center justify-center py5 lg:min-h-[12rem] gap-3`}
                        >
                          <Image
                            src={tool.image}
                            width={240}
                            height={240}
                            alt="alertacomercial"
                            className={` ${
                              currentSlide === index
                                ? "w-16 lg:w-24 duration-500 transition shadow-toolWhite"
                                : "w-12 lg:w-20 duration-500 transition"
                            } bg-white rounded-xl shadow-xl`}
                          />
                          <h1
                            className={`${
                              currentSlide === index ? "block" : "hidden"
                            } w-full text-base lg:text-lg text-white font-custom`}
                          >
                            {tool.title}
                          </h1>
                        </div>
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
          <Link
            href={tools[currentSlide].link}
            className="flex items-center justify-center w-64 py-2 bg-transparent border-2 border-green-400 rounded-full shadow-buttonGreen"
          >
            Accede ahora
          </Link>
        </div>
        <div className="py-2 text-xs text-center text-white md:text-sm text-balance md:px-0 lg:py-5">
          ProInteligencia © {year}. Todos los derechos reservados •{" "}
          <button
            onClick={handleTermsOpen}
            className="underline duration-300 hover:text-green-400"
          >
            Términos y condiciones
          </button>{" "}
          •{" "}
          <button
            onClick={handlePolicyOpen}
            className="underline duration-300 hover:text-green-400"
          >
            Política de privacidad
          </button>
        </div>
      </div>
      {open && (
        <InfoDialog
          open={open}
          handleOpen={handleOpen}
          title={tools[index].title}
          description={tools[index].description}
          link={tools[index].link}
          image={tools[index].imageWhite}
          color={tools[index].color}
        />
      )}
      {termsOpen && (
        <TermsDialog open={termsOpen} handleOpen={handleTermsOpen} />
      )}
      {policyOpen && (
        <PolicyDialog open={policyOpen} handleOpen={handlePolicyOpen} />
      )}
    </div>
  );
}
