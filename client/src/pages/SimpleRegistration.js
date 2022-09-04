import Header from "../components/Header";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { InformationContext } from "../InformationProvider";
import { useEffect } from "react";

const SimpleRegistration = () => {
  const data = useContext(InformationContext);

  const { latestUser, setLatestUser } = data;

  console.log("this is the data", data);
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();

  setLatestUser(user);
  console.log("this is the latest user", latestUser);
  console.log("user", user);
  console.log("is authenticated", isAuthenticated);
  // console.log("user", user)

  const loginUser = user;
  console.log(loginUser);
  window.localStorage.setItem("user", loginUser);

  const handleLogin = () => {
    loginWithRedirect({
      redirect_uri: "http://localhost:3000/registration",
    }).then((res) => console.log("RESPONSE", res));
  };

  return (
    <Wrapper>
      <Container>
        <Header />
      </Container>
      <button onClick={() => handleLogin()}>Login</button>
      <br></br>
      <button onClick={() => logout()}>Logout</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Container = styled.div`
  width: 80%;
`;

export default SimpleRegistration;
