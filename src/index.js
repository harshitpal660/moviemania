import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Components/App";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <Router>
    <Provider store={store}>
      <Toaster/>
      <App />
    </Provider>
  </Router>
    

);
