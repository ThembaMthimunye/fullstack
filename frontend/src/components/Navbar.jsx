import {React,useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { SiDailydotdev } from "react-icons/si";
import { TfiWrite } from "react-icons/tfi";
import { MdContactSupport } from "react-icons/md";

// const [search,setSearch]=useState('')
const Navbar = () => {
  const navigate = useNavigate();
  function logout() {
    sessionStorage.removeItem("user");
    navigate("/");
  }

  // const filteredPages = pageData.filter((page) =>
  //   page.title.toLowerCase().includes(search.toLowerCase())
  // );
  return (
    <>
      <div className="flex px-10 py-6 text-sm font-bold text-gray-700 bg-white shadow-lg">
        <div className="flex justify-normal gap-20 items-center ">
          <Link to={"/Home"}>
            <SiDailydotdev className="text-4xl text-gray-500" />
          </Link>
          {/* <div className="flex items-center bg-gray-200 rounded-full w-[30rem] px-4">
            <CiSearch className="text-gray-500 mr-2" />
            <input
              className="w-full h-8 bg-transparent outline-none"
              placeholder="Search..."
              // value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
          </div> */}
        </div>
        <div className="flex gap-10 mx-auto max-w-7xl items-center px-4 mr-10">
      <Link to="/CreateBlog" className="flex items-center gap-2">
        <TfiWrite className="w-6 h-6" />
        <p className="text-sm">Write</p>
      </Link>
      <Link to="/Contact">
        <MdContactSupport className="w-8 h-8" />
      </Link>
      <Link
        to="/Profile"
        className="bg-gradient-to-r from-red-500 to-orange-500 rounded-full px-3.5 py-2 text-white"
      >
        T
      </Link>
      <Link
        to="/"
        onClick={logout}
        className="bg-gradient-to-r from-red-500 to-orange-500 rounded-full px-3.5 py-2 text-white"
      >
        Logout
      </Link>
    </div>
      </div>
    </>
  );
};

export default Navbar;
