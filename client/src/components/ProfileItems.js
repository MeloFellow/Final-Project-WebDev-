import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { InformationContext } from "../InformationProvider";
import { useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileItemCard from "./ProfileItemCard";

const ProfileItems = () => {
  const data = useContext(InformationContext);
  const { currentUserId, user } = data;
  const { _id } = useParams();
  const [profileItemArr, setProfileItemArr] = useState();
  const [isLoaded, setLoaded] = useState(false);
  console.log("DATA", user);
  console.log("Current ID", currentUserId);
  console.log("trying to add profile items");
  useEffect(() => {
    const createProfileItemsArray = async () => {
      console.log("in fucktion");
      try {
        const profileItems = await fetch(`/api/get-user-items/${_id}`);
        const ItemArrRes = await profileItems.json();
        setProfileItemArr(ItemArrRes.data);
        console.log("ITEM ARRAY", profileItemArr);
      } catch (err) {
        console.log(err, "Error");
      }
      setLoaded(true);
    };
    createProfileItemsArray();
  }, []);

  return (
    <Wrapper>
      {isLoaded ? (
        profileItemArr.map((itemInformation, index) => {
          return (
            <ProfileItemCard itemInformation={itemInformation} key={index} />
          );
        })
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 90%;
  margin-right: 3%;
`;
export default ProfileItems;
