import { useContext, useState } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { InformationContext } from "../InformationProvider";
import styled from "styled-components";
import NumeloLogo from "../assets/NumeloLogo.jpg";
import { FaUserAlt } from "react-icons/fa";
import LoginButton from "./LoginButton";

const Header = () => {
  const data = useContext(InformationContext);

  const { latestUser, logout, currentUserId } = data;
  const pathname = window.location.pathname;
  console.log("PATH NAME", pathname);

  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  const searchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <Wrapper>
      <Link to="/">
        <ImageLogo src={NumeloLogo} />
      </Link>
      <Navigation>
        <LinkDiv>
          <StyledLink to="/category/all">All</StyledLink>
          <StyledLink
            to={`/category/realestate`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Real Estate
          </StyledLink>

          <StyledLink
            to={`/category/vehicles`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Vehicles
          </StyledLink>

          <StyledLink
            to={`/category/tools`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Tools
          </StyledLink>

          <StyledLink
            to={`/category/toys`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Toys
          </StyledLink>
        </LinkDiv>
        <SearchContainer>
          <SearchInput
            placeholder="Search product here"
            onChange={searchChange}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                history.push(`/search/${searchText}`);
                window.location.reload();
              }
            }}
          />
          <SearchButton onClick={() => history.push(`/search/${searchText}`)} />
        </SearchContainer>
        {latestUser ? (
          <>
            {/* <FontAwesomeIcon icon={faEnvelope} /> */}
            <Dropdown>
              <DropdowButton onClick={() => console.log("Im here")}>
                <FaUserAlt
                  color="#457b9dff"
                  background-color="yellow"
                  size={30}
                  icon="fa-solid fa-user fa-lg fa-3x"
                />

                <DropdownContentWrapper>
                  <DropDownContent to={`/profile/${currentUserId}`}>
                    Profile
                  </DropDownContent>
                  <DropDownContent to={"/profile"}>Messages</DropDownContent>
                  <DropDownContent onClick={() => logout()} to={"/"}>
                    Logout
                  </DropDownContent>
                </DropdownContentWrapper>
              </DropdowButton>
            </Dropdown>
            {pathname !== "/postad" ? (
              <Link to={"/postad"}>
                <PostAd>Post Ad</PostAd>
              </Link>
            ) : (
              <></>
            )}
          </>
        ) : (
          // <Link to={"/profile"}>
          // </Link>
          <LoginButton></LoginButton>
          // <Icon>
          //   <FaUserAlt />
          // </Icon>
        )}
      </Navigation>
    </Wrapper>
  );
};

const PostAd = styled.button`
  width: 120%;
  height: 30px;
  border: none;
  border-radius: 10px;
  font-size: 1.2em;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 500;
  color: #fff;
  background-color: #e63946ff;
  cursor: pointer;
`;

const DropdownContentWrapper = styled.div`
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  &:hover {
    display: block;
  }
`;

const DropdowButton = styled.button`
  /* background-color: #04aa6d; */
  width: 45%;
  height: auto;
  border-radius: 50%;
  margin-left: 5%;
  color: black;
  border: none;
  z-index: 999;
  &:hover {
    ${DropdownContentWrapper} {
      display: block;
    }
  }
`;

const DropDownContent = styled(NavLink)`
  display: block;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 1.2em;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: #a8dadcff;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 10px;
  width: 80%;
  height: 40px;
  margin-left: auto;
  margin-right: auto;
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LinkDiv = styled.div`
  margin-right: 20px;
  margin-top: 9px;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: var(--primary-color);
  font-family: var(--font-family);
  margin-left: 16px;
  letter-spacing: -0.05em;
  display: inline-block;
  font-weight: 400;

  &::after {
    content: "";
    display: block;
    margin-top: 10px;
  }

  &:hover {
    color: var(--pink);
  }

  &.active {
    font-weight: 700;
  }

  &.active::after {
    content: "";
    display: block;
    margin-top: 7px;
    margin-left: auto;
    margin-right: auto;
    width: 75%;
    height: 3px;
    background-color: var(--pink);
  }
  &.active:hover {
    color: var(--primary-color);
  }
`;

const ImageLogo = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 8px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 260px;
  height: 40px;
  border: 1px solid var(--border);
  position: relative;
`;

const SearchInput = styled.input`
  width: 220px;
  text-indent: 12px;
  color: black;
  border-radius: none;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  outline: none;
  font-size: 14px;
  font-family: var(--font-family);

  &::placeholder {
    color: var(--light-grey);
  }
`;

const SearchButton = styled.button`
  width: 40px;
  height: 100%;
  overflow: hidden;
  border: none;
  background: #fff
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat center;
  cursor: pointer;
`;

export default Header;
