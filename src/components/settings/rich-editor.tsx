import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { RichTextEditor } from "@mantine/tiptap";

import React from "react";
import Image from "next/image";

export default function TextEditor({ editor }: any) {
  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Control
            title="Align text: left"
            onClick={() => editor?.chain().focus().setTextAlign("left").run()}
            active={editor?.isActive({ textAlign: "left" })}
            aria-label="Align text: left"
          >
            <RichTextEditor.AlignLeft />
          </RichTextEditor.Control>

          <RichTextEditor.Control
            title="Align text: center"
            onClick={() => editor?.chain().focus().setTextAlign("center").run()}
            active={editor?.isActive({ textAlign: "center" })}
            aria-label="Align text: center"
          >
            <RichTextEditor.AlignCenter />
          </RichTextEditor.Control>

          <RichTextEditor.Control
            title="Align text: right"
            onClick={() => editor?.chain().focus().setTextAlign("right").run()}
            active={editor?.isActive({ textAlign: "right" })}
            aria-label="Align text: right"
          >
            <RichTextEditor.AlignRight />
          </RichTextEditor.Control>

          <RichTextEditor.Control
            title="justify"
            onClick={() =>
              editor?.chain().focus().setTextAlign("justify").run()
            }
            active={editor?.isActive({ textAlign: "justify" })}
            aria-label="justify"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </RichTextEditor.Control>
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <Menu placement="right-start">
            <MenuHandler>
              <button className="container p-1 h-[1.625rem] w-[1.625rem] bg-white ring-1 ring-gray-300 rounded-md">
                <Image
                  width="50"
                  height="50"
                  src="https://img.icons8.com/ios/50/table-1.png"
                  alt="table-1"
                />
              </button>
            </MenuHandler>
            <MenuList className="z-[9999]">
              <MenuItem
                onClick={() =>
                  editor
                    ?.chain()
                    .focus()
                    .insertTable({
                      rows: 3,
                      cols: 3,
                      withHeaderRow: true,
                    })
                    .run()
                }
              >
                Añadir tabla
              </MenuItem>
              <hr className="my-2" />
              <MenuItem
                onClick={() => editor?.chain().focus().addColumnBefore().run()}
              >
                Añadir columna antes
              </MenuItem>
              <MenuItem
                onClick={() => editor?.chain().focus().addColumnAfter().run()}
              >
                Añadir columna después
              </MenuItem>
              <MenuItem
                onClick={() => editor?.chain().focus().addRowBefore().run()}
              >
                Añadir fila antes
              </MenuItem>
              <MenuItem
                onClick={() => editor?.chain().focus().addRowAfter().run()}
              >
                Añadir fila después
              </MenuItem>
              <hr className="my-2" />
              <MenuItem
                onClick={() => editor?.chain().focus().deleteColumn().run()}
              >
                Borrar columna
              </MenuItem>
              <MenuItem
                onClick={() => editor?.chain().focus().deleteRow().run()}
              >
                Borrar fila
              </MenuItem>
              <MenuItem
                onClick={() => editor?.chain().focus().deleteTable().run()}
              >
                Borrar tabla
              </MenuItem>
            </MenuList>
          </Menu>
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
