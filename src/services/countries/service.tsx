import country from "@/src/models/country";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/countries`;
      const { data } = await axios.get(url);
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
