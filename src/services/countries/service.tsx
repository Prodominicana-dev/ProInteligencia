import country from "@/src/models/country";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/countries`;
      const { data } = await axios.get(url);
      // console.log(data)
      return data.map((item: country) => item);
    },
  });
}

export function useSelectCountries() {
  return useQuery({
    queryKey: ["selectCountries"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/countries/select`;
      const { data } = await axios.get(url);
      return data.map((item: country) => item);
    },
  });
}

export function useCountryByAbbr(abbrv: string) {
  return useQuery({
    queryKey: ["countryByAbbr"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/country/abbreviation/${abbrv}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}



export async function createCountry(
  country: any,
  update: () => void,
) {
  try {
    
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/country/`,
      country,
      
    );

    if (res.status === 201) {
      notifications.show({
        id: "country",
        autoClose: 5000,
        withCloseButton: false,
        title: "País/Mercado creado",
        message: "El país/mercado ha sido creado correctamente.",
        color: "green",
        loading: false,
      });
      update();
    } else {
      handleErrorResponse(res);
    }
  } catch (error) {
    notifications.show({
      id: "member",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error creando el país/mercado",
      message: "Ocurrió un error creando el país/mercado.",
      color: "red",
      loading: false,
    });
  }
}

function handleErrorResponse(response: any) {
  switch (response.status) {
    case 500:
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error creando el país/mercado",
        message: "Ocurrió un error creando el país/mercado.",
        color: "red",
        loading: false,
      });
      break;

    case 401:
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Usuario no autorizado",
        message: "No tienes permisos para crear el país.",
        color: "red",
        loading: false,
      });
      break;
    // Puedes agregar más casos según sea necesario
    default:
      break;
  }
}

export async function editCountry(
  id: string,
  country: any,
  update: () => void,
) {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/country/${id}`,
      country,
    );

    if (res.status === 200) {
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "País/Mercado actualizado",
        message: "El país/mercado ha sido actualizado correctamente.",
        color: "green",
        loading: false,
      });
      update();
    } else {
      handleEditErrorResponse(res);
    }
  } catch (error) {
    notifications.show({
      id: "member",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error editando el país/mercado",
      message:
        "Ocurrió un error editando el país/mercado. Por favor, intenta de nuevo.",
      color: "red",
      loading: false,
    });
  }
}

function handleEditErrorResponse(response: any) {
  switch (response.status) {
    case 500:
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error editando el país/mercado",
       message:
        "Ocurrió un error editando el país/mercado. Por favor, intenta de nuevo.",
        color: "red",
        loading: false,
      });
      break;

    case 401:
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Usuario inautorizado",
        message: "No tienes permisos para editar un país/mercado.",
        color: "red",
        loading: false,
      });
      break;
    // Puedes agregar más casos según sea necesario
    default:
      break;
  }
}
