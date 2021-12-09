import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Platforms from "@/api/types/products/enums/platfrom";
import IGroupedProduct from "@/api/types/products/IGroupedProduct";
import Label from "@/elements/home/labelElement/label";
import SearchBar from "@/elements/home/searchBarElement/searchBar";
import Spinner from "@/elements/home/spinnerElement/spinner";
import useProductFetcher from "@/hooks/loader/loader";
import StateType from "@/redux/types/stateType";

import FilterBar from "./FilterBar/filter";
import styles from "./products.module.scss";

const FilteredProducts = React.lazy(() => import("./ProductBar/FilteredProducts"));

function Products(): JSX.Element {
  const products = useSelector<StateType, IGroupedProduct[]>((state) => state.Products);
  const [platform, setPlatform] = useState<Platforms>(Platforms.PC);
  const { loading, setParams } = useProductFetcher();

  const location = useLocation();

  useEffect(() => {
    const data = location.pathname.slice(1);

    switch (data) {
      case "pc":
        setPlatform(Platforms.PC);
        break;
      case "playstation":
        setPlatform(Platforms.PlayStation);
        break;
      case "xbox":
        setPlatform(Platforms.Xbox);
        break;

      default:
        break;
    }
  }, [location.pathname]);

  return (
    <div className={styles.productsWrapper}>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      <div className={styles.pageContent}>
        <div className={styles.filterBar}>
          <FilterBar setQuery={setParams} platform={Platforms[Number(platform)]} />
        </div>
        <div className={styles.ProductBar}>
          <Label content="Products" />
          <div className={styles.items}>
            {loading ? (
              <Spinner />
            ) : (
              <FilteredProducts
                Products={products?.filter((e) =>
                  e.ids.map((m) => m.platform.toString()).includes(Platforms[platform])
                )}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
