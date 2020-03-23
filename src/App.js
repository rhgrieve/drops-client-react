import React from "react";
import "./App.css";

import { Container } from "semantic-ui-react";

import MainMenu from "./components/MainMenu";
import DropsView from "./components/DropsView";

function App() {
  return (
    <div className="appContainer">
      <MainMenu />
      <Container>
        <DropsView />
      </Container>
    </div>
  );
}

export default App;
