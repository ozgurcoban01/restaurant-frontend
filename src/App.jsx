import { useEffect, useState } from "react";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";

import { fetchMenu } from "./redux/features/menuSlice";

import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { consumerTheme } from "./consumerTheme";
import Consumer from "./components/Consumer";
import EnterName from "./components/consumerComponents/EnterName";
import ConsumerSelect from "./components/consumerComponents/ConsumerSelect";
import ScanQR from "./components/consumerComponents/ScanQR";
import Test from "./components/kitchenComponents/Test";
import ConsumerMenuK from "./components/kitchenComponents/ConsumerMenu";
import ConsumerDrawer from "./components/consumerComponents/ConsumerDrawer";
import ConsumerMenu from "./components/consumerComponents/ConsumerMenu";
import AdminPanel from "./components/kitchenComponents/AdminPanel";

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
          <Route path="consumer" >
            <Route path="scanQR" element={<ScanQR />} />
            <Route path="menu/:consumerId" element={<ConsumerMenu />} />
            <Route path="enterName" element={<EnterName />} />
            <Route path="consumerSelect/:consumerId" element={<ConsumerSelect />} />
          </Route>
          <Route path="kitchen" >
            <Route path="admin" element={<AdminPanel />} />
            <Route path="test" element={<Test />} />
            <Route path="menu" element={<ConsumerDrawer />} />
         </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
