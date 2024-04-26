"use client";
// @ts-ignore
import { useEffect, useRef, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
} from "@material-tailwind/react";
import { ChevronDownIcon, CogIcon } from "@heroicons/react/24/outline";
import { useHover } from "usehooks-ts";
import Image from "next/image";
import Link from "next/link";
import SidebarMenu from "./sidebarMenu";
import { useDataMarketsCategories } from "@/src/services/datamarket/service";
import { useRouter, usePathname } from "next/navigation";
import { useAtom } from "jotai";
import {
  datamarketCategoriesAtom,
  datamarketTitleAtom,
  tokenAtom,
} from "@/src/state/states";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import { hasAnyPermission } from "./navbar";
import React from "react";

export function Sidebar({ visible }: any) {
  const [, setDatamarketTitle] = useAtom(datamarketTitleAtom);
  const [open, setOpen] = useState(0);
  const { data, isLoading }: any = useDataMarketsCategories();
  const [categories, setCategories] = useAtom(datamarketCategoriesAtom);
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const [isConfig, setIsConfig] = useState(false);
  const path = usePathname();
  const { user } = useUser();
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [token] = useAtom(tokenAtom);
  const permissionList = [
    "create:accesoamercados",
    "create:alertacomercial",
    "create:alertaIED",
    "create:datamarket",
    "create:users",
    "update:accesoamercados",
    "update:alertacomercial",
    "update:alertaIED",
    "update:datamarket",
    "update:users",
    "delete:accesoamercados",
    "delete:alertacomercial",
    "delete:alertaIED",
    "delete:datamarket",
    "delete:users",
  ];

  useEffect(() => {
    setCategories(data);
  }, [data]);

  useEffect(() => {
    let permis: any = [];
    if (user && token) {
      const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${user.sub}/permissions`;
      const getPermissions = async () => {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        res.data.forEach((permission: any) => {
          permis.push(permission.permission_name);
        });
        setHasPermission(hasAnyPermission(permis, permissionList));
        setDataLoaded(true);
      };
      getPermissions();
    }
  }, [user, token]);

  // const lastPath = path.includes("datamarket")
  //   ? "/datamarket"
  //   : path.substring(path.lastIndexOf("/"));

  useEffect(() => {
    const hasConfigLocalStorage = localStorage.getItem("isConfig");
    if (hasConfigLocalStorage === null) {
      localStorage.setItem("isConfig", "false");
      setIsConfig(false);
    } else {
      const isConfig = hasConfigLocalStorage === "true";
      setIsConfig(isConfig);
    }
  }, []);

  const handleIsConfig = () => {
    const newIsConfig = !isConfig;
    localStorage.setItem("isConfig", newIsConfig.toString());
    setIsConfig(newIsConfig);
  };

  useEffect(() => {
    const url = path.split("/").pop();
    if (path.includes("settings") && url === "datamarket") {
      setDatamarketTitle("DataMarket");
    }
    if (
      path.includes("settings") &&
      !isConfig &&
      !(
        url === "datamarket" ||
        url === "products" ||
        url === "users" ||
        url === "settings" || url === "domains" || url === "countries"
      )
    ) {
      // dividir la url en un array por cada /
      // obtener el ultimo elemento del array
      return router.push(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/${url}`
      );
    }
    if (isConfig && !(url === "dashboard" || url === "settings")) {
      return Number(url) > 0
        ? path.includes("alertacomercial")
          ? router.push(
              `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/settings/alertacomercial`
            )
          : path.includes("accesoamercado")
          ? router.push(
              `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/settings/accesoamercado`
            )
          : router.push(
              `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/settings/datamarket`
            )
        : router.push(
            `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/settings/${url}`
          );
    }
    if (url === "settings" && isConfig) {
      return router.push(
        `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/settings/datamarket`
      );
    }
  }, [isConfig]);

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    if (!isHover) {
      setOpen(0);
    }
  }, [setOpen, isHover]);

  return (
    <div
      ref={hoverRef}
      className={`h-full flex flex-col justify-between hover:w-72 duration-700 group  ${
        visible ? "w-28 p-4" : "w-0 p-0"
      }
        ${isConfig ? "bg-[#051544]" : "bg-navy"}
      `}
    >
      <div className="h-full overflow-x-hidden overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-center w-full p-4 mb-2 text-white">
          <Link href={"/"}>
            <Image
              src={"/favicon.svg"}
              alt=""
              width={1920}
              height={1080}
              className={`group-hover:w-36 w-10 duration-700`}
            ></Image>
          </Link>
        </div>
        <List
          className={` ${
            visible ? "opacity-100 visible" : "opacity-0 invisible"
          } duration-200 h-4/6`}
        >
          <SidebarItem
            title={"Inicio"}
            url={"/dashboard"}
            iconUrl={"/svg/dashboardIcon.svg"}
          />
          {isConfig ? (
            <SidebarItem
              title={"DataMarket"}
              url={
                isConfig
                  ? "/dashboard/settings/datamarket"
                  : "/dashboard/datamarket"
              }
              iconUrl={"/svg/datamarket/datamarket-white.svg"}
            />
          ) : (
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform opacity-0 group-hover:opacity-100 hidden group-hover:flex text-white ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="p-3 border-b-0"
                >
                  <ListItemPrefix>
                    <Image
                      src={"/svg/datamarket/datamarket-white.svg"}
                      width={600}
                      height={600}
                      draggable={false}
                      alt=""
                      className="text-white duration-700 size-12 group-hover:h-7 group-hover:w-7"
                    />
                  </ListItemPrefix>
                  <Typography
                    color="white"
                    className="hidden mr-auto font-normal duration-300 opacity-0 group-hover:flex group-hover:opacity-100"
                  >
                    Data Market
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0 text-white">
                  {!isLoading ? (
                    categories?.map((datamarket: any, key: number) =>
                      datamarket.data.length > 1 ? (
                        <SidebarMenu
                          isHover={isHover}
                          title={datamarket.category}
                          data={datamarket.data}
                          key={key}
                        />
                      ) : (
                        <Link
                          href={`/dashboard/datamarket/${datamarket.data[0].id}`}
                          key={key}
                        >
                          <ListItem>
                            <ListItemPrefix>
                              <div></div>
                            </ListItemPrefix>
                            {datamarket.data[0].title}
                          </ListItem>
                        </Link>
                      )
                    )
                  ) : (
                    <ListItem>Loading...</ListItem>
                  )}
                </List>
              </AccordionBody>
            </Accordion>
          )}

          <SidebarItem
            title={"Acceso a Mercados"}
            url={
              isConfig
                ? "/dashboard/settings/accesoamercado"
                : "/dashboard/accesoamercado"
            }
            iconUrl={"/svg/accesoamercado/accesoamercado-white.svg"}
          />
          <SidebarItem
            title={"Alertas Comerciales"}
            url={
              isConfig
                ? "/dashboard/settings/alertacomercial"
                : "/dashboard/alertacomercial"
            }
            iconUrl={"/svg/alertacomercial/alertacomercial-white.svg"}
          />
          <SidebarItem
            title={"Alertas de IED"}
            url={
              isConfig
                ? "/dashboard/settings/alertaIED"
                : "/dashboard/alertaIED"
            }
            iconUrl={"/svg/alertaIED/alertaIED-white.svg"}
          />

          <SidebarItem
            title={"Publicaciones"}
            url={isConfig ? "/dashboard/settings/posts" : "/dashboard/posts"}
            iconUrl={"/svg/post/posts-white.svg"}
          />

          <SidebarItem
            title={"Fuentes externas"}
            url={
              isConfig ? "/dashboard/settings/partners" : "/dashboard/partners"
            }
            iconUrl={"/svg/partner/partner-white.svg"}
          />

          {isConfig ? (
            <>
              <SidebarItem
                title={"Productos"}
                url={"/dashboard/settings/products"}
                iconUrl={"/svg/product/icon.svg"}
              />
             
            </>
          ) : null}
          {isConfig ? (
            <>
              <SidebarItem
                title={"Dominios reservados"}
                url={"/dashboard/settings/domains"}
                iconUrl={"/svg/domains/icon.svg"}
              />
             
            </>
          ) : null}
          {isConfig ? (
            <>
              <SidebarItem
                title={"Países/Mercados"}
                url={"/dashboard/settings/countries"}
                iconUrl={"/svg/country/icon.svg"}
              />
             
            </>
          ) : null}
        </List>
      </div>

      {hasPermission && dataLoaded ? (
        <>
          <div
            className={`h-[12%] flex items-end p-4 self-center  z-0 ${
              visible ? "opacity-100 duration-1000" : "opacity-0 duration-200"
            }`}
          >
            <Button
              className={`flex justify-center items-center space-x-3 bg-white p-2 w-14 group-hover:h-full  rounded-full duration-700 text-navy group-hover:w-56  ${
                isConfig ? "bg-sky-500" : "bg-white"
              }`}
              onClick={() => {
                handleIsConfig();
              }}
            >
              <CogIcon
                className={`w-10 duration-300 ${
                  isConfig ? "text-white" : "text-navy"
                }`}
              />
              <div
                className={`group-hover:block hidden duration-700 ${
                  isConfig ? "text-white" : "text-navy"
                }`}
              >
                Configuración
              </div>
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

function SidebarItem({ title, url, iconUrl }: any) {
  return (
    <Link href={url}>
      <ListItem className="focus:bg-transparent">
        <ListItemPrefix>
          <Image
            src={iconUrl}
            width={600}
            height={600}
            draggable={false}
            alt=""
            className="text-white duration-700 size-12 group-hover:h-7 group-hover:w-7"
          />
        </ListItemPrefix>
        <Typography
          color="white"
          className="hidden mr-auto font-normal duration-300 opacity-0 group-hover:opacity-100 group-hover:flex"
        >
          {title}
        </Typography>
      </ListItem>
    </Link>
  );
}
