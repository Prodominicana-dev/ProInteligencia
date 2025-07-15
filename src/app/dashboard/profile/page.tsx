"use client";
import IsLogged from "@/src/components/validate/logged";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Avatar,
  Checkbox,
  Input,
  Option,
  Select,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import Image from "next/image";
import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "@/src/state/states";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useCountries } from "@/src/services/countries/service";
const countryCodes = require("country-codes-list");

export default function Page() {
  const { user, isLoading } = useUser();
  const [typeDocumentation, setTypeDocumentation] = useState("");

  const [createdAt, setCreatedAt] = useState<Date | null>(new Date());
  const [country, setCountry] = useState({
    countryCode: "DO",
    countryCallingCode: "+1",
  });
  const [myCountryCodesArray] = useState(() => {
    const myCountryCodesObject = countryCodes.customList(
      "countryCode",
      "+{countryCallingCode}"
    );
    const list = Object.keys(myCountryCodesObject).map((countryCode) => ({
      countryCode,
      countryCallingCode: myCountryCodesObject[countryCode],
    }));
    return list.sort((a, b) =>
      a.countryCallingCode.localeCompare(b.countryCallingCode)
    );
  });
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [documentation, setDocumentation] = useState("");
  const [gender, setGender] = useState("");
  const [coun3, setCoun3] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [token] = useAtom(tokenAtom);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [, setGlobalName] = useAtom(userAtom);
  const [contries, setCountries] = useState([]);
  const [userType, setUserType] = useState("");
  const [userInfoType, setUserInfoType] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [knowUs, setKnowUs] = useState("");
  const [otherKnowUs, setOtherKnowUs] = useState(false);
  const [otherKnowUsInfo, setOtherKnowUsInfo] = useState("");
  const { data } = useCountries();

  useEffect(() => {
    if (user && token && !isLoading) {
      const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${user.sub}`;
      const getUserData = async () => {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.user_metadata) {
          setAddress(
            res.data.user_metadata.address ? res.data.user_metadata.address : ""
          );
          setDocumentation(
            res.data.user_metadata.documentation.documentation
              ? res.data.user_metadata.documentation.documentation
              : ""
          );
          setTypeDocumentation(
            res.data.user_metadata.documentation.typeDocumentation
              ? res.data.user_metadata.documentation.typeDocumentation
              : ""
          );
          setName(
            res.data.user_metadata.given_name
              ? res.data.user_metadata.given_name
              : ""
          );
          setFullName(
            res.data.user_metadata.given_name &&
              res.data.user_metadata.family_name
              ? `${res.data.user_metadata.given_name} ${res.data.user_metadata.family_name}`
              : user?.name
              ? user?.name
              : ""
          );
          setLastName(
            res.data.user_metadata.family_name
              ? res.data.user_metadata.family_name
              : ""
          );
          setCountry(
            res.data.user_metadata.phone_number
              ? res.data.user_metadata.phone_number.country
              : { countryCode: "DO", countryCallingCode: "+1" }
          );
          setPhone(
            res.data.user_metadata.phone_number
              ? res.data.user_metadata.phone_number.number
              : ""
          );
          setGender(res.data.user_metadata.gender);
          setCoun3(res.data.user_metadata.country);
          setUserType(res.data.user_metadata.userType);
          setUserInfoType(res.data.user_metadata.userInfoType);
          setKnowUs(res.data.user_metadata.knowUs);
          setOtherKnowUsInfo(res.data.user_metadata.otherKnowUsInfo);
          setOtherKnowUs(res.data.user_metadata.userInfoType ? true : false);
          setEmployeeType(res.data.user_metadata.employeeType);
        } else {
          setName(res.data.given_name ? res.data.given_name : "");
          setFullName(
            res.data.given_name && res.data.family_name
              ? `${res.data.given_name} ${res.data.family_name}`
              : user?.name
              ? user?.name
              : ""
          );
          setLastName(res.data.family_name ? res.data.family_name : "");
        }
        setEmail(res.data.email);
        setCreatedAt(new Date(res.data.created_at));
        setDataLoaded(true);
      };
      getUserData();
    }
    const countries = data?.map((country: any) => {
      return country.name;
    });
    setCountries(countries);
  }, [user, token, isLoading]);

  const handleSubmit = async () => {
    setIsSubmitted(true);
    const data = {
      user_metadata: {
        address,
        documentation: {
          documentation,
          typeDocumentation,
        },
        phone_number: {
          country,
          number: phone,
        },
        given_name: name,
        family_name: lastName,
        name: `${name} ${lastName}`,
        gender,
        country: coun3,
        userType,
        userInfoType,
        knowUs,
        otherKnowUsInfo,
        employeeType,
      },
    };
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `https://prodominicana.us.auth0.com/api/v2/users/${user?.sub}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },

      data: data,
    };
    const response = await axios.request(config);
    if (response.status === 200) {
      // console.log(response.data);
      notifications.show({
        title: "Perfíl actualizado",
        message: "Tu perfíl ha sido actualizado exitosamente",
        color: "green",
        autoClose: 5000,
      });
    }
    setIsSubmitted(false);
    setGlobalName(`${name} ${lastName}`);
  };

  if (!dataLoaded)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner />
      </div>
    );
  return (
    <IsLogged>
      <div className="flex justify-center">
        <div className="flex flex-col w-10/12 py-8 sm:w-8/12 xl:w-5/12 space-y-14">
          <div className="w-full">
            <h1 className="text-3xl font-bold text-black lg:text-4xl">
              Perfíl
            </h1>
            <p className="text-base font-thin text-gray-400 lg:text-lg">
              Completa tu perfil para disfrutar de una experiencia más completa
              en nuestra plataforma.
            </p>
          </div>
          <div className="flex flex-col w-full space-y-4 sm:flex-row sm:space-y-0">
            <div className="flex justify-center w-full sm:w-6/12">
              <Avatar
                variant="circular"
                size="lg"
                className="w-32 h-32 sm:w-48 sm:h-48"
                src={user?.picture as string}
              />
            </div>
            <div className="flex items-center justify-center w-full sm:justify-start sm:w-6/12">
              <div className="w-full">
                <Typography className="w-full text-2xl font-bold text-center truncate sm:text-left sm:text-3xl text-navy ">
                  {fullName}
                </Typography>
                <Typography className="text-xs font-thin text-center text-gray-400 sm:text-left sm:text-base">
                  Miembro desde{" "}
                  {createdAt
                    ? format(new Date(createdAt), "MMMM yyyy", { locale: es })
                    : "Fecha no disponible"}
                </Typography>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full space-y-4 sm:space-y-10">
            <div className="flex flex-col w-full space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
              <div className="w-full sm:w-6/12">
                <Input
                  label="Nombre"
                  crossOrigin={""}
                  onChange={(e) => {
                    setName(e.target.value);
                    setFullName(`${e.target.value} ${lastName}`);
                  }}
                  value={name}
                />
              </div>
              <div className="w-full sm:w-6/12">
                <Input
                  label="Apellido"
                  crossOrigin={""}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setFullName(`${name} ${e.target.value}`);
                  }}
                  value={lastName}
                />
              </div>
            </div>
            <div className="flex flex-col w-full space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
              <div className="w-full sm:w-6/12">
                <Input
                  label="Correo electrónico"
                  type="email"
                  crossOrigin={""}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  disabled
                  value={email}
                />
              </div>
              <div className="flex flex-row w-full sm:w-6/12">
                <Menu placement="bottom-start">
                  <MenuHandler>
                    <button className="flex flex-row items-center justify-between h-10 gap-2 text-xs font-thin text-black border border-r-0 rounded-l-lg w-36 border-blue-gray-200 bg-blue-gray-500/10">
                      <div className="flex justify-end w-5/12">
                        <Image
                          src={`https://flagcdn.com/${country.countryCode.toLowerCase()}.svg`}
                          alt={country.countryCode}
                          className="object-cover w-5 h-5 rounded-full"
                          width={20}
                          height={20}
                        />
                      </div>
                      <div className="flex justify-start w-7/12">
                        {country.countryCallingCode}
                      </div>
                    </button>
                  </MenuHandler>
                  <MenuList className="max-h-[20rem] max-w-[12rem]">
                    {myCountryCodesArray.map((country) => {
                      return (
                        <MenuItem
                          key={country.countryCode}
                          value={country.countryCode}
                          className="flex items-center gap-2"
                          onClick={() => setCountry(country)}
                        >
                          <Image
                            width={100}
                            height={100}
                            src={`https://flagcdn.com/${country.countryCode.toLowerCase()}.svg`}
                            alt={country.countryCode}
                            className="object-cover w-5 h-5 rounded-full"
                          />
                          {country.countryCode}{" "}
                          <span className="ml-auto">
                            {country.countryCallingCode}
                          </span>
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Menu>
                <Input
                  type="tel"
                  placeholder="Teléfono"
                  className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  containerProps={{
                    className: "min-w-0",
                  }}
                  crossOrigin={""}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col w-full space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
              <div className="w-full sm:w-6/12">
                <Select
                  label="Documento"
                  onChange={(e) => {
                    setTypeDocumentation(e ? e : "");
                  }}
                  value={typeDocumentation}
                >
                  <Option value="cedula">Cédula</Option>
                  <Option value="pasaporte">Pasaporte</Option>
                </Select>
              </div>
              <div className="w-full sm:w-6/12">
                <Input
                  label={
                    typeDocumentation === "cedula"
                      ? "Cédula"
                      : typeDocumentation === "pasaporte"
                      ? "Pasaporte"
                      : ""
                  }
                  crossOrigin={""}
                  disabled={typeDocumentation === ""}
                  value={documentation}
                  minLength={typeDocumentation === "cedula" ? 11 : 9}
                  maxLength={typeDocumentation === "cedula" ? 11 : 9}
                  onChange={(e) => setDocumentation(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col w-full space-x-4 sm:flex-row">
              <div className="w-full sm:w-6/12">
                <Select
                  label="Género"
                  onChange={(e) => {
                    setGender(e ? e : "");
                  }}
                  value={gender}
                >
                  <Option value="hombre">Hombre</Option>
                  <Option value="mujer">Mujer</Option>
                  <Option value="otro">Prefiero no especificarlo</Option>
                </Select>
              </div>
              <div className="w-full sm:w-6/12">
                <Select
                  label="País"
                  onChange={(e) => {
                    setCoun3(e ? e : "");
                  }}
                  value={coun3}
                >
                  {contries.map((country) => (
                    <Option value={country} key={country}>
                      {country}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="flex flex-col w-full space-x-4 sm:flex-row">
              <div className="w-full sm:w-6/12">
                <Select
                  label="Tipo de usuario"
                  onChange={(e) => {
                    setUserType(e ? e : "");
                  }}
                  value={userType}
                >
                  <Option value="Empleado">Empleado</Option>
                  <Option value="Emprendedor/Propietario de empresa">
                    Emprendedor/Propietario de empresa
                  </Option>
                  <Option value="Estudiante">Estudiante</Option>
                  <Option value="profesionalindependiente">
                    Profesional independiente
                  </Option>
                  <Option value="Otro">Otro</Option>
                </Select>
              </div>
              <div
                className={`${
                  userType === "Otro" ? "block" : "hidden"
                } w-full sm:w-6/12`}
              >
                <Input
                  label="Especifique su trabajo..."
                  crossOrigin={""}
                  value={otherKnowUsInfo}
                  onChange={(e) => setOtherKnowUsInfo(e.target.value)}
                />
              </div>
              <div
                className={`${
                  userType === "Empleado" ? "block" : "hidden"
                } w-full sm:w-6/12`}
              >
                <Select
                  label="Tipo de empleado"
                  onChange={(e) => {
                    setEmployeeType(e ? e : "");
                  }}
                  value={employeeType}
                >
                  <Option value="publico">Empleado Público</Option>
                  <Option value="privado">Empleado Privado</Option>
                </Select>
              </div>
            </div>
            <div className="flex flex-col w-full space-y-5">
              <div className="w-full font-bold">
                ¿Cómo conociste la plataforma?
              </div>
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-full sm:w-6/12">
                  <Checkbox
                    label={
                      <div className="font-normal text-black">
                        Prensa o redes sociales
                      </div>
                    }
                    checked={knowUs.includes("prensa o redes sociales")}
                    onChange={(e) => {
                      if (e.target.checked)
                        return setKnowUs(knowUs + "prensa o redes sociales");

                      setKnowUs(knowUs.replace("prensa o redes sociales", ""));
                    }}
                    crossOrigin={""}
                  />
                  <Checkbox
                    label={
                      <div className="font-normal text-black">Buscador web</div>
                    }
                    checked={knowUs.includes("buscador web")}
                    onChange={(e) => {
                      if (e.target.checked)
                        return setKnowUs(knowUs + "buscador web");

                      setKnowUs(knowUs.replace("buscador web", ""));
                    }}
                    crossOrigin={""}
                  />
                  <Checkbox
                    label={
                      <div className="font-normal text-black">
                        Universidad o institución educativa
                      </div>
                    }
                    checked={knowUs.includes(
                      "universidad o institución educativa"
                    )}
                    onChange={(e) => {
                      if (e.target.checked)
                        return setKnowUs(
                          knowUs + "universidad o institución educativa"
                        );

                      setKnowUs(
                        knowUs.replace(
                          "universidad o institución educativa",
                          ""
                        )
                      );
                    }}
                    crossOrigin={""}
                  />
                </div>
                <div className="flex flex-col w-full sm:w-6/12">
                  <Checkbox
                    label={
                      <div className="font-normal text-black">
                        Entorno laboral
                      </div>
                    }
                    checked={knowUs.includes("entorno laboral")}
                    onChange={(e) => {
                      if (e.target.checked)
                        return setKnowUs(knowUs + "entorno laboral");

                      setKnowUs(knowUs.replace("entorno laboral", ""));
                    }}
                    crossOrigin={""}
                  />
                  <Checkbox
                    label={
                      <div className="font-normal text-black">
                        Amigos o familiares
                      </div>
                    }
                    checked={knowUs.includes("amigos o familiares")}
                    onChange={(e) => {
                      if (e.target.checked)
                        return setKnowUs(knowUs + "amigos o familiares");

                      setKnowUs(knowUs.replace("amigos o familiares", ""));
                    }}
                    crossOrigin={""}
                  />
                  <Checkbox
                    label={<div className="font-normal text-black">Otro</div>}
                    onChange={(e) => {
                      if (e.target.checked) return setOtherKnowUs(true);

                      setOtherKnowUs(false);
                      setUserInfoType("");
                    }}
                    checked={otherKnowUs}
                    crossOrigin={""}
                  />
                </div>
              </div>
              <div className={`${otherKnowUs ? "block" : "hidden"} w-full `}>
                <Input
                  label="Cuéntanos cómo..."
                  crossOrigin={""}
                  value={userInfoType}
                  onChange={(e) => setUserInfoType(e.target.value)}
                />
              </div>
            </div>
            <button
              className="flex items-center justify-center w-full text-lg font-semibold text-center text-white duration-200 rounded-lg h-14 bg-navy hover:text-white/80 hover:bg-navy/80"
              onClick={handleSubmit}
            >
              {!isSubmitted ? "Guardar" : <Spinner />}
            </button>
          </div>
        </div>
      </div>
    </IsLogged>
  );
}
