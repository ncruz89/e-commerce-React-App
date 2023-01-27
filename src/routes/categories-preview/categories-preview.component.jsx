import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories.selector";
// import { CategoriesContext } from "../../contexts/categories.context";

import CategoryPreview from "../../components/category-preview/category-preview.component";

// CategoriesPreview Component
// retrieves categoriesMap - an object containing all of the categories that contain objects containing all inventory items

// returns a fragment that maps through the categoriesMap categories and renders a CategoryPreview of the products array in each

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
