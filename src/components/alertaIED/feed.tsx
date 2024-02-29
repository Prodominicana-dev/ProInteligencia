"use client";

import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import AlertaIEDCard from "./card";
import AlertaIED from "@/src/models/alertaIED";
import {
  useActiveAlertasIEDPage,
  usePublicAlertasIEDPage,
} from "@/src/services/alertaIED/service";
import NotFound from "../validate/notFound";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useAtom } from "jotai";
import { alertaIEDAtom } from "@/src/state/states";

export default function Feed() {
  const { isLoading } = useUser();
  const {
    fetchNextPage,
    hasNextPage,
    data: dataAll,
  } = useActiveAlertasIEDPage();
  const {
    fetchNextPage: fetchNextPagePublic,
    hasNextPage: hasNextPagePublic,
    data,
  } = usePublicAlertasIEDPage();
  const containerRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  const [canSeeAlertasIED] = useAtom(alertaIEDAtom);
  const [filteredData, setFilteredData] = useState<any>([]);

  useEffect(() => {
    if (dataAll && data && !isLoading) {
      canSeeAlertasIED
        ? setFilteredData(dataAll?.pages.map((page) => page.data).flat())
        : setFilteredData(data?.pages.map((page) => page.data).flat());
    }
  }, [canSeeAlertasIED, dataAll, data, isLoading]);

  useEffect(() => {
    if (hasNextPage && entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (hasNextPagePublic && entry?.isIntersecting) fetchNextPagePublic();
  }, [entry, fetchNextPagePublic, hasNextPagePublic]);

  return (
    <>
      {filteredData?.length === 0 ? (
        <NotFound />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredData?.map((alertaIED: AlertaIED, i: number) => {
              if (i === filteredData.length - 1)
                return (
                  <div ref={ref} key={alertaIED.id}>
                    <AlertaIEDCard {...alertaIED} />
                  </div>
                );
              return (
                <div key={alertaIED.id}>
                  <AlertaIEDCard {...alertaIED} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
