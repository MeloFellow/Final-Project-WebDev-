import styled from "styled-components";
import HomepageItems from "../components/HomepageItems";
import HomepageBanner from "../components/HomepageBanner";
const Homepage = () => {
  return (
    <Wrapper>
      <HomepageBanner></HomepageBanner>
      <HomepageItems></HomepageItems>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  width: 100%;
  margin-top: 2%;
`;

export default Homepage;
