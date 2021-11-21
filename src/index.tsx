//-----------------Basic imports--------------------------------
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./scss/style.scss";

//-----------------Libraries--------------------------------
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

//-----------------Redux store------------------------------
import configureStore from "./redux/store";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

export default store;
