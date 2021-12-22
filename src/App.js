import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/Home";
import SoldItem from "./components/SoldItem";
import SoldItemList from "./components/SoldItemList";

function App() {
  return (
    <Layout>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/archive' element={<SoldItemList />} />
            <Route path='/archive/:soldItemId' element={<SoldItem />} />
        </Routes>
    </Layout>
  );
}

export default App;
