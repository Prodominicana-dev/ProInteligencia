"use client";
import { useDataMarket } from "@/src/services/datamarket/service";
import { datamarketTitleAtom } from "@/src/state/states";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { data }: any = useDataMarket(params.id);
  const [, setDatamarketTitle] = useAtom(datamarketTitleAtom);
  useEffect(() => {
    if (!data) return;
    setDatamarketTitle(data.title);
  }, [data]);

  return (
    <div className="w-full sm:px-10 py-5 h-[88vh] flex items-center justify-center">
      <iframe
        className="w-full h-full"
        title="Report Section"
        src={data?.url}
        allowFullScreen={false}
      ></iframe>
    </div>
  );
}
