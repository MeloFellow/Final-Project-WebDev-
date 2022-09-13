import { useHistory } from "react-router-dom";
import styled from "styled-components";
import search from "../assets/view.svg";

const ProfileItemCard = ({ itemInformation }) => {
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
          <Description>{itemInformation.description}</Description>
        </NameWrapper>
      </ProductCardWrapper>
    </Wrapper>
  );
};
const Description = styled.h2`
  margin-top: 3%;
  max-width: 80%;
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3%;
  width: 80%;
`;

const OverlayIcon = styled.img`
  width: 50px;
  height: 50px;
  z-index: 9999;
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
  justify-content: right;
`;

const SearchButton = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: none;
  margin: 8px;
  transition: 0.2s ease;
  z-index: 9999;
  background-color: #a8dadcff;
  &:hover {
    cursor: pointer;
    background-color: white;
    transform: scale(1.1);
    z-index: 9999;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 25%;
  max-width: 40%;
  height: 100%;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

const Overlay = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--hover-white);
  opacity: 1;
  z-index: 1;
  border-radius: 7px;
  transition: 0.3s ease;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-left: 5%;
  border: 3px solid #a8dadcff;
  border-radius: 20px;
  margin-bottom: 2%;

  &:hover ${Overlay} {
    opacity: 0.5;
    background-color: #a8dadcff;
  }

  &:hover ${SearchButton} {
    background-color: white;
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

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ProductCardWrapper = styled.span`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding: 4%;
  box-sizing: border-box;
  border: 1px solid var(--lightest-grey);
  border-radius: 7px;
  background-color: #fff;
`;

export default ProfileItemCard;
