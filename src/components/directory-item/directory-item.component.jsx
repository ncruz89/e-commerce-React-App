import { useNavigate } from "react-router-dom";

import {
  Body,
  BackgroundImage,
  DirectoryItemContainer,
} from "./directory-item.styles.jsx";

// DirectoryItem component
// receives category prop
// renders an item directory container that has an image along with a body
// on click handler that calls onNavigateHandler
// onNavigateHandler sets navigation route that was passed in through category prop

const DirectoryItem = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
