import styled from "styled-components";

export const CategoryTitle = styled.h2`
  text-align: center;
  font-size: 2.5em;
`;

export const CategoryProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;

  @media screen and (max-width: 720px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
  }
`;
