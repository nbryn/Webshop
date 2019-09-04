import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ServiceWorker from "./ServiceWorker";
import "./index.css";

ReactDOM.render(<App />, document.getElementById("root"));
ServiceWorker();
