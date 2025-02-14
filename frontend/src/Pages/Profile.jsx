import React, { useEffect, useState } from "react";
import { BlogCard } from "../components/blogCard";
import { getPosts } from "../api";
import { jwtDecode } from "jwt-decode"; // ✅ Correct Import

const Profile = () => {
  const [posts, setPost] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadData() {
      const token = sessionStorage.getItem("user");
      if (!token) return;

      try {
        const decodedUser = jwtDecode(token);
        const allPosts = await getPosts();
        const filteredPost = allPosts.filter(
          (post) => post.author === decodedUser._id
        );

        setPost(filteredPost);
        setUser(decodedUser);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    loadData();
  }, []);

  console.log("Updated user:", user);
  console.log(allPosts)

  return (
    <div className="text-white">
      <h2>{user?.user?.name || "N/A"}</h2>
      <h2>{user?.user?.email || "N/A"}</h2>
      <h2>{user?.user?.joinDate || "N/A"}</h2>

      {
        posts.map((post)=>{
          return <BlogCard post={post} />
          
        })
      }
    </div>
  );
};

export default Profile;
