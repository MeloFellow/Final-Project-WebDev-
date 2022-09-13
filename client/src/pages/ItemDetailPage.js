import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

const ItemDetailPage = () => {
  const [specificProduct, setSpecificProduct] = useState([]);
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
            <ImageWrapper>
              <ItemImage
                src={`../images/${specificProduct.imageSrc}`}
              ></ItemImage>
            </ImageWrapper>

            <ContentWrapper>
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
            </ContentWrapper>
            <Form action="mailto:adf.demelo@gmail.com" method="POST">
              <MessageWrapper>
                <Message>Message: This Person</Message>
                <input
                  name="subject"
                  type="text"
                  value="I am interested in your Ad"
                />
                <MessageBox name="body"></MessageBox>
                <MessageButton type="submit" value="Send">
                  Send Message
                </MessageButton>
              </MessageWrapper>
            </Form>
          </ItemWrapper>
        </Wrapper>
      ) : (
        <></>
      )}
    </>
  );
};

const Form = styled.form`
  /* background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 20px;
  width: 30%;
  margin-left: auto;
  margin-right: auto; */
`;

const MessageButton = styled.button`
  width: 100%;
  height: 10%;
  color: white;
  font-size: 1.3em;
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background: #e63946ff;
  border-radius: 6px;
  transition: all 0.3s cubic-bezier(0.67, 0.17, 0.4, 0.83);
  :hover {
    cursor: pointer;
  }
`;

const MessageBox = styled.textarea`
  height: 50%;
  width: 150%;
  border-radius: 10px;
  resize: none;
  font-size: 1em;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 3%;
`;

const Message = styled.h2``;
const ImageWrapper = styled.div`
  display: flex;
  width: 50%;
  align-items: right;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  margin-top: 2%;
  justify-content: center;
`;

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
  align-items: center;
  width: 100%;
  margin-top: 5%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin-top: 5%;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Name = styled.h1`
  font-size: 1.8em;
`;

const Category = styled.h2`
  font-size: 1.8em;
  color: #a8dadcff;
`;

const Condition = styled.h2`
  font-size: 1.4em;
  color: #a8dadcff;
`;

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
  width: 55%;
  height: auto;
  align-items: right;
  justify-content: right;
`;

export default ItemDetailPage;
