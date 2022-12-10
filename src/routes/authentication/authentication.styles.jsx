import styled from "styled-components";

export const AuthenticationContainer = styled.div`
  display: flex;
  width: 850px;
  justify-content: space-between;
  margin: 30px auto;

  @media screen and (max-width: 720px) {
    flex-direction: column;
    width: unset;
    align-items: center;
    > *:first-child {
      margin-bottom: 50px;
    }
  }
`;

// .authentication-container {
//   display: flex;
//   width: 900px;
//   justify-content: space-between;
//   margin: 30px auto;
// }
