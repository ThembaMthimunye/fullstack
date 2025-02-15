import React, { useEffect, useState } from "react";
import { BlogCard } from "../components/blogCard";
import { getPosts } from "../api";
import { jwtDecode } from "jwt-decode"; // ✅ Correct Import

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadData() {
      const token = sessionStorage.getItem("user");
      if (!token) return;

      try {
        const decodedUser = jwtDecode(token);
        // const allPosts = await getPosts();
        const allPosts = await getPosts();
        console.log("All Posts:", allPosts);
        const filteredPost = allPosts.filter(
          (post) => post.author == decodedUser._id
        );

        setPosts(filteredPost);
        setUser(decodedUser);
        console.log(posts);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <div className="text-white flex  items-center pt-50 flex-col">
      <h2>{user?.user?.name || "N/A"}</h2>
      <h2>{user?.user?.email || "N/A"}</h2>
      <h2>{(user?.user?.joinDate).slice(0,10) || "N/A"}</h2>

      <div>
      
          {
             posts.map((post) => (
              <div key={post._id}>
                <h1>{post.title}</h1>
                <h2>{post.Description}</h2>
              </div>
            ))
          }
        
      </div>
    </div>
  );
};

export default Profile;
