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
        sessionStorage.setItem('user',response)
         axios.defaults.headers.common['authorization']=`Bearer ${response}`
        navigate('/Home')
        console.log(response)
    }else{
        alert('login failed')
    } 
  }
  return (
    <div >
      <form action="" onSubmit={submitHandle}>
       
        <div div className='flex flex-col'>
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
        </div>
       
      </form>
    </div>
  );
};

export default Login;
