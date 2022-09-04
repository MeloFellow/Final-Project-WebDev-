import React from "react";
import Header from "../components/Header";
import styled from "styled-components";
import testimage from "../assets/NumeloLogo.jpg";
import nolisting from "../assets/Nolistings.jpg";
const ProfilePage = () => {
  const imageSrc = testimage;
  const noListing = nolisting;

  return (
    <Container>
      <Header></Header>
      <PageContentWrapper>
        <ProfileContent>
          <ProfilePhoto src={imageSrc}></ProfilePhoto>
          <Name>Alexandre de Melo</Name>
          <Email>adf.demelo@gmail.com</Email>
          <PhoneNumber>514-574-0753</PhoneNumber>
          <EditProfile>Edit Profile</EditProfile>
        </ProfileContent>

        <MyAds>
          <NoListingSection>
            <NoListingImage src={noListing}></NoListingImage>
            <NoAdsFound>No Listings Found :( </NoAdsFound>
            <PostAnAd>Click Here To Post An Ad Now! </PostAnAd>
          </NoListingSection>
        </MyAds>
      </PageContentWrapper>
      <MyMessages></MyMessages>
    </Container>
  );
};

const NoAdsFound = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 4%;
`;
const PostAnAd = styled.button`
  width: 50%;
  font-size: 1.6rem;
  color: #457b9dff;
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
`;

const ProfileContent = styled.span`
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
  margin-bottom: 10%;
  font-size: 1.4rem;
`;
const ProfilePhoto = styled.img`
  margin-top: 10%;
  border-radius: 50%;
  width: 75px;
  height: 75px;
  margin-bottom: 10%;
`;
const Email = styled.h2`
  margin-bottom: 10%;
  color: #1d3557ff;
`;
const PhoneNumber = styled.h2`
  margin-bottom: 10%;
  color: #1d3557ff;
`;
const MyAds = styled.div``;

const MyMessages = styled.div``;
export default ProfilePage;
