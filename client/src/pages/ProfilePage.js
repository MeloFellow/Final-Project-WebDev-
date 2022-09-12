import React from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import testimage from "../assets/NumeloLogo.jpg";
import nolisting from "../assets/Nolistings.jpg";
import ProfileItems from "../components/ProfileItems";
import { InformationContext } from "../InformationProvider";
import { useContext, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
const ProfilePage = () => {
  const imageSrc = testimage;
  const noListing = nolisting;
  const data = useContext(InformationContext);
  const { latestUser } = data;
  console.log("Latest User", latestUser);
  return (
    <Container>
      <PageContentWrapper>
        <ProfileContent>
          <ProfilePhoto>
            <UserIcon />
          </ProfilePhoto>
          {latestUser.email_verified ? (
            <Verified>Verified</Verified>
          ) : (
            <Unverified>Unverified</Unverified>
          )}
          <Name>{latestUser.name}</Name>
          <Email>{latestUser.email}</Email>
          {/* <PhoneNumber>514-574-0753</PhoneNumber> */}
          <EditProfile>Edit Profile</EditProfile>
        </ProfileContent>

        {/* <MyAds>
          <NoListingSection>
            <NoListingImage src={noListing}></NoListingImage>
            <NoAdsFound>No Listings Found :( </NoAdsFound>
            <StyledLink to={"/postad"}>
              <PostAnAd>Click Here To Post An Ad Now! </PostAnAd>
            </StyledLink>
          </NoListingSection>
        </MyAds> */}
        <ProfileItems></ProfileItems>
      </PageContentWrapper>
      {/* <MyMessages></MyMessages> */}
    </Container>
  );
};

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: var(--primary-color);
  font-family: var(--font-family);
  margin-left: 16px;
  letter-spacing: -0.05em;
  display: inline-block;
  font-weight: 400;

  &:hover {
    color: var(--pink);
  }
`;
const Unverified = styled.h1``;

const Verified = styled.h1``;

const UserIcon = styled(FaUserAlt)`
  font-size: 100px;
  color: #457b9dff;
  border-radius: 50%;
  border: solid 3px;
  padding: 3%;
  transition: ease-in-out 0.2s;
`;

const NoAdsFound = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 4%;
`;
const PostAnAd = styled.button`
  width: 100%;
  font-size: 1.6rem;
  color: #457b9dff;
  background-image: linear-gradient(144deg, #5b42f3 30%, #00ddeb);
  border: 0;
  border-radius: 12px;
  align-items: center;
  border: 0;
  border-radius: 8px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  font-family: Roboto, sans-serif;
  justify-content: center;
  max-width: 100%;
  min-width: 140px;
  padding: 19px 24px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
`;

const NoListingSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const PageContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const NoListingImage = styled.img`
  width: 60%;
  height: auto;
  /* margin-bottom: 10%; */
`;

const EditProfile = styled.button``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-left: 2%;
  margin-right: 2%;
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #457b9dff;
  width: 30%;
  height: 30vh;
  align-items: center;
  margin-top: 10%;
  border-radius: 15px;
`;
const Name = styled.h1`
  color: #1d3557ff;
  background-color: var(--imperial-red);
  margin-bottom: 5%;
  font-size: 1.4rem;
`;
const ProfilePhoto = styled.div`
  margin-top: 10%;
  border-radius: 50%;
  /* border: solid 1px; */
  /* width: 100px; */
  /* height: 100px; */
  margin-bottom: 5%;
  /* align-items: center; */
`;
const Email = styled.h2`
  margin-bottom: 5%;
  color: #1d3557ff;
`;
const PhoneNumber = styled.h2`
  margin-bottom: 10%;
  color: #1d3557ff;
`;
const MyAds = styled.div``;

const MyMessages = styled.div``;
export default ProfilePage;
