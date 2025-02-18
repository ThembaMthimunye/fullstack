import { React, useState } from "react";
import { createuser } from "../api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import loginImage from "../assets/Pictures/loginImage.jpg"
const CreateUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  async function submitHandle(e) {
    e.preventDefault();
    let response = await createuser(user);
    if (response.status !== 200) {
      alert("User could not be created");
    } else {
      alert("User successfully created");
    }
    console.log(response);
  }
  return (
    <div>
      <form action="" onSubmit={submitHandle} className="">
        <div>
        <div>
          <img src={loginImage} alt="" />
        </div>
        <div className="flex flex-col space-y-4 ">
          <label htmlFor="">name</label>
          <Input
            type="text"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
            placeholder="name"
            maxLenght={15}
          />

          <label htmlFor="">email</label>
          <Input
            type="text"
            placeholder="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
            maxLenght={15}
          />

          <label htmlFor="">password</label>
          <Input
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
            required
            maxLenght={15}
            type="password"
          />

          <Button type="submit">Create Account</Button>
        </div>
        </div>
       
      </form>
    </div>
  );
};

export default CreateUser;
