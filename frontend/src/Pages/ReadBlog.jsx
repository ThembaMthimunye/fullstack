import React from 'react'
import { useParams } from 'react-router-dom'
// import { getDb } from '../../../backend/connect';
import { getPost } from '../api';
import { useState,useEffect } from 'react';
const ReadBlog = () => {
  const [post,setPost]=useState([])
  let params=useParams();
  let id=params.id
  useEffect(()=>{
    async function getBlog(){
      let data=await getPost(id)
      let date=new Date(data.dateCreated)
      data.dateCreated=date.toString()
      setPost(data)
      
    }
    getBlog()
    
    },[])

    console.log(post)

  return (
    <div className='flex flex-col justify-center items-center py-100'>
     <h1>{post.author}</h1>
     <h1>{post.content}</h1>
     <h1>{post.dateCreated}</h1>
     <h1>{post.description}</h1>
    </div>
  )
}

export default ReadBlog
