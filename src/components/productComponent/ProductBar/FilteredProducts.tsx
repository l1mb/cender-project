import React from "react";
import IGroupedProduct from "@/api/types/products/IGroupedProduct";
import ProductCard from "@/elements/home/productCardElement/productCard";

interface ProductProps {
  Products: IGroupedProduct[];
}

const FilteredProducts: React.FC<ProductProps> = React.memo((props) => (
  <>
    {props.Products.map((u) => (
      <React.Fragment key={u.ids[0].id}>
        <ProductCard key={u.name} product={u} />
      </React.Fragment>
    ))}
  </>
));
export default FilteredProducts;
