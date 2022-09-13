import styled from "styled-components";
import HomepageItems from "../components/HomepageItems";

const Homepage = () => {
  return (
    <Wrapper>
      <HomepageItems></HomepageItems>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 2%;
`;

export default Homepage;
