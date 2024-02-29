import DataMarket from "@/src/models/datamarket";
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
import React from "react";

interface sidebarMenuProps {
  title: string;
  data: DataMarket[];
  onClose: () => void;
}

export default function DataMarketMenu({
  title,
  data,
  onClose,
}: sidebarMenuProps) {
  const [open, setOpen] = useState(0);
  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };
  useEffect(() => {
    setOpen(0);
  }, [setOpen]);
  return (
    <Accordion
      open={open === 1}
      icon={
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`mx-auto h-4 w-4 transition-transform text-navy  ${
            open === 1 ? "rotate-180" : ""
          }`}
        />
      }
    >
      <ListItem className="p-0" selected={open === 1}>
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className="p-3 border-b-0 text-navy "
        >
          <ListItemPrefix>
            <div></div>
          </ListItemPrefix>
          <Typography className="mr-auto font-normal text-navy">
            {title}
          </Typography>
        </AccordionHeader>
      </ListItem>
      <AccordionBody className="py-1">
        <List className="p-0 text-navy">
          {data?.map((datamarket: any, key: number) => (
            <Link
              href={`/dashboard/datamarket/${datamarket.id}`}
              key={key}
              onClick={onClose}
            >
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
