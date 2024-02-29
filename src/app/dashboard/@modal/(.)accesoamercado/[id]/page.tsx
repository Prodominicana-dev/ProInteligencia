import Modal from "@/src/components/accesoacomercio/modal/Modal";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  return <Modal id={params.id} />;
}
