"use client";
import Modal from "@/src/components/alertaIED/Modal/Modal";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  return <Modal id={params.id} />;
}
