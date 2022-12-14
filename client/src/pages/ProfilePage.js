import React from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import styled from "styled-components";
import nolisting from "../assets/Nolistings.jpg";
import ProfileItems from "../components/ProfileItems";
import { InformationContext } from "../InformationProvider";
import { useContext, useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

const ProfilePage = () => {
  const noListing = nolisting;
  const data = useContext(InformationContext);
  const { latestUser } = data;
  const [isLoaded, setLoaded] = useState(false);
  const [profileInfo, setProfileInfo] = useState([]);
  console.log("Latest User", latestUser);
  const { _id } = useParams();

  useEffect(() => {
    console.log("Hello im on");
    const getProfileInfo = async () => {
      const response = await fetch(`/api/get-user-info/${_id}`);
      const result = await response.json();
      console.log("Product Response", result);
      console.log("Product Response DATA USer Info", result.data.userInfo);
      setProfileInfo(result.data.userInfo);
      setLoaded(true);
    };
    getProfileInfo();
    console.log("Profile Info", profileInfo);
  }, []);

  return (
    <>
      {isLoaded ? (
        <Container>
          <PageContentWrapper>
            <ProfileContent>
              {profileInfo.imageSrc ? (
                <PhotoWrapper>
                  <ProfilePhoto
                    src={`/images/${profileInfo.imageSrc}`}
                  ></ProfilePhoto>
                </PhotoWrapper>
              ) : (
                <PhotoWrapper>
                  <UserIcon />
                </PhotoWrapper>
              )}

              {latestUser.email_verified ? (
                <Verified>Verified</Verified>
              ) : (
                <Unverified>Unverified</Unverified>
              )}
              <Name>{profileInfo.firstName + " " + profileInfo.lastName}</Name>
              <Email>{profileInfo.email}</Email>
              <PhoneNumber>{profileInfo.phonenumber}</PhoneNumber>
              <Location>{profileInfo.location}</Location>
              <Link to={`/editprofile/${_id}`}>
                <EditProfile>Edit Profile</EditProfile>
              </Link>
            </ProfileContent>
            {profileInfo.items.length < 1 ? (
              <MyAds>
                <NoListingSection>
                  <NoListingImage src={noListing}></NoListingImage>
                  <NoAdsFound>No Listings Found :( </NoAdsFound>
                  <StyledLink to={"/postad"}>
                    <PostAnAd>Click Here To Post An Ad Now! </PostAnAd>
                  </StyledLink>
                </NoListingSection>
              </MyAds>
            ) : (
              <ProfileItems></ProfileItems>
            )}
          </PageContentWrapper>
        </Container>
      ) : (
        <LoadingSpinnerWrapper>
          <LoadingSpinner />
        </LoadingSpinnerWrapper>
      )}
    </>
  );
};

const LoadingSpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 800px;
  position: absolute;
  top: 30%;
  left: 40%;
`;

const PhotoWrapper = styled.div``;

const Location = styled.h2`
  margin-bottom: 10%;
  color: #1d3557ff;
`;

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
`;

const EditProfile = styled.button`
  margin-right: 10px;
  width: 100%;
  height: 30px;
  border: none;
  border-radius: 10px;
  font-size: 1.2em;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 500;
  color: #fff;
  background-color: #e63946ff;
  cursor: pointer;
`;

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
  width: 35%;
  height: 300px;
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
const ProfilePhoto = styled.img`
  margin-top: 10%;
  border-radius: 50%;
  border: solid 3px #a8dadcff;
  padding: 3px;
  width: 90px;
  height: 90px;
  margin-bottom: 5%;
  transition: ease-in-out 0.2s;
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

export default ProfilePage;
