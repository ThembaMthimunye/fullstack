import React from "react";
import { Link } from "react-router-dom";
import { pageData } from "../assets/PageData/Pagedata";
import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { CiTwitter } from "react-icons/ci";
import { FaDribbble } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";


const Navbar = () => {
  const navigate = useNavigate();
  function logout() {
    sessionStorage.removeItem("user");
    navigate("/");
  }
  return (
    // <NavigationMenu className="fixed  w-screen top-0 left-0 h-20 p-2">
    //   <NavigationMenuList>
    //     {pageData.map((page) => {
    //       return (
    //         <NavigationMenuItem>
    //           <Link
    //             to={page.path}
    //             key={page.path}>
    //             <NavigationMenuLink  className={navigationMenuTriggerStyle()}>{page.name}</NavigationMenuLink>
    //           </Link>
    //         </NavigationMenuItem>
    //       );
    //     })}
    //   </NavigationMenuList>
    //   <button onClick={logout}>Log Out </button>
    // </NavigationMenu>
    <>
      <div className="flex px-10 py-6 text-sm font-bold text-gray-300 bg-[#0a0a0a]">
        <div className="flex justify-normal gap-20 items-center ">
          <Link href="" className="bg-gradient-to-r from-red-500 to-orange-500 rounded-full px-3.5 py-2">T</Link>
          <Link to={'/Home'} href="">HOME</Link>
          <Link to={"/Contact"} href="">CONTACT</Link>
          <Link  to={"/Profile"}>PROFILE</Link>
          <Link to={"/CreateBlog"} href="">CREATE </Link>
          <Link to={"/About"} href="">ABOUT</Link>
        </div>
        <div className="flex gap-20 mx-[50rem] items-center">
        <CiTwitter  className="size-7"/>
        <CiInstagram  className="size-7"/>
        <FaDribbble  className="size-7"/>
        </div>
      </div>
    </>
  );
};


export default Navbar;
