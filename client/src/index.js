import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ServiceWorker from "./ServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
ServiceWorker();
