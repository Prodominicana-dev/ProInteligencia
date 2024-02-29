import DataMarket from "@/src/models/datamarket";
import React from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  ListItem,
  AccordionHeader,
  ListItemPrefix,
  Typography,
  AccordionBody,
  List,
} from "@material-tailwind/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface sidebarMenuProps {
  isHover: boolean;
  title: string;
  data: DataMarket[];
}

export default function SidebarMenu({
  isHover,
  title,
  data,
}: sidebarMenuProps) {
  const [open, setOpen] = useState(0);
  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    if (!isHover) {
      setOpen(0);
    }
  }, [setOpen, isHover]);
  return (
    <Accordion
      open={open === 1}
      icon={
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`mx-auto h-4 w-4 transition-transform opacity-0 group-hover:opacity-100 text-white ${
            open === 1 ? "rotate-180" : ""
          }`}
        />
      }
    >
      <ListItem className="p-0" selected={open === 1}>
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className="p-3 border-b-0 text-white"
        >
          <ListItemPrefix>
            <div></div>
          </ListItemPrefix>
          <Typography
            color="white"
            className="mr-auto font-normal duration-300 opacity-0 group-hover:opacity-100"
          >
            {title}
          </Typography>
        </AccordionHeader>
      </ListItem>
      <AccordionBody className="py-1">
        <List className="p-0 text-white">
          {data?.map((datamarket: any, key: number) => (
            <Link href={`/dashboard/datamarket/${datamarket.id}`} key={key}>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                </ListItemPrefix>
                {datamarket.title}
              </ListItem>
            </Link>
          ))}
        </List>
      </AccordionBody>
    </Accordion>
  );
}
