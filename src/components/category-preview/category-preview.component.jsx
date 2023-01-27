import ProductCard from "../product-card/product-card.component";

import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles.jsx";

// CategoryPreview component
// receives title and products array as parameters

// renders a category preview showing the category title
// also maps through the products array and renders a ProductCard component of the first 4 elements in title product array

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
