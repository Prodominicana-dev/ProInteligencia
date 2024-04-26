import { createProduct, updateProduct } from "@/src/services/products/service";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Product from "@/src/models/product";
import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { createDomain } from "@/src/services/domains/service";
import { createCountry, editCountry, useCountryByAbbr } from "@/src/services/countries/service";
import Image from "next/image";
const animatedComponents = makeAnimated();

export default function EditCountryDialog({
  country,
  open,
  handleOpen,
  updateProducts,
}: {
    country: any;
  open: boolean;
  handleOpen: () => void;
  updateProducts: () => void;
}) {
    const {user, isLoading:userLoading} = useUser();
    const [name, setName] = useState("");
    const [abbreviation, setAbbreviation] = useState("");
    const [oldAbbrv, setOldAbbrv] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [warningAbbrv, setWarningAbbrv] = useState(false)
    const { data, isLoading: abbrvLoading, refetch} = useCountryByAbbr(abbreviation.toLowerCase())
    

    useEffect(() => {
        setName(country.name);
        setAbbreviation(country.abbreviation);
        setOldAbbrv(country.abbreviation)
    }, [country])

  useEffect(() => {
    if(abbreviation === oldAbbrv){
        return setWarningAbbrv(false)
    }

    if(abbreviation){
        
            refetch().then((res) => {
                if(res.data){
                    setWarningAbbrv(true)
                }else{
                    setWarningAbbrv(false)
                }

            })
  
    }
  }, [abbreviation])

 const handleSubmit = async () => {
    if(!isLoading && !warningAbbrv){
        setIsLoading(true);
        const data = {
            name,
            abbreviation: abbreviation.toLowerCase()
        }
        await editCountry(country.id, data, updateProducts);
        handleOpen();
    }
 }


  return (
    <div>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader>
          Agregar País/Mercado
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
            <Input
              label="Nombre"
              crossOrigin={""}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Input
              label="Abreviatura"
              crossOrigin={""}
              onChange={(e) => setAbbreviation(e.target.value)}
              value={abbreviation}
              className="uppercase"
            />
            {warningAbbrv && <label htmlFor="" className="text-xs text-center text-red-500">La abreviatura ya existe. Prueba con otra.</label>}
            <label htmlFor="" className="text-xs text-center text-black">La abreviatura debe coincidir con la de <a href="https://flagpedia.net/" className="font-bold text-blue-950" target="_blank">Flagpedia</a> para poder obtener la bandera del país.</label>
            {abbreviation && <div className="flex justify-center w-full py-3">
                <Image src={`https://flagcdn.com/${abbreviation.toLowerCase()}.svg`} alt="bandera" width={100} height={100} className="object-cover object-center rounded-full size-16" />
            </div>}
            <Button
              disabled={isLoading || !name || !abbreviation}
              className="flex items-center justify-center bg-navy"
              onClick={handleSubmit}
            >
              {isLoading ? <Spinner /> : "Guardar"}
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}
