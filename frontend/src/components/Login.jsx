import { React, useState } from "react";
import { login } from "../api";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate=useNavigate()
  async function submitHandle(e) {
    e.preventDefault();
     let response=await login(user);
    if(response){
        navigate('/Home')
        sessionStorage.setItem('user',response)
        axios.defaults.headers.common['Authorization']=`Bearer ${token}`
    }else{
        alert('login failed')
    }
      
  }
  return (
    <div>
      <form action="" onSubmit={submitHandle}>
       

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

        <button onClick={navigate} type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
