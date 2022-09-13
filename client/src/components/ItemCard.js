import { useHistory } from "react-router-dom";
import styled from "styled-components";

import search from "../assets/view.svg";

const ItemCard = ({ itemInformation }) => {
  const history = useHistory();

  const _id = itemInformation._id;

  const goToItem = () => {
    history.push(`/items/${_id}`);
  };

  return (
    <Wrapper>
      <Overlay>
        <ButtonWrapper>
          <SearchButton>
            <OverlayIcon onClick={goToItem} src={search}></OverlayIcon>
          </SearchButton>
        </ButtonWrapper>
      </Overlay>

      <ProductCardWrapper>
        <UpperContainer>
          <ImageWrapper>
            <ItemImage src={`/images/${itemInformation.imageSrc}`}></ItemImage>
          </ImageWrapper>
          <NameWrapper>
            <ItemName>{itemInformation.name}</ItemName>
            <ItemDescription>{itemInformation.condition}</ItemDescription>
            <Category>{itemInformation.category}</Category>
            <Line />
            <PriceWrapper>
              <Price>${itemInformation.price}</Price>
            </PriceWrapper>
          </NameWrapper>
        </UpperContainer>
        <LowerContainer></LowerContainer>
      </ProductCardWrapper>
    </Wrapper>
  );
};

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const OverlayIcon = styled.img`
  width: 50px;
  height: 50px;
  z-index: 9999;
`;

const UpperContainer = styled.div`
  margin-bottom: -50px;
`;

const LowerContainer = styled.div`
  margin-top: -50px;
`;

const Line = styled.div`
  width: 80%;
  border-bottom: 1px solid #a8dadcff;
  margin: 5px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SearchButton = styled.button`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: none;
  margin: 8px;
  transition: 0.2s ease;
  z-index: 9999;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    z-index: 9999;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 180px;
`;

const Overlay = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--hover-black);
  opacity: 0;
  z-index: 1;
  border-radius: 7px;
  transition: 0.3s ease;
`;

const Wrapper = styled.div`
  position: relative;
  width: 300px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &:hover ${Overlay} {
    opacity: 0.5;
    background-color: #a8dadcff;
  }
`;

const Category = styled.h2`
  font-family: var(--font-family);
  font-weight: 900;
  color: #457b9dff;
  margin-top: 3%;
`;

const Price = styled.h1`
  font-family: var(--font-family);
  font-weight: 700;
`;

const ItemDescription = styled.h2`
  width: 228px;
  color: black;
  font-family: var(--font-family);
  font-weight: 400;
  line-height: 125%;
  margin-top: 10px;
`;
const ItemName = styled.h1`
  font-family: var(--font-family);
  font-weight: 700;
  margin-top: 20px;
`;

const ItemImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ProductCardWrapper = styled.span`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 8%;
  box-sizing: border-box;
  border: 1px solid var(--lightest-grey);
  border-radius: 7px;
  background-color: #fff;
`;

export default ItemCard;
