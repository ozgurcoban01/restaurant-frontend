import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/app/store.js";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { consumerTheme } from "./consumerTheme.js";


ReactDOM.createRoot(document.getElementById("root")).render(

   <Provider store={store}>
    
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

);
