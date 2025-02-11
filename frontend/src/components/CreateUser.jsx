import { React, useState } from "react";
import { createuser } from "../api";
const CreateUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  async function submitHandle(e) {
    e.preventDefault();
     let response=await createuser(user);
     if(response.status!==200){
        alert("User could not be created")
     } else {
        alert("User successfully created");
      }
      console.log(response)
  }
  return (
    <div>
      <form action="" onSubmit={submitHandle}>
        <label htmlFor="">name</label>
        <input
          type="text"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
          placeholder="name"
          maxLenght={15}
        />

        <label htmlFor="">email</label>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
          maxLenght={15}
        />

        <label htmlFor="">password</label>
        <input
         
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
          required
          maxLenght={15}
          type='password'
        />

        <button type='submit'>Create Account</button>
      </form>
    </div>
  );
};

export default CreateUser;
