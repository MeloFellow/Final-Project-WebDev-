import React, { useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import Message from "./Message";
import { InformationContext } from "../InformationProvider";
const ItemDetailPage = () => {
  const data = useContext(InformationContext);
  const { profileInfo } = data;
  console.log("PROFILE INFO", profileInfo);
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
  }, [_id]);

  console.log("item page product", specificProduct);

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
                <Name>{specificProduct.name}</Name>
                {/* <Category>{specificProduct.category}</Category> */}
              </NameWrapper>
              <Price>${specificProduct.price}</Price>
              {specificProduct.condition !== undefined ? (
                <TextWrapper>
                  <LabelTag>Condition:</LabelTag>
                  <Condition> {specificProduct.condition}</Condition>
                </TextWrapper>
              ) : (
                <></>
              )}
              {/* <TextWrapper>
                <LabelTag>Condition:</LabelTag>
                <Condition> {specificProduct.condition}</Condition>
              </TextWrapper> */}
              <TextWrapper>
                <LabelTag>Description:</LabelTag>
                <Description>{specificProduct.description}</Description>
              </TextWrapper>
              <TextWrapper>
                <LabelTag>Location:</LabelTag>
                <Location>{specificProduct.location}</Location>
              </TextWrapper>
              {specificProduct.mileage !== undefined ? (
                <TextWrapper>
                  <LabelTag>Mileage:</LabelTag>
                  <Mileage>{specificProduct.mileage}</Mileage>
                </TextWrapper>
              ) : (
                <></>
              )}
              {specificProduct.year !== undefined ? (
                <TextWrapper>
                  <LabelTag>Year:</LabelTag>
                  <Year>{specificProduct.year}</Year>
                </TextWrapper>
              ) : (
                <></>
              )}
              {specificProduct.size !== undefined ? (
                <TextWrapper>
                  <LabelTag>Size:</LabelTag>
                  <Size>{specificProduct.size}</Size>
                </TextWrapper>
              ) : (
                <></>
              )}
            </ContentWrapper>
            <MessageWrapper>
              <Message
                profileId={profileInfo.firstName}
                idOfAd={specificProduct._id}
              ></Message>
            </MessageWrapper>
            {/* <Form action="mailto:adf.demelo@gmail.com" method="POST">
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
            </Form> */}
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
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 3%; */
  width: 20%;
`;

// const Message = styled.h2``;
const ImageWrapper = styled.div`
  display: flex;
  width: 50%;
  align-items: right;
  justify-content: center;
  /* box-shadow: 1px 10px 15px rgba(0, 0, 0, 0.2); */
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-top: 2%;
  justify-content: center;
  /* box-shadow: 3px 1px 10px 15px rgba(0, 0, 0, 0.2); */
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  margin-top: 5px; ;
`;

const LabelTag = styled.h1`
  font-size: 1.2em;
  margin-right: 2%;
  margin-top: 1%;
  color: #457b9dff;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 5%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin-top: 5%;
  margin-bottom: 5%;
  /* height: 100%; */
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
  font-size: 1.3em;
  color: #1d3557ff;
`;

const Price = styled.h2`
  font-size: 1.8em;
  margin-top: 1%;
`;
const Year = styled.h2`
  margin-top: 1%;
`;
const Size = styled.h2`
  margin-top: 1%;
`;
const Mileage = styled.h2`
  margin-top: 1%;
`;
const Description = styled.h2`
  margin-top: 1%;
`;
const Location = styled.h2`
  margin-top: 1%;
`;

const ItemImage = styled.img`
  width: 80%;
  height: auto;
  align-items: right;
  justify-content: right;
`;

export default ItemDetailPage;
