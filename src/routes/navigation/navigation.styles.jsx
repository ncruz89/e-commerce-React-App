import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  @media screen and (max-width: 720px) {
    height: 60px;
    padding: 10px;
    margin-bottom: 20px;
  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;

  @media screen and (max-width: 720px) {
    width: 50px;
    padding: 0px;
  }
  @media screen and (max-width: 300px) {
    width: 30px;
  }
`;
export const NavLinksContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 720px) {
    width: 80%;
  }

  @media screen and (max-width: 300px) {
    width: 70%;
    font-size: 0.8rem;
  }
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;

  @media screen and (max-width: 300px) {
    padding: 10px 10px;
  }
`;
