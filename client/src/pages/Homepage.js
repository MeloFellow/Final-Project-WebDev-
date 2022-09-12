import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import { InformationContext } from "../InformationProvider";
import { useAuth0 } from "@auth0/auth0-react";
import ItemCard from "../components/ItemCard";
import HomepageItems from "../components/HomepageItems";

const Homepage = () => {
  const data = useContext(InformationContext);
  const { latestUser, setLatestUser, user } = data;

  // useEffect(() => {
  //   console.log("User in use effect", user);
  //   if (user) {
  //     console.log("inside the if");
  //     setLatestUser(user);
  //     createUserinDb(user).then((res) => {});
  //   }
  // }, []);

  // const createUserinDb = async (user) => {
  //   try {
  //     const body = {
  //       firstName: user.given_name,
  //       lastName: user.family_name,
  //       email: user.email,
  //     };
  //     const rawRes = await fetch("/api/create-user", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(body),
  //     });
  //     const res = await rawRes.json();
  //     console.log("res", res);
  //   } catch (err) {
  //     console.log(err, "Error");
  //   }
  // };

  return (
    <Wrapper>
      <HomepageItems></HomepageItems>
    </Wrapper>
  );
};
const Image = styled.img`
  height: 500px;
  width: auto;
`;

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
