import React from "react";
import { useParams } from "react-router-dom";
// import { getDb } from '../../../backend/connect';
import { getPost } from "../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getImage } from "../api";
const ReadBlog = () => {
  const [post, setPost] = useState({});
  let params = useParams();
  let id = params.id;
  const navigate = useNavigate();
  useEffect(() => {
    async function getBlog() {
      let data = await getPost(id);
      let date = new Date(data.dateCreated);
      data.dateCreated = date.toString();
      console.log(data);
      setPost(data);
    }
    getBlog();
  }, []);

  console.log(post);

  return (
    <div className="flex flex-col justify-center items-center py-100 ">
      <button
        className="my-4 bg-red-300 rounded-md px-4"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <h1>{post.author}</h1>
      <h1>{post.content}</h1>
      <h1>{new Date(post.dateCreated).toLocaleDateString()}</h1>
      <h1>{post.dateCreated?.slice(4, 15)}</h1>
      <img src={post.imageId?.data} alt="Post Image" />
    </div>
  );
};

export default ReadBlog;
