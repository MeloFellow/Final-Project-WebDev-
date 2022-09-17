import React from "react";
import styled from "styled-components";
import BannerImage from "../assets/pexels-vlada-karpovich-4050315.jpg";
const HomepageBanner = () => {
  return (
    <>
      <Wrapper>
        <Text>Find Anything & Everything!</Text>
        <Image src={BannerImage} alt="Banner Image"></Image>
      </Wrapper>
    </>
  );
};

export default HomepageBanner;

const Text = styled.h1`
  color: white;
  font-family: var(--font-family);
  font-size: 2.5em;
  margin-right: 5%;
  text-align: center;
  margin-top: auto;
  margin-bottom: auto;
`;

const Image = styled.img`
  height: 100%;
  box-shadow: 1px 10px 15px rgba(0, 0, 0, 0.2);
  /* width: auto; */
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 20vh;
  width: 99vw;
  background: linear-gradient(to right, #1d3557ff, #457b9dff);
  margin-bottom: 15px;
  margin-top: -1%;
`;
