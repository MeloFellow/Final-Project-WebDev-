import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import ItemCard from "../components/ItemCard";
import styled from "styled-components";

const Categories = () => {
  let { category } = useParams();
  const [category1, setCategory1] = useState();
  const [productArray, setProductArray] = useState();
  const [isLoaded, setLoaded] = useState(false);
  console.log("Category", category);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`/api/get-${category}`);
      console.log("RESPONSE", response);
      const result = await response.json();
      console.log("RESULT", result);
      setProductArray(result.data);
      setLoaded(true);
    };
    fetchItems();
  }, [category]);

  return (
    // <></>
    <>
      <BiggerWrapper>
        <Wrapper>
          {isLoaded ? (
            productArray.map((itemInformation, index) => {
              return <ItemCard itemInformation={itemInformation} key={index} />;
            })
          ) : (
            <></>
          )}
        </Wrapper>
      </BiggerWrapper>
    </>
  );
};

const BiggerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  margin-bottom: 60px;
`;

export default Categories;
