"use client";

import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import AlertaComercialCard from "./card";
import AlertaComercial from "@/src/models/alertacomercial";
import {
  useActiveAlertaComercialesPage,
  usePublicAlertaComercialesPage,
} from "@/src/services/alertacomercial/service";
import NotFound from "../validate/notFound";
import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";
import { Spinner } from "@material-tailwind/react";
import { useAtom } from "jotai";
import { alertacomercialAtom } from "@/src/state/states";

export default function Feed() {
  const { isLoading } = useUser();
  const {
    fetchNextPage,
    hasNextPage,
    data: dataAll,
  } = useActiveAlertaComercialesPage();
  const {
    fetchNextPage: fetchNextPagePublic,
    hasNextPage: hasNextPagePublic,
    data,
  } = usePublicAlertaComercialesPage();
  const containerRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });
  const [canSeeAlertaComerciales] = useAtom(alertacomercialAtom);
  const [filteredData, setFilteredData] = useState<any>([]);

  useEffect(() => {
    if (dataAll && data && !isLoading) {
      canSeeAlertaComerciales
        ? setFilteredData(dataAll?.pages.map((page) => page.data).flat())
        : setFilteredData(data?.pages.map((page) => page.data).flat());
    }
  }, [canSeeAlertaComerciales, dataAll, data, isLoading]);

  useEffect(() => {
    if (hasNextPage && entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (hasNextPagePublic && entry?.isIntersecting) fetchNextPagePublic();
  }, [entry, fetchNextPagePublic, hasNextPagePublic]);

  if (isLoading) return <Spinner />;
  return (
    <>
      {filteredData?.length === 0 ? (
        <NotFound />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredData?.map(
              (alertacomercial: AlertaComercial, i: number) => {
                if (i === filteredData.length - 1)
                  return (
                    <div ref={ref} key={alertacomercial.id}>
                      <AlertaComercialCard {...alertacomercial} />
                    </div>
                  );
                return (
                  <div key={alertacomercial.id}>
                    <AlertaComercialCard {...alertacomercial} />
                  </div>
                );
              }
            )}
          </div>
        </>
      )}
    </>
  );
}
