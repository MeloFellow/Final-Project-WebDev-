import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import { InformationContext } from "../InformationProvider";

const LoginButton = () => {
  const data = useContext(InformationContext);

  const { setLatestUser } = data;

  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();

  useEffect(() => {
    setLatestUser(user);
  }, [user]);

  const handleLogin = () => {
    loginWithRedirect({
      redirect_uri: "http://localhost:3000/",
    })
      .then((res) => console.log("RESPONSE", res))
      .then(window.localStorage.setItem("user", user));
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
  width: 50%;
  height: 30px;
  border: none;
  border-radius: 10px;
  font-size: 17px;
  font-weight: 600;
  color: #fff;
  background-color: #e63946ff;
  cursor: pointer;
`;

export default LoginButton;
