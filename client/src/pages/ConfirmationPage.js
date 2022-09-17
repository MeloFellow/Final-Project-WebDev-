import vectorIlu from "../assets/undraw_relaxation_re_ohkx.svg";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
const ConfirmationPage = () => {
  const image = vectorIlu;
  const { _id } = useParams();
  const goToItem = () => {
    history.push(`/items/${_id}`);
  };
  const history = useHistory();
  return (
    <Wrapper>
      <TextWrapper>
        <Congrats>Congrats! You've successfully posted your item :)</Congrats>
        <br></br>
        <ClickHere>Click here to see what your post looks like.</ClickHere>
        <GotoItem onClick={goToItem}>Follow Me!</GotoItem>
      </TextWrapper>
      <Image alt="" src={image}></Image>
    </Wrapper>
  );
};

const GotoItem = styled.button`
  width: 50%;
  height: 35px;
  border: none;
  border-radius: 10px;
  font-size: 1.2em;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 500;
  color: #fff;
  background-color: #e63946ff;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
`;

const Image = styled.img`
  width: 60%;
  height: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 4%;
  text-align: center;
  max-width: 80%;
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
const Congrats = styled.h1``;
const ClickHere = styled.h1``;

export default ConfirmationPage;
