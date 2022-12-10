import styled from "styled-components";
import Button from "../button/button.component";

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  h2 {
    margin: 10px 0;
  }

  @media screen and (max-width: 720px) {
    width: 90%;
  }
`;

export const SignUpButton = styled(Button)`
  @media screen and (max-width: 720px) {
    width: 100%;
  }
`;

// .sign-up-container {
//   display: flex;
//   flex-direction: column;
//   width: 380px;

//   h2 {
//     margin: 10px 0;
//   }
// }
