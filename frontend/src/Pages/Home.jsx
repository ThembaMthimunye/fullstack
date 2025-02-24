import { useState, useEffect } from "react";
import { getPosts } from "../api";
import { getPost } from "../api";
import { BlogCard } from "../components/blogCard";
import image from "../assets/Pictures/loginImage.jpg";
import { IoTrendingUpOutline } from "react-icons/io5";
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
    <div className="w-screen  text-center text-black ">
      {/* <div className="w-full">
        <div className="flex flex-col justify-center items-center h-80 w-full">
          <hr className="w-full max-w-[90rem] bg-gray-500 h-px border-none" />
          <h1 className=" text-7xl md:text-[200px] text-gray-600 font-mono">
            dev BLOG
          </h1>
          <hr className="w-full max-w-[90rem] bg-gray-500 h-px border-none" />
        </div>
      </div> */}
      <div className="px-[20rem] space-y-4">
      <p className="font-mono text-left font-semibold ">Blogs Published</p>
      <hr className="w-[10rem] bg-black" />
      </div>
      

      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto mt-20 text-left  pb-[2rem] w-screen">
        {post.length > 0 && (
          // <div className="flex flex-col items-center md:items-start pt-[2.5rem]">
          //   <img
          //     className="w-full max-w-2xl h-[32rem] object-cover rounded-lg shadow-md"
          //     src={image}
          //     alt="Blog Cover"
          //   />
          //   <h1 className="text-gray-300 mt-4">
          //     {post[0].dateCreated?.slice(0, 10)}
          //   </h1>
          //   <h2 className="text-gray-300 text-left text-lg mt-2">
          //     {post[0].description}
          //   </h2>
          //   <p className="text-gray-400 text-base mt-2 text-left">
          //     {post[0].content?.slice(0, 200)}...
          //   </p>

          // </div>
          <div className="flex gap-10 w-screen  justify-center">
           
            <div className="">
              <div className="space-y-10">
                <hr />
                <div className="flex justify-center items-center gap-6 ">
                  <div className="space-y-4">
                    <div className="flex gap-4 text-[14px] text-gray-400">
                      <p>tanisha massey @</p>
                      <p> 27 Sep</p>
                    </div>
                    <h1 className="text-xl font-semibold">
                      The food and inviroment in costa rica healed my gut and
                      soul
                    </h1>
                    <p className="font-serif">
                      I didnt know I was in for a week of wellness
                    </p>
                    <div className="flex gap-2">
                      <p className="bg-gray-200 max-w-16 rounded-full flex justify-center items-center gap-6 px-2">
                        Food
                      </p>
                      <p>❤️ 3</p>
                    </div>
                  </div>
                  <div>
                    <img src={image} className="w-[20rem] h-[10rem]" alt="" />
                  </div>
                </div>
                <hr />
              </div>
              <div className="space-y-10">
                <hr />
                <div className="flex justify-center items-center gap-6 ">

                  <div className="space-y-4">
                    <div className="flex gap-4 text-[14px] text-gray-400">
                      <p>tanisha massey @</p>
                      <p> 27 Sep</p>
                    </div>
                    <h1 className="text-xl font-semibold">
                      The food and inviroment in costa rica healed my gut and
                      soul
                    </h1>
                    <p className="font-serif">
                      I didnt know I was in for a week of wellness
                    </p>
                    <div className="flex gap-2">
                      <p className="bg-gray-200 max-w-16 rounded-full flex justify-center items-center gap-6 px-2">
                        Food
                      </p>
                      <p>❤️ 3</p>
                    </div>
                  </div>
                  <div>
                    <img src={image} className="w-[20rem] h-[10rem]" alt="" />
                  </div>
                </div>
                <hr />
              </div>
              <div className="space-y-10">
                <hr />
                <div className="flex justify-center items-center gap-6 ">

                  <div className="space-y-4">
                    <div className="flex gap-4 text-[14px] text-gray-400">
                      <p>tanisha massey @</p>
                      <p> 27 Sep</p>
                    </div>
                    <h1 className="text-xl font-semibold">
                      The food and inviroment in costa rica healed my gut and
                      soul
                    </h1>
                    <p className="font-serif">
                      I didnt know I was in for a week of wellness
                    </p>
                    <div className="flex gap-2">
                      <p className="bg-gray-200 max-w-16 rounded-full flex justify-center items-center gap-6 px-2">
                        Food
                      </p>
                      <p>❤️ 3</p>
                    </div>
                  </div>
                  <div>
                    <img src={image} className="w-[20rem] h-[10rem]" alt="" />
                  </div>
                </div>
                <hr />
              </div>
            </div>
            <div className="space-y-10">
              <p className="flex font-semibold items-center text-3xl ">Trending <IoTrendingUpOutline /></p>
              <div className="flex justify-center items-center gap-6">
                <p className="text-8xl text-gray-300">01</p>
                <div className="space-y-4">
                    <div className="flex gap-4 text-[14px] text-gray-400">
                      <p>tanisha massey @</p>
                      <p> 27 Sep</p>
                    </div>
                    <h1 className="text-xl font-semibold">
                      The food and inviroment in costa rica healed my gut and
                      soul
                    </h1>
                    <p className="font-serif">
                      I didnt know I was in for a week of wellness
                    </p>
                    
                  </div>
              </div>

              <div className="flex justify-center items-center gap-6">
                <p className="text-8xl text-gray-300">02</p>
                <div className="space-y-4">
                    <div className="flex gap-4 text-[14px] text-gray-400">
                      <p>tanisha massey @</p>
                      <p> 27 Sep</p>
                    </div>
                    <h1 className="text-xl font-semibold">
                      The food and inviroment in costa rica healed my gut and
                      soul
                    </h1>
                    <p className="font-serif">
                      I didnt know I was in for a week of wellness
                    </p>
                    
                  </div>
              </div>


              <div className="flex justify-center items-center gap-6">
                <p className="text-8xl text-gray-300">03</p>
                <div className="space-y-4">
                    <div className="flex gap-4 text-[14px] text-gray-400">
                      <p>tanisha massey @</p>
                      <p> 27 Sep</p>
                    </div>
                    <h1 className="text-xl font-semibold">
                      The food and inviroment in costa rica healed my gut and
                      soul
                    </h1>
                    <p className="font-serif">
                      I didnt know I was in for a week of wellness
                    </p>
                    
                  </div>
              </div>
            </div>
          </div>
        )}

        {/* <div className="mt-10 md:mt-0 md:ml-16">
        {post.length > 0 && (
          <div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col md:flex-row items-start space-x-6 py-10">
                <img className="w-full w-20 h-20 object-cover shadow-md" src={image} alt="Blog Thumbnail" />
                <div className="space-y-3">
                  <h1 className="text-gray-400 text-sm font-semibold">
                    {post[0].dateCreated?.slice(0, 10)}
                  </h1>
                  <h3 className="text-gray-300 font-bold text-lg md:text-2xl">
                    {post[0].content?.slice(0, 110)}...
                  </h3>
                  <hr className="w-full max-w-lg bg-gray-500 h-px border-none mt-8" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div> */}
      </div>

      {/* <div className="w-full bg-slate-100 pt-[10rem] pb-[10rem] ">
      <h1 className="text-slate-800 text-left text-sm py-10 pl-10 underline font-bold">LATEST POSTS</h1>
    <div className="flex ">
      
      {[...Array(4)].map((_, i) => (
        <div key={i} className="group flex flex-1 hover:cursor-pointer text-black shadow-lg py-[2rem] px-[1rem]">
          <div className="px-4 space-y-2 w-full">
            <img className="w-full max-w-sm rounded-md" src={image} alt="Post Image" />
            <p className="text-sm pt-4 text-gray-400">
              {post[i]?.dateCreated?.slice(0, 10)}
            </p>
            <p className="text-xl text-black font-bold whitespace-normal max-w-sm">
              {post[i]?.content?.slice(0, 70)}
            </p>
          </div>
          {i === 4 && <div className="w-10 h-full bg-gray-300"></div>}
        </div>
      ))}
    </div> */}
      {/* </div> */}
    </div>
  );
};

export default Home;

{
  /* <div className="w-1/3">
        {post && post.length > 0 ? (
          post.map((postItem) => (
            <div key={postItem._id}>
              <BlogCard postItem={postItem} />
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div> */
}
