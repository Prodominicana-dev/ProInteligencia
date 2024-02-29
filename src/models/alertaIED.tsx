import Category from "./category";
import Country from "./country";
import Product from "./product";

export default interface AlertaIED {
  id: string;
  title: string;
  description: string;
  category: Category;
  image: string;
  date: Date;
  status: string;
  published: boolean;
  isPublic: boolean;
  countries: Country[];
  products: Product[];
}
