import Header from "./components/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import styled from "styled-components";
import Categories from "./pages/Categories";
import GlobalStyles from "./GlobalStyles";
import SimpleRegistration from "./pages/SimpleRegistration";
import ItemDetailPage from "./pages/ItemDetailPage";
import PostAd from "./pages/PostAd";
import "./App.css";
import ProfilePage from "./pages/ProfilePage";
import ConfirmationPage from "./pages/ConfirmationPage";
import Footer from "./components/Footer";
import SearchPage from "./pages/SearchPage";
import EditProfilePage from "./pages/EditProfilePage";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppWrapper>
          <Header />
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
              <Route exact path="/confirmed">
                <ConfirmationPage />
              </Route>
              <Route exact path="/search/:query">
                <SearchPage />
              </Route>
              <Route exact path="/editprofile/:_id">
                <EditProfilePage />
              </Route>
            </Switch>
          </Wrapper>
          <Footer />
        </AppWrapper>
      </BrowserRouter>
    </>
  );
};
const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default App;
