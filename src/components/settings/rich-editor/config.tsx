"use client";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Link } from "@mantine/tiptap";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Image as Img } from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

export default function Editor({ placeholder, content }: any) {
  return useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "text-black",
          },
        },
      }),
      Underline,
      Link,
      Highlight,
      Table.configure({
        HTMLAttributes: {
          style:
            "padding: 1.5rem; border-radius: 0.5rem; border-width: 2px;	border-color: rgb(243 244 246);",
        },
        resizable: true,
      }),
      TableRow.configure({
        HTMLAttributes: {
          style: "border-width: 2px;	border-color: rgb(243 244 246);",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          style: "border-width: 2px;	border-color: rgb(243 244 246);",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          style: "border-width: 2px;	border-color: rgb(243 244 246);",
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: placeholder,
      }),
      Img.configure({
        inline: true,
        HTMLAttributes: {
          class: "w-full h-auto",
        },
        allowBase64: true,
      }),
    ],

    content: content,
  });
}
