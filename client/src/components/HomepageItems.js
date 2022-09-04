import React from "react";
import styled from "styled-components";
import ItemCard from "./ItemCard";
import { InformationContext } from "../InformationProvider";

import { useContext, useState } from "react";

const HomepageItems = () => {
  const data = useContext(InformationContext);
  const { allItems, setAllItems } = data;

  const load = true;

  console.log("All items on homepage", allItems);

  return (
    <Wrapper>
      {load ? (
        allItems.map((itemInformation, index) => {
          return <ItemCard itemInformation={itemInformation} key={index} />;
        })
      ) : (
        <></>
      )}
      )
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  margin-bottom: 60px;
`;

export default HomepageItems;
