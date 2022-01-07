import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Profile from "./pages/Profile";
import SoldItem from "./components/SoldItem";
import SoldItemList from "./components/SoldItemList";
import Blog from "./pages/Blog";
import MonthYear from "./components/Blog/MonthYear";
import Year from "./components/Blog/Year";
import UserPosts from "./components/Blog/UserPosts";

function App() {
  return (
    <Layout>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/archive' element={<SoldItemList />} />
            <Route path='/archive/:soldItemId' element={<SoldItem />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/posts/:year/:month' element={<MonthYear />} />
            <Route path='/blog/posts/:year' element={<Year />} />
            <Route path='/blog/posts/users/:userId' element={<UserPosts />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            {/* <Route path='/signup' element={<Signup />} /> */}
        </Routes>
    </Layout>
  );
}

export default App;
