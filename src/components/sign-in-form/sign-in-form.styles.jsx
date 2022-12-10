import styled from "styled-components";

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  h2 {
    margin: 10px 0;
  }

  .buttons-container {
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 410px) {
      flex-direction: column;
      gap: 10px;
    }
  }

  @media screen and (max-width: 720px) {
    width: 90%;
  }
`;

// .sign-up-container {
//   display: flex;
//   flex-direction: column;
//   width: 380px;

//   h2 {
//     margin: 10px 0;
//   }

//   .buttons-container {
//     display: flex;
//     justify-content: space-between;
//   }
// }
