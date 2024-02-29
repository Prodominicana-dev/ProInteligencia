"use client";

import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import AlertaIED from "@/src/models/alertaIED";
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

  const _allAlertaIED = data?.pages.map((page: any) => page.data).flat();

  return (
    <>
      {_allAlertaIED?.map((alertaIED: AlertaIED, i: number) => {
        if (i === _allAlertaIED.length - 1)
          return (
            <div ref={ref} key={alertaIED.id} className="w-full h-full">
              <SCard key={alertaIED.id} data={alertaIED} update={update} />
            </div>
          );
        return (
          <div key={alertaIED.id} className="w-full h-full">
            <SCard key={alertaIED.id} data={alertaIED} update={update} />
          </div>
        );
      })}
    </>
  );
}
