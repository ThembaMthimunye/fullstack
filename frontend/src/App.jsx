import { useEffect,lazy, Suspense } from "react";
import axios from "axios";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
const Contact=lazy(()=>import ("./Pages/Contact.jsx"));
const About=lazy(()=>import ("./Pages/About.jsx"));
const CreateBlog=lazy(()=>import("./Pages/CreateBlog.jsx"));
const Home =lazy(()=>import ( "./Pages/Home.jsx"));
const Landing=lazy(()=>import ( "./Pages/Landing.jsx"));
const Profile=lazy(()=>import ( "./Pages/Profile.jsx"));
const ReadBlog=lazy(()=>import ( "./Pages/ReadBlog.jsx"));
const Layout =lazy(()=>import("./components/Layout.jsx"));
const UpdatePage=lazy(()=>import ( "./Pages/UpdatePage.jsx"));

function App() {
  useEffect(() => {
    let token = sessionStorage.getItem("user");
    if (token) {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    }
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route element={<Layout />}>
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
          <Route path="/CreateBlog" element={<CreateBlog />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/update/:id" element={<UpdatePage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/ReadBlog/:id" element={<ReadBlog />} />
        </Route>
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
