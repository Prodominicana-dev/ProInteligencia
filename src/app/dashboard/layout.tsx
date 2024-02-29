"use client";
import {
  datamarketAtom,
  alertacomercialAtom,
  alertaIEDAtom,
  tokenAtom,
} from "@/src/state/states";
import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notifications } from "@mantine/notifications";
import { Sidebar } from "@/src/components/dashboard/sidebar";
import { NavbarDashboard } from "@/src/components/dashboard/navbar";
import { useAtom } from "jotai";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/notifications/styles.css";
import { useDataMarkets } from "@/src/services/datamarket/service";
import MobileMenu from "@/src/components/dashboard/mobileMenu";
import { useUser } from "@auth0/nextjs-auth0/client";
import { setCookie } from "typescript-cookie";
import { generateToken, getDomains } from "@/src/services/auth/service";
import React from "react";
import { Provider } from "jotai";
import { MantineProvider } from "@mantine/core";

interface RootLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}
const queryClient = new QueryClient();

function RootLayoutComponent({ children, modal }: RootLayoutProps) {
  const { user, isLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, setDataMarket] = useAtom(datamarketAtom);
  const [, setAuth0Token] = useAtom(tokenAtom);
  const [, setCanSeeAlertaComerciales] = useAtom(alertacomercialAtom);
  const [, setCanSeeAlertasIED] = useAtom(alertaIEDAtom);
  const [openNav, setOpenNav] = useState(false);
  const { data: datamarket }: any = useDataMarkets();

  useEffect(() => {
    setDataMarket(datamarket);
  }, [datamarket, setDataMarket]);

  useEffect(() => {
    const sidebarOpen = localStorage.getItem("sidebarOpen");
    if (sidebarOpen === null) {
      localStorage.setItem("sidebarOpen", "true");
      setSidebarOpen(true);
    } else {
      setSidebarOpen(sidebarOpen === "true");
    }
  }, []);

  const toggleSidebar = () => {
    const newSidebarOpen = !sidebarOpen;
    localStorage.setItem("sidebarOpen", newSidebarOpen.toString());
    setSidebarOpen(newSidebarOpen);
  };

  useEffect(() => {
    if (!user && !isLoading) {
      setCanSeeAlertasIED(false);
      setCanSeeAlertaComerciales(false);
      localStorage.setItem("isConfig", "false");
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      const getToken = async () => {
        const token = await generateToken();
        setCookie("authToken", token, {
          expires: 1,
        });
        setAuth0Token(token);
      };
      const getDomainsP = async () => {
        let alertacomercialDomains: any[] = [];
        let alertaIEDDomains: any[] = [];
        const domains = await getDomains(
          `${process.env.NEXT_PUBLIC_API_URL}/reserved-domains`
        );
        console.log(domains);
        alertaIEDDomains = domains.data.alertaIED;
        alertacomercialDomains = domains.data.alertacomercial;
        // Comprobar si el correo del usuario esta en la lista de dominios, si esta en la de alertaIED colocar en localStorage que puede ver alertaIED y si esta tambien en la de alertacomercial colocar en localStorage que puede ver alertacomercial
        if (user) {
          const email = user.email;
          const alertaIED = alertaIEDDomains.find((domain: any) =>
            email?.includes(domain)
          );
          const alertacomercial = alertacomercialDomains.find((domain: any) =>
            email?.includes(domain)
          );
          if (alertaIED) {
            setCanSeeAlertasIED(true);
          }
          if (alertacomercial) {
            setCanSeeAlertaComerciales(true);
          }
        }
        if (!user) {
          setCanSeeAlertasIED(false);
          setCanSeeAlertaComerciales(false);
        }
      };
      getToken();
      getDomainsP();
    }
  }, [user, isLoading, setAuth0Token]);

  const toogleOpenDrawer = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className="flex w-full h-screen bg-white">
      <div className="items-end hidden h-full lg:flex">
        <Sidebar visible={sidebarOpen} />
      </div>
      <div className="w-full h-full overflow-y-auto">
        <NavbarDashboard
          toggleSidebar={toggleSidebar}
          openNav={openNav}
          openDrawer={toogleOpenDrawer}
        />
        {children}
      </div>
      {modal}
      <Notifications zIndex={9999} />

      <MobileMenu isOpen={openNav} onClose={toogleOpenDrawer} />
    </div>
  );
}

export default function RootLayout(props: RootLayoutProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Provider>
          <RootLayoutComponent {...props} />
        </Provider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
