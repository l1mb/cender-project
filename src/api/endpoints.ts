const getProductSearchEndpoint = "/api/products/search";
const getProductListEndpoint = "/api/products/list";
const getProductByPlatform = "/api/products/byPlatform";
const getProductsById = "/api/products/id";
const products = "/api/products/";

const postSignUp = "/api/auth/sign-up";
const postSignIn = "/api/auth/sign-in";
const user = "/api/user";
const userPassword = `${user}/password`;
const orders = "api/orders";
const ordersComplete = `${orders}/buy`;
const ordersCompleted = `${orders}/completed`;
export default {
  getProductSearchEndpoint,
  getProductListEndpoint,
  products,
  postSignUp,
  postSignIn,
  user,
  userPassword,
  orders,
  ordersComplete,
  getProductByPlatform,
  getProductsById,
  ordersCompleted,
};
