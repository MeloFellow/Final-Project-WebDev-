import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

const ItemDetailPage = () => {
  const [specificProduct, setSpecificProduct] = useState([]);
  const [error, SetError] = useState();
  const history = useHistory();
  const { _id } = useParams();
  console.log("id in params", _id);
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    console.log("Hello im on");
    const getProductInfo = async () => {
      const response = await fetch(`/api/get-item/${_id}`);
      const result = await response.json();
      console.log("Product Response", result);
      setSpecificProduct(result.data);
      result.status !== 200 && SetError(result.message);
      setLoaded(true);
    };
    getProductInfo();
  }, []);

  console.log("item page product", specificProduct.imageSrc);

  return (
    <>
      {isLoaded ? (
        <Wrapper>
          <ItemWrapper>
            <ItemImage
              src={`../images/${specificProduct.imageSrc}`}
            ></ItemImage>
            <NameWrapper>
              <Name>{specificProduct.name} - </Name>
              <Category>{specificProduct.category}</Category>
            </NameWrapper>
            <Price>${specificProduct.price}</Price>
            <ConditionWrapper>
              <ConditionTag>Condition:</ConditionTag>
              <Condition> {specificProduct.condition}</Condition>
            </ConditionWrapper>
            <Description>{specificProduct.description}</Description>
            <Location>{specificProduct.location}</Location>
            <Mileage>{specificProduct.mileage}</Mileage>
            <Year>{specificProduct.year}</Year>
            <Size>{specificProduct.size}</Size>
          </ItemWrapper>
        </Wrapper>
      ) : (
        <></>
      )}
    </>
  );
};

const ConditionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2%;
`;

const ConditionTag = styled.h1`
  font-size: 1.4em;
  margin-right: 2%;
`;

const NameWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  width: 100%;
  margin-top: 5%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 5%;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.h1`
  font-size: 2em;
`;

const Category = styled.h2`
  font-size: 2em;
  color: #a8dadcff;
`;

const Condition = styled.h2``;

const Price = styled.h2`
  font-size: 1.8em;
  margin-top: 2%;
`;
const Year = styled.h2`
  margin-top: 2%;
`;
const Size = styled.h2`
  margin-top: 2%;
`;
const Mileage = styled.h2`
  margin-top: 2%;
`;
const Description = styled.h2`
  margin-top: 2%;
`;
const Location = styled.h2`
  margin-top: 2%;
`;

const ItemImage = styled.img`
  width: 60%;
`;

export default ItemDetailPage;
