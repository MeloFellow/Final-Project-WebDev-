import Header from "../components/Header";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { InformationContext } from "../InformationProvider";

const LoginButton = () => {
  const data = useContext(InformationContext);

  const { latestUser, setLatestUser } = data;

  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();

  setLatestUser(user);

  const loginUser = user;

  window.localStorage.setItem("user", loginUser);

  const handleLogin = () => {
    loginWithRedirect({
      redirect_uri: "http://localhost:3000/",
    }).then((res) => console.log("RESPONSE", res));
  };

  return (
    <Wrapper>
      <Login onClick={() => handleLogin()}>Login</Login>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Login = styled.button`
  width: 100%;
  height: 55px;
  border: none;
  border-radius: 5px;
  font-size: 17px;
  font-weight: 600;
  color: #fff;
  background-color: #1859c9;
  cursor: pointer;
`;

export default LoginButton;
