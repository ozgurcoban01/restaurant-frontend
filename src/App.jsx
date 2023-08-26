import { useEffect, useState } from "react";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";

import { fetchMenu } from "./redux/features/menuSlice";

import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { consumerTheme } from "./consumerTheme";
import Consumer from "./components/Consumer";

function App() {
  const counter = useSelector((state) => state.counter.value);
  const menu = useSelector((state) => state.menu.menu);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMenu());
  }, []);

  return (
    <>
     <ThemeProvider theme={consumerTheme}>
      <Routes>
       
          <Route path="consumer" element={<Consumer/>} />
      
      </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
