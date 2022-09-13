import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import ItemCard from "../components/ItemCard";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";

const Categories = () => {
  let { category } = useParams();
  const [productArray, setProductArray] = useState();
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`/api/get-${category}`);
      const result = await response.json();
      setProductArray(result.data);
      setLoaded(true);
    };
    fetchItems();
  }, [category]);

  return (
    <>
      <BiggerWrapper>
        <Wrapper>
          {isLoaded ? (
            productArray.map((itemInformation, index) => {
              return <ItemCard itemInformation={itemInformation} key={index} />;
            })
          ) : (
            <LoadingSpinnerWrapper>
              <LoadingSpinner />
            </LoadingSpinnerWrapper>
          )}
        </Wrapper>
      </BiggerWrapper>
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
