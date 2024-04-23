import {
  XMarkIcon,
  ChevronDownIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import {
  Typography,
  IconButton,
  Drawer,
  Avatar,
  Accordion,
  AccordionHeader,
  AccordionBody,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import Suscribe from "../alertacomercial/Suscribe/suscribe";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import DataMarketIcon from "../svg/datamarket";
import { useDataMarketsCategories } from "@/src/services/datamarket/service";
import DataMarketMenu from "./mobileDatamarketMenu";
import AccesoaMercadoIcon from "../svg/accesoamercado";
import AlertaComercialIcon from "../svg/alertacomercial";
import AlertaIEDIcon from "../svg/alertaIED";
import AlertaIEDSubscribe from "../alertaIED/Suscribe/suscribe";
import Login from "../validate/login";
import { useAtom } from "jotai";
import { tokenAtom } from "@/src/state/states";
import axios from "axios";
import { hasAnyPermission } from "./navbar";
import React from "react";
import DashboardIcon from "../svg/dashboardIcon";

export default function MobileMenu({ isOpen, onClose }: any) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const pathname = usePathname();
  const callbackUrl = `${baseUrl}${pathname}`;
  const navigationOptions = [
    {
      href: "/dashboard/accesoamercado",
      icon: <AccesoaMercadoIcon color="navy" />,
      text: "Acceso a Mercado",
    },
    {
      href: "/dashboard/alertacomercial",
      icon: <AlertaComercialIcon color="navy" />,
      text: "Alertas Comerciales",
    },
    {
      href: "/dashboard/alertaIED",
      icon: <AlertaIEDIcon color="navy" />,
      text: "Alertas de IED",
    },
    {
      href: "/dashboard/partners",
      icon: <AlertaIEDIcon color="navy" />,
      text: "Fuentes externas",
    },
  ];

  const navigationConfigOptions = [
    {
      href: "/dashboard/settings/datamarket",
      icon: <DataMarketIcon color="navy" />,
      text: "Datamarket",
    },
    {
      href: "/dashboard/settings/accesoamercado",
      icon: <AccesoaMercadoIcon color="navy" />,
      text: "Acceso a Mercado",
    },
    {
      href: "/dashboard/settings/alertacomercial",
      icon: <AlertaComercialIcon color="navy" />,
      text: "Alertas Comerciales",
    },
    {
      href: "/dashboard/settings/alertaIED",
      icon: <AlertaIEDIcon color="navy" />,
      text: "Alertas de IED",
    },
    {
      href: "/dashboard/settings/products",
      icon: <AlertaIEDIcon color="navy" />,
      text: "Productos",
    },
    {
      href: "/dashboard/settings/partners",
      icon: <AlertaIEDIcon color="navy" />,
      text: "Fuentes externas",
    },
    {
      href: "/dashboard/settings/domains",
      icon: <AlertaIEDIcon color="navy" />,
      text: "Dominios reservados",
    },
  ];
  const { user } = useUser();
  const [suscribeAlertaIED, setSuscribeAlertaIED] = useState(false);
  const handleAlertaIEDSuscribeOpen = () => {
    if (!user) return <Login />;
    setSuscribeAlertaIED(!suscribeAlertaIED);
  };
  const [suscribeOpen, setSuscribeOpen] = useState(false);
  const { data, isLoading }: any = useDataMarketsCategories();
  const handleSuscribeOpen = () => {
    if (!user) return <Login />;
    setSuscribeOpen(!suscribeOpen);
  };

  const [open, setOpen] = useState(0);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

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
    let permis: any = [];
    let hasPermis = false;
    if (user && token) {
      const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${user.sub}/permissions`;
      const getPermissions = async () => {
        await axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            res.data.forEach((permission: any) => {
              permis.push(permission.permission_name);
            });
            hasPermis = hasAnyPermission(permis, permissionList);
          });
        setHasPermission(hasPermis);
        setDataLoaded(true);
      };
      getPermissions();
    }
  }, [user, token]);
  return (
    <Fragment>
      <Drawer
        open={isOpen}
        onClose={onClose}
        placement="right"
        className="z-[9999] flex flex-col overflow-y-auto"
      >
        <div className="flex flex-col items-center justify-between bg-[url('/images/mobile-menu/accountLog.jpg')]">
          <div className="flex flex-row items-center justify-between w-full px-4 pt-2">
            <Link href={"/"}>
              <Typography variant="h5" color="white">
                ProInteligencia
              </Typography>
            </Link>
            <IconButton variant="text" color="blue-gray" onClick={onClose}>
              <XMarkIcon className="w-6 h-6 text-white" />
            </IconButton>
          </div>
          <div className="w-full p-4 space-y-4">
            {user ? (
              <>
                <Avatar
                  variant="circular"
                  size="lg"
                  className=""
                  src={user.picture as string}
                />
                <Typography className="font-thin text-white">
                  {user.name}
                </Typography>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex flex-col h-full gap-4 p-2">
          <List className="flex flex-col justify-between h-full">
            <div>
              <Link href={"/dashboard"} onClick={onClose}>
                <ListItem className="focus:bg-transparent">
                  <ListItemPrefix>
                    <DashboardIcon color="navy" />
                  </ListItemPrefix>
                  <Typography className="mr-auto font-normal text-navy">
                    Dashboard
                  </Typography>
                </ListItem>
              </Link>
              <Accordion
                open={open === 1}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${
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
                      <DataMarketIcon color="navy" />
                    </ListItemPrefix>
                    <Typography className="mr-auto font-normal text-navy">
                      Datamarket
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List className="p-0 text-navy">
                    {!isLoading ? (
                      data?.map((datamarket: any, key: number) =>
                        datamarket.data.length > 1 ? (
                          <DataMarketMenu
                            title={datamarket.category}
                            data={datamarket.data}
                            onClose={onClose}
                            key={key}
                          />
                        ) : (
                          <Link
                            href={`/dashboard/datamarket/${datamarket.data[0].id}`}
                            key={key}
                            onClick={onClose}
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
              {navigationOptions.map((option: any, key: number) => (
                <Link href={option.href} onClick={onClose} key={key}>
                  <ListItem className="focus:bg-transparent">
                    <ListItemPrefix>{option.icon}</ListItemPrefix>
                    <Typography className="mr-auto font-normal text-navy">
                      {option.text}
                    </Typography>
                  </ListItem>
                </Link>
              ))}
              {hasPermission && dataLoaded ? (
                <Accordion
                  open={open === 2}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === 1 ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem className="p-0" selected={open === 2}>
                    <AccordionHeader
                      onClick={() => handleOpen(2)}
                      className="p-3 border-b-0"
                    >
                      <ListItemPrefix>
                        <CogIcon
                          className="w-8 h-8 text-navy"
                          strokeWidth={1}
                        />
                      </ListItemPrefix>
                      <Typography className="mr-auto font-normal text-navy">
                        Configuración
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    <List className="p-0 text-navy">
                      {navigationConfigOptions.map(
                        (option: any, key: number) => (
                          <Link href={option.href} key={key} onClick={onClose}>
                            <ListItem>
                              <ListItemPrefix>
                                <div></div>
                              </ListItemPrefix>
                              {option.text}
                            </ListItem>
                          </Link>
                        )
                      )}
                    </List>
                  </AccordionBody>
                </Accordion>
              ) : null}
            </div>
            <div className="p-2 space-y-4">
              {pathname === "/dashboard/alertacomercial" ? (
                <>
                  <button
                    onClick={() => {
                      handleSuscribeOpen();
                      onClose();
                    }}
                    className="flex items-center justify-center w-full h-12 p-4 bg-white border-2 text-navy rounded-xl border-navy"
                  >
                    Suscríbete
                  </button>
                </>
              ) : null}
              {pathname === "/dashboard/alertaIED" ? (
                <>
                  <button
                    onClick={() => {
                      handleAlertaIEDSuscribeOpen();
                      onClose();
                    }}
                    className="w-full flex justify-center items-center text-navy rounded-xl p-4 h-12 bg-white border-2 border-navy from-purple-500 from-[15%] via-sky-600 to-sky-400"
                  >
                    Suscríbete
                  </button>
                </>
              ) : null}
              <a
                href={
                  user
                    ? `/api/auth/logout?returnTo=${callbackUrl}`
                    : `/api/auth/login?returnTo=${callbackUrl}`
                }
                className="flex items-center justify-center w-full h-12 p-4 text-white rounded-xl bg-navy"
              >
                {user ? "Cerrar sesión" : "Iniciar sesión"}
              </a>
            </div>
          </List>
        </div>

        {suscribeOpen && user ? (
          <Suscribe
            open={suscribeOpen}
            handleOpen={handleSuscribeOpen}
            email={user.email ?? ""}
          />
        ) : null}
        {suscribeAlertaIED && user ? (
          <AlertaIEDSubscribe
            open={suscribeAlertaIED}
            handleOpen={handleAlertaIEDSuscribeOpen}
            email={user.email ?? ""}
          />
        ) : null}
      </Drawer>
    </Fragment>
  );
}
