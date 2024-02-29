"use client";

import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import AlertaComercial from "@/src/models/alertacomercial";
import SCard from "./card";
import React from "react";

export default function SettingsFeed({
  queryI,
  update,
}: {
  queryI: any;
  update: () => void;
}) {
  const { fetchNextPage, hasNextPage, data } = queryI;
  const containerRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (hasNextPage && entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage, hasNextPage]);

  const _allAlertaComercial = data?.pages.map((page: any) => page.data).flat();

  return (
    <>
      {_allAlertaComercial?.map(
        (alertacomercial: AlertaComercial, i: number) => {
          if (i === _allAlertaComercial.length - 1)
            return (
              <div ref={ref} key={alertacomercial.id} className="w-full h-full">
                <SCard
                  key={alertacomercial.id}
                  data={alertacomercial}
                  update={update}
                />
              </div>
            );
          return (
            <div key={alertacomercial.id} className="w-full h-full">
              <SCard
                key={alertacomercial.id}
                data={alertacomercial}
                update={update}
              />
            </div>
          );
        }
      )}
    </>
  );
}
