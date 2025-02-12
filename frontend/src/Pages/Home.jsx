import { useState, useEffect } from "react";
import { getPosts } from "../api";
import { BlogCard } from "../components/blogCard";

const Home = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    async function getAllData() {
      try {
        const data = await getPosts();

        if (Array.isArray(data)) {
          setPost(data);
        } else {
          setPost([]); 
        }
      } catch (error) {
       
        console.error("Error fetching posts:", error);
        setPost([]); 
      }
    }

    getAllData();
  }, []);

  console.log(post);

  return (
    <div className="">
      {post && post.length > 0 ? (
        post.map((postItem) => (
          <div className="hover:bg-red-500 pt-40 flex justify-center items-center" key={postItem._id}>
            <BlogCard postItem={postItem} />
          </div>
        ))
      ) : (
        <p>No posts available</p> 
      )}
    </div>
  );
};

export default Home;
