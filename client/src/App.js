import logo from "./logo.svg";
import Header from "./components/Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import styled from "styled-components";
import Categories from "./pages/Categories";
import GlobalStyles from "./GlobalStyles";
import SimpleRegistration from "./pages/SimpleRegistration";

import "./App.css";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Wrapper>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/category/:categoryName">
            <Categories />
          </Route>
          <Route exact path="/registration">
            <SimpleRegistration />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default App;
