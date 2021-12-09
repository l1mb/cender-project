import CategoriesData from "../categories/categoriesData";
import { IRoutes } from "./IRoutes";

const RoutesData: IRoutes = {
  home: { label: "Home", route: "/home" },
  signIn: { label: "Sign in", route: "/sign-in" },
  signUp: { label: "Sign up", route: "/sign-up" },
  about: { label: "about", route: "/about" },
  cart: { label: "Cart", route: "/cart" },
  products: CategoriesData.map((u) => ({ label: u.name, route: `/${u.name.toLowerCase()}` })),
  profile: { label: "profile", route: "/profile" },
};

export default RoutesData;
