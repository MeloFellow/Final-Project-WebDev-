import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { InformationContext } from "../InformationProvider";
import { useAuth0 } from "@auth0/auth0-react";
import ItemCard from "../components/ItemCard";
import HomepageItems from "../components/HomepageItems";

const Homepage = () => {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  const data = useContext(InformationContext);
  const { latestUser, setLatestUser } = data;
  setLatestUser(user);

  useEffect(() => {
    console.log("User in use effect", user);
    if (user) {
      createUserinDb(user).then((res) => {});
    }
  }, [latestUser]);

  const createUserinDb = async (user) => {
    const result = new Promise((resolve, reject) => {
      try {
        const body = {
          firstName: user.given_name,
          lastName: user.family_name,
          email: user.email,
        };

        fetch("/api/create-user", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then(function (res) {
            return res.json();
          })
          .then((data) => resolve(data));
      } catch (err) {
        console.log(err, "Error");
        reject(err);
      }
    });
    return result;
  };

  return (
    <Wrapper>
      <Container>
        <Header />
      </Container>
      <HomepageItems></HomepageItems>
      <Footer></Footer>
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

export default Homepage;
