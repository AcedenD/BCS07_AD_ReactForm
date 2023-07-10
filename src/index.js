import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import css
import "./index.css";

// import Provider
import { Provider } from "react-redux";
// import store
import { store } from "./redux/configStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
