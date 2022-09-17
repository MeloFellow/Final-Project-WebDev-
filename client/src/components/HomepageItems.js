import React from "react";
import styled from "styled-components";
import ItemCard from "./ItemCard";
import { InformationContext } from "../InformationProvider";
import { useContext } from "react";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const HomepageItems = () => {
  const data = useContext(InformationContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const { allItems } = data;

  useEffect(() => {
    setIsLoaded(true);
  }, [allItems]);

  return (
    <Wrapper>
      {isLoaded ? (
        allItems.map((itemInformation, index) => {
          return <ItemCard itemInformation={itemInformation} key={index} />;
        })
      ) : (
        <>
          <LoadingSpinner />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  margin-bottom: 60px;
  width: 80%;
  margin-right: auto;
  margin-left: auto;
`;

export default HomepageItems;
