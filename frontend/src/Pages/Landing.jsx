import React, { useState } from "react";
import CreateUser from "../components/CreateUser";
import Login from "../components/Login";
const Landing = () => {
  const [view, setView] = useState(0);
  return (
    <>
      {!view ? (
        <>
          <Login />
          <button  onClick={()=>setView(!view)}>Create account</button>
        </>
      ) : (
        <>
          < CreateUser/>
          <button onClick={()=>setView(!view)}> Go to Login</button>
        </>
      )}
    </>
  );
};

export default Landing;
Landing;
