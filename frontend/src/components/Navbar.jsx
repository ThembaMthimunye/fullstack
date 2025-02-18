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
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"



const Navbar = () => {
  const navigate = useNavigate();
  function logout() {
    sessionStorage.removeItem("user");
    navigate("/");
  }
  return (
    <NavigationMenu className="fixed bg-blue-800 w-screen top-0 left-0 h-20 p-2">
      <NavigationMenuList>
        {pageData.map((page) => {
          return (
            <NavigationMenuItem>
              <Link
                to={page.path}
                key={page.path} 
                
              >
                <NavigationMenuLink  className={navigationMenuTriggerStyle()}>{page.name}</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
      <button onClick={logout}>Log Out </button>
    </NavigationMenu>
  );
};

export default Navbar;
