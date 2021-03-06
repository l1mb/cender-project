import { useSelector } from "react-redux";
import Label from "@/elements/home/labelElement/label";
import Spinner from "@/elements/home/spinnerElement/spinner";
import ProductCard from "@/elements/home/productCardElement/productCard";
import useProductFetcher from "@/hooks/loader/loader";
import StateType from "@/redux/types/stateType";
import IGroupedProduct from "@/api/types/products/IGroupedProduct";
import styles from "./product.module.scss";

function Products(): JSX.Element {
  const { loading } = useProductFetcher();

  const products = useSelector<StateType, IGroupedProduct[]>((state) => state.Products);
  const headerLabel = "Products";

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.wrapper}>
      <Label content={headerLabel} />
      <div className={styles.ProductsContainer}>
        {products && products?.map((u) => <ProductCard key={u.name} product={u} />)}
      </div>
    </div>
  );
}

export default Products;
