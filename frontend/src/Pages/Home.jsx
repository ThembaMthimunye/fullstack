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
    <div className="flex flex-col items-center w-full">
      <div className="w-1/3">
        {post && post.length > 0 ? (
          post.map((postItem) => (
            <div key={postItem._id}>
              <BlogCard postItem={postItem} />
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
