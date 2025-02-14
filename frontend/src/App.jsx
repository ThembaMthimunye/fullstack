import { useEffect, useState } from "react";
import axios from "axios";
import {
  getPosts,
  getPost,
  deletePost,
  updatePost,
  createPost,
} from "./api.js";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./Pages/Contact.jsx";
import About from "./Pages/About.jsx";
import CreateBlog from "./Pages/CreateBlog.jsx";
import Home from "./Pages/Home.jsx";
import Landing from "./Pages/Landing.jsx";
import Profile from "./Pages/Profile.jsx";
import ReadBlog from "./Pages/ReadBlog.jsx";
import Layout from "./components/Layout.jsx";

function App() {
  useEffect(()=>{
    let token=sessionStorage.getItem('user')
    if(token){
      axios.defaults.headers.common['authorization']=`Bearer ${token}`
    }
  },[])
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route element={<Layout/>}>
          <Route path={"/Contact"} element={<Contact />} />
          <Route path={"/About"} element={<About />} />
          <Route path={"/CreateBlog"} element={<CreateBlog />} />
          <Route path={"/Profile"} element={<Profile />} />
          <Route path={"/Home"} element={<Home />} />
          <Route path={"/ReadBlog/:id"} element={<ReadBlog />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
