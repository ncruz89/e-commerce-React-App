import styled from "styled-components";
import Button from "../button/button.component";

export const PaymentFormContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 720px) {
    height: 200px;
  }
`;

export const FormContainer = styled.form`
  height: 100px;
  min-width: 500px;
  h2 {
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
  }

  @media screen and (max-width: 720px) {
    min-width: 250px;

    p {
      font-size: 10px;
    }
  }
`;

export const PaymentButton = styled(Button)`
  margin-left: auto;
  margin-top: 30px;
`;
