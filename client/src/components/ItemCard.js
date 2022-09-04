import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
// import cartIcon from "../assets/cart.svg";
// import viewIcon from "../assets/search.svg";
import imgSrc from "../assets/NumeloLogo.jpg";

const ItemCard = ({ itemInformation }) => {
  console.log("ITEM INFORMATION", itemInformation);

  return (
    <Wrapper>
      <Overlay>
        <ButtonWrapper>
          <CartButton>
            <OverlayIcon src={imgSrc}></OverlayIcon>
          </CartButton>

          <SearchButton>
            <OverlayIcon src={imgSrc}></OverlayIcon>
          </SearchButton>
        </ButtonWrapper>
      </Overlay>

      <ProductCardWrapper>
        <UpperContainer>
          <ImageWrapper>
            <ItemImage src={itemInformation.imageSrc}></ItemImage>
          </ImageWrapper>
          <ItemName>{itemInformation.name}</ItemName>
          <ItemDescription>{itemInformation.condition}</ItemDescription>
        </UpperContainer>
        <LowerContainer>
          <Category>{itemInformation.category}</Category>
          <Line />

          <PriceWrapper>
            <Price>{itemInformation.price}</Price>
          </PriceWrapper>
        </LowerContainer>
      </ProductCardWrapper>
    </Wrapper>
  );
};

const OverlayIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const UpperContainer = styled.div``;

const LowerContainer = styled.div``;

const Line = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--lightest-grey);
  margin: 18px 0;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CartButton = styled.button`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: none;
  margin: 8px;
  transition: 0.2s ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const SearchButton = styled.button`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: none;
  margin: 8px;
  transition: 0.2s ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
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
  width: 288px;
  height: 440px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &:hover ${Overlay} {
    opacity: 1;
  }
`;

const Category = styled.h2`
  font-family: var(--font-family);
  font-weight: 400;
  color: var(--light-grey);
  margin-top: 20px;
`;

const Price = styled.h1`
  font-family: var(--font-family);
  font-weight: 700;
`;

const ItemDescription = styled.h2`
  width: 228px;
  color: black;
  /* height: 60px; */
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

const ItemImage = styled.img``;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ProductCardWrapper = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  border: 1px solid var(--lightest-grey);
  /* box-shadow: 0px 8px 17px -3px rgba(24, 39, 75, 0.07); */
  border-radius: 7px;
  background-color: #fff;
`;

export default ItemCard;
