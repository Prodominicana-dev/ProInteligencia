import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function usePartners() {
  return useQuery({
    queryKey: ["partner"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/partner`;
      const { data } = await axios.get(url);
      return data.map((item: any) => item);
    },
  });
}
