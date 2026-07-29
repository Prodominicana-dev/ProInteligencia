import Region from "./region";

export default interface CountryProfile {
  id: string;
  countryId: number;
  pdf?: string;
  status?: string;
  date?: Date;
  country: {
    id: number;
    name: string;
    abbreviation: string;
    continent?: string;
    group?: string;
    regionId?: number;
    region?: Region;
  };
}
