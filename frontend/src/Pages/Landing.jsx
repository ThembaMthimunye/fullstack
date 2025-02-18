import React, { useState } from "react";
import CreateUser from "../components/CreateUser";
import Login from "../components/Login";
import { Button } from "@/components/ui/button";
const Landing = () => {
  const [view, setView] = useState(0);
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {!view ? (
        <div className="flex flex-col w-96">
          <Login />
          <Button  onClick={()=>setView(!view)}>Create account</Button>
        </div>
      ) : (
        <div className="flex flex-col w-96">
          < CreateUser/>
          <Button onClick={()=>setView(!view)}> Go to Login</Button>
        </div>
      )}
    </div >
  );
};

export default Landing;
Landing;
