import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import Html from "react-pdf-html";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Spinner } from "@material-tailwind/react";

export default function DownloadPDF({
  accesoamercadoData,
  data,
  activeTab,
  date
}: any) {
  const selectedTab = accesoamercadoData.find(
    (tab: any) => tab.value === activeTab
  );

  // console.log("selectedTab", selectedTab);
  //  console.log("date", date);

  return (
    <button className="bg-white/25 hover:bg-white/50 duration-300 shadow-lg p-4 lg:p-5 flex w-5 h-5 lg:w-10 lg:h-10 justify-center items-center rounded-full">
      <PDFDownloadLink
        document={<PDFDocument accesoamercadoData={selectedTab} data={data} date={date} />}
        fileName={`Exporta ${data.product.name} a ${data.country.name}`}
      >
        {({ loading }) =>
          loading ? (
            <Spinner fill="white" className="w-4" />
          ) : (
            <ArrowDownTrayIcon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
          )
        }
      </PDFDownloadLink>
    </button>
  );
}

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans"],
    },
    extend: {
      colors: {
        custom: "#bada55",
        "purple-700": "#6b21a8",
      },
    },
  },
});

const PDFDocument = ({ accesoamercadoData, data, date }: any) => {
  return (
    <Document>
      <Page size="LETTER">
        <View style={tw(`px-10 pt-10`)}>
          <View
            style={tw(
              `flex font-thin items-center justify-between w-full text-white flex-row h-80 bg-purple-600 rounded-3xl p-5`
            )}
          >
            <View style={tw(`flex flex-col w-full leading-normal sm:w-6/12`)}>
              <Text style={tw(`text-lg`)}>Exporta</Text>
              <View>
                <Text style={tw(`text-6xl`)}>{data.product.name}</Text>
              </View>
              <Text style={tw(`text-lg pt-3`)}>{data.product.code}</Text>
              <Text style={tw(`text-lg pt-3`)}>{date}</Text>
            </View>
            <View
              style={tw(
                `flex flex-col justify-between w-full p-3 rounded-lg bg-[rgba(255,255,255,0.25)] sm:w-5/12 h-52 sm:h-full sm:p-5`
              )}
            >
              <View>
                <Text style={tw(`text-xs `)}>Destino</Text>
                <Text style={tw(`text-xl`)}>{data.country.name}</Text>
              </View>
              <Image
                src={`https://flagcdn.com/w1280/${data.country.abbreviation}.png`}
                style={tw(
                  `object-cover w-full h-32 rounded-md lg:rounded-lg sm:h-24 lg:h-52`
                )}
              />
            </View>
          </View>
        </View>
        <View style={tw(`p-10`)}>
          <View>
            <SectionAccesoaMercado
              title={accesoamercadoData.label}
              desc={accesoamercadoData.desc}
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};

function SectionAccesoaMercado({ title, desc }: any) {
  return (
    <View>
      <Text style={tw("text-2xl font-semibold text-purple-700 ")}>{title}</Text>
      <Html
        stylesheet={{
          p: {
            fontSize: 12,
            marginBottom: 8,
            textAlign: "justify",
            color: "#000000",
            fontWeight: "normal", 
          },
          strong: {
            fontWeight: 700,
          },
          a: {
            color: "#2563eb", 
            textDecoration: "underline",
          },
          ul: {
            paddingLeft: 16,
            marginBottom: 8,
          },
          li: {
            marginBottom: 4,
          },
        }}
      >
        {desc}
      </Html>
    </View>
  );
}
