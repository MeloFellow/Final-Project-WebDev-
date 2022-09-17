import Header from "./components/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import styled from "styled-components";
import Categories from "./pages/Categories";
import GlobalStyles from "./GlobalStyles";
import SimpleRegistration from "./pages/SimpleRegistration";
import ItemDetailPage from "./pages/ItemDetailPage";
import PostAd from "./pages/PostAd";
import Message from "./pages/Message";
import "./App.css";
import ProfilePage from "./pages/ProfilePage";
import ConfirmationPage from "./pages/ConfirmationPage";
import Footer from "./components/Footer";
import SearchPage from "./pages/SearchPage";
import EditProfilePage from "./pages/EditProfilePage";
import ConstructionPage from "./pages/ConstructionPage.js";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8000");
console.log("SOCKET", socket.connected);

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppWrapper>
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <GlobalStyles />
          <Wrapper>
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route exact path="/category/:category">
                <Categories />
              </Route>
              <Route exact path="/registration">
                <SimpleRegistration />
              </Route>
              <Route exact path="/profile/:_id">
                <ProfilePage />
              </Route>
              <Route exact path="/items/:_id">
                <ItemDetailPage />
              </Route>
              <Route exact path="/postad">
                <PostAd />
              </Route>
              <Route path="/confirmed/:_id">
                <ConfirmationPage />
              </Route>
              <Route exact path="/messages">
                <ConstructionPage />
              </Route>
              <Route exact path="/search/:query">
                <SearchPage />
              </Route>
              <Route exact path="/editprofile/:_id">
                <EditProfilePage />
              </Route>
              {/* <Route exact path="/message">
                <Message />
              </Route> */}
            </Switch>
          </Wrapper>
          <Footer />
        </AppWrapper>
      </BrowserRouter>
    </>
  );
};

const HeaderWrapper = styled.div`
  max-width: 100%;
`;
const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  max-width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default App;
