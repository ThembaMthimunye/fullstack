import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; 
import { getPosts } from "@/api";

const YourComponent = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadData() {
      const token = sessionStorage.getItem("user");
  
      if (!token) {
        console.error("No token found in sessionStorage");
        return;
      }
  
      try {
        const decodedUser = jwtDecode(token);
        console.log("Decoded User:", decodedUser); 
  
        if (!decodedUser.user || !decodedUser.user._id) {
          console.error("User ID not found in decoded token");
          return;
        }
  
        const allPosts = await getPosts();
        console.log("All Posts:", allPosts); 
  
        const userId = decodedUser.user._id; 
        const filteredPosts = allPosts.filter((post) => {
          console.log("Checking post author:", post.author, "vs", userId); 
          return post.author === userId;
        });
  
        setUser(decodedUser.user);
        setPosts(filteredPosts);
  
        console.log("Filtered Posts:", filteredPosts); 
      } catch (error) {
        console.error("Error decoding token or fetching posts:", error);
      }
    }
  
    loadData();
  }, []);
  
  return (
    <div>
      <h1>Welcome, {user ? user.name : "Guest"}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default YourComponent;
