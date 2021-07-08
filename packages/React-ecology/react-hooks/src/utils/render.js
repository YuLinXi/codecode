import React from "react";
import ReactDOM from "react-dom";
import App from "../App";

import shares from "./share";

function render() {
  shares.stateIndex = 0;
  shares.effectIndex = 0;
  shares.reducerIndex = 0;
  ReactDOM.render(<App />, document.getElementById("root"));
}

export default render;
