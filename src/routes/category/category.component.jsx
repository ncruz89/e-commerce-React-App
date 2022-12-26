import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { selectCategoriesMap } from "../../store/categories/categories.selector";

import { CategoryTitle, CategoryProductsContainer } from "./category.styles";

// Category component

// updates setProducts when category or categoriesMap updates
// retrieves category from url parameter and uses category as key value for categoriesMap object to retrieve category products

//returns Fragment holding category title and a map of all products in category as ProductCard components
const Category = () => {
  const { category } = useParams();

  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryProductsContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryProductsContainer>
    </Fragment>
  );
};

export default Category;
