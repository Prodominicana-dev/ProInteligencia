import { useTypingEffect } from "@/public/lib/hook/typewriteffect";
import React from "react";

export default function TypeWriterEffect({ text, speedText }: any) {
  const _text = useTypingEffect(text, speedText);
  return <span>{_text}</span>;
}
