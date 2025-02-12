import axios from "axios";

const URL = "http://localhost:8000";


/////////////////////////////////////////////////////////////////// Users Routes///////////////////////////////////////////////////////////////

export async function getusers() {
  const response =await axios.get(`${URL}/user`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function getuser(id) {
  const response =await axios.get(`${URL}/user/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function deleteuser(id) {
  const response =await axios.delete(`${URL}/user/${id}`);
  {
    return response;
  }
}

export async function  createuser(user) {
    const response =await axios.post(`${URL}/user`,user);
    return response
}

export async function updateuser(id, user) {
    const response =await axios.put(`${URL}/user/${id}`,user);
    return response
}


/////////////////////////////////////////////////////////////////// Post Routes///////////////////////////////////////////////////////////////

export async function getPosts() {
  const response =await axios.get(`${URL}/post`);
  
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function getPost(id) {
  const response =await axios.get(`${URL}/post/${id}`);
  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

export async function deletePost(id) {
  const response =await axios.delete(`${URL}/post/${id}`);
  {
    return response;
  }
}

export async function  createPost(post) {
    const response =await axios.post(`${URL}/posts`,post);
    return response
}

export async function updatePost(id, post) {
    const response =await axios.put(`${URL}/post/${id}`,post);
    return response
}


export async function login(user) {
  const response=await axios.post(`${URL}/user/login`,user)
  if(response.data.success){
    console.log(response.data)
    return response.data.token
  }
  else{
    alert('login failed')
  }
}