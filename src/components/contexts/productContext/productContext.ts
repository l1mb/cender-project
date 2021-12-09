import React from "react";
import Platforms from "@/api/types/Products/enums/platfrom";

const ProductContext = React.createContext<{ filterPlatform: Platforms }>({
  filterPlatform: Platforms.PC,
});

export default ProductContext;
