import Category from "./category";
import country from "./country";
import product from "./product";

export default interface AlertaComercial {
  id: string;
  title: string;
  description: string;
  category: Category;
  image: string;
  date: Date;
  status: string;
  published: boolean;
  isPublic: boolean;
  countries: country[];
  products: product[];
}
