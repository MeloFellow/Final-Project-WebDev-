import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/NumeloLogo1.jpg";
import { SiFacebook, SiTwitter, SiLinkedin, SiInstagram } from "react-icons/si";

const Footer = () => {
  const otherPages = ["About", "Help", "Terms of Service", "Work for Us"];

  return (
    <Wrapper>
      <ContentContainer>
        <Logo src={logo} />
        <Pages>
          {otherPages.map((page, index) => {
            return (
              <StyledLink
                to="/other"
                key={index}
                onClick={() => window.scrollTo(0, 0)}
              >
                <li key={index}>{page}</li>
              </StyledLink>
            );
          })}
        </Pages>
        <SocialsContainer>
          <IconsWrapper>
            <FacebookIcon />
            <TwitterIcon />
            <LinkedinIcon />
            <InstagramIcon />
          </IconsWrapper>
        </SocialsContainer>
      </ContentContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  left: 0;
  bottom: 0;
  /* height: 20vh; */
  margin-top: auto;
  color: white;
  text-align: center;
  background-color: #457b9dff;
  padding: 30px 45px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #fff;
`;

const SocialsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 120px;
`;

const Logo = styled.img`
  width: auto;
  height: 120px;
  /* margin-bottom: 10px; */
`;

const FacebookIcon = styled(SiFacebook)`
  color: var(--primary-color);
  width: 25px;
  height: 25px;
  margin: 0 10px;
`;

const TwitterIcon = styled(SiTwitter)`
  color: var(--primary-color);
  width: 25px;
  height: 25px;
  margin: 0 10px;
`;

const LinkedinIcon = styled(SiLinkedin)`
  color: var(--primary-color);
  width: 25px;
  height: 25px;
  margin: 0 10px;
`;

const InstagramIcon = styled(SiInstagram)`
  color: var(--primary-color);
  width: 25px;
  height: 25px;
  margin: 0 10px;
`;

const IconsWrapper = styled.div``;

const Pages = styled.ul`
  text-align: right;
  margin-bottom: 10px;

  & li {
    font-size: 1.4em;
    color: white;
    display: inline;
    font-family: var(--font-family);
    letter-spacing: -0.05em;
    padding-left: 25px;
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: var(--primary-color);
  font-family: var(--font-family);
  letter-spacing: -0.05em;
  display: inline-block;
  font-weight: 400;
`;

export default Footer;
