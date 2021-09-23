import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import AppBar from "./components/AppBar";
import List from "./components/List";

const AppWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
`;

const Container = styled.div`
  margin: auto;
  width: 80%;

  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const App = () => {
  return (
    <AppWrapper>
      <Router>
        <Container>
          <AppBar />
          <Switch>
            <Route path="/" component={List} />
          </Switch>
        </Container>
      </Router>
    </AppWrapper>
  );
};

export default App;
