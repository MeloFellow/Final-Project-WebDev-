import vectorIlu from "../assets/undraw_relaxation_re_ohkx.svg";
import styled from "styled-components";

const ConfirmationPage = () => {
  const image = vectorIlu;
  return (
    <Wrapper>
      <TextWrapper>
        <Congrats>Congrats! You've successfully posted your item :)</Congrats>
        <br></br>
        <ClickHere>Click here to see what your post looks like.</ClickHere>
        <GotoItem>Follow Me!</GotoItem>
      </TextWrapper>
      <Image alt="" src={image}></Image>
    </Wrapper>
  );
};

const GotoItem = styled.button`
  width: 60%;
`;

const Image = styled.img`
  width: 60%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 7%;
  text-align: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
  margin-right: 4%;
`;
const Congrats = styled.h1``;
const ClickHere = styled.h1``;

export default ConfirmationPage;
