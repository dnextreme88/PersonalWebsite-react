import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Profile from "./pages/Profile";
import Archive from "./pages/Archive";
import SoldItem from "./components/Archive/SoldItem";
import Blog from "./pages/Blog";
import MonthYear from "./components/Blog/MonthYear";
import Year from "./components/Blog/Year";
import Post from "./components/Blog/Post";
import Categories from "./pages/Categories";
import PostsByCategory from "./pages/PostsByCategory";
import PostsByUser from "./pages/PostsByUser";
import EditSoldItemForm from "./components/forms/EditSoldItemForm";
/* Guides */
import Guides from "./pages/Guides";
import EditGuideForm from "./components/forms/EditGuideForm";

function App() {
  return (
    <Layout>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/archive' element={<Archive />} />
            <Route path='/archive/:soldItemId' element={<SoldItem />} />
            <Route path='/archive/:soldItemId/update' element={<EditSoldItemForm />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/categories' element={<Categories />} />
            <Route path='/blog/posts/:postId/:slug' element={<Post />} />
            <Route path='/blog/posts/:year/:month' element={<MonthYear />} />
            <Route path='/blog/posts/:year' element={<Year />} />
            <Route path='/blog/posts/categories/:categoryId' element={<PostsByCategory />} />
            <Route path='/blog/posts/users/:userId' element={<PostsByUser />} />
            <Route path='/guides' element={<Guides />} />
            <Route path='/guides/:guideId/update' element={<EditGuideForm />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            {/* <Route path='/signup' element={<Signup />} /> */}
        </Routes>
    </Layout>
  );
}

export default App;
