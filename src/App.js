import React from "react";
import { StoreProvider } from "easy-peasy";
import store from "./store";

// components
import Navbar from "./page/Navbar";
import Home from "./page/Home";
// import Floating_Button from "./components/Floating_Button";

import "./App.css";

function App() {
  return (
    <StoreProvider store={store}>
      <div className="App">
        <Navbar />
        <Home />
        {/* <Floating_Button /> */}
      </div>
    </StoreProvider>
  );
}

export default App;
