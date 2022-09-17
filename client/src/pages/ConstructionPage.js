import image from "../assets/page under construction.jpg";

import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
const ConstructionPage = () => {
  const history = useHistory();
  return (
    <Wrapper>
      <TextWrapper>
        <SorryMessage>
          Sorry, this page is still under construction :(
        </SorryMessage>
      </TextWrapper>
      <Image alt="" src={image}></Image>
    </Wrapper>
  );
};

const Image = styled.img`
  width: 60%;
  height: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2%;
  text-align: center;
  max-width: 80%;
  justify-content: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
  margin-right: 4%;
  justify-items: center;
  justify-content: center;
`;
const SorryMessage = styled.h1`
  font-size: 2em;
`;
const ClickHere = styled.h1``;

export default ConstructionPage;
