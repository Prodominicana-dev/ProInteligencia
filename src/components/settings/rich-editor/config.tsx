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
import FontSize from "../extensions/FontSize";

export default function Editor({ placeholder, content }: any) {
  return useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "text-black font-light",
          },
        },

        bold: {
          HTMLAttributes: {
            class: "font-bold text-gray-900",
          },
        },

        bulletList: {
          HTMLAttributes: {
            class: "text-black list-disc pl-4",
          },
        },

        orderedList: {
          HTMLAttributes: {
            class: "text-black list-decimal pl-4",
          },
        },
      }),
      Underline,
      Link,
      Highlight,
      Table.configure({
        HTMLAttributes: {
          class:
            "p-6 rounded-lg border-2 border-gray-200",
        },
        resizable: true,
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: "border-2 border-gray-200",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border-2 border-gray-200",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "border-2 border-gray-200",
        },
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),

      Placeholder.configure({
        placeholder,
      }),

      Img.configure({
        inline: true,
        HTMLAttributes: {
          class: "w-full h-auto",
        },
        allowBase64: true,
      }),
    ],

    content,
  });
}
