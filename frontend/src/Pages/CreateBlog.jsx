import React, { useState, useRef, useEffect } from "react";
import { createPost } from "../api";
import { jwtDecode } from "jwt-decode";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import blogHero from "../assets/Pictures/loginImage.jpg"
import { motion } from "framer-motion";
import { BiImageAdd } from "react-icons/bi";


const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null); 
  const [userId, setUserId] = useState(null); 

  const inputFile = useRef(null);
  const MAX_FILE_SIZE = 1500000000;

  useEffect(() => {
    async function loadData() {
      const token = sessionStorage.getItem("user");

      if (!token) {
        console.error("No token found in sessionStorage");
        return;
      }

      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser); 
        setUserId(decodedUser.user._id);
        const id = decodedUser.user._id
        console.log("User ID:", id); 
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    loadData();
  }, []);

  
  async function handleSubmit(e) {
    e.preventDefault();

    if (!userId) {
      alert("User not authenticated. Please log in.");
      return;
    }

    let data = {
      title,
      description,
      content,
      author: userId, 
      dateCreated: new Date(),
      file,
    };

    await createPost(data);
    console.log("Submitted Post:", data);
  }

  
  async function handleFileUpload(e) {
    const file = e.target.files[0];

    const fileExtension = file.name.substring(file.name.lastIndexOf("."));
    if (![".jpg", ".jpeg", ".png"].includes(fileExtension)) {
      alert("Files must be jpg, jpeg, or png.");
      inputFile.current.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("File too big.");
      inputFile.current.value = "";
      return;
    }

    setFile(file);
  }

  return (
    <div className="min-h-screen w-screen  text-white pb-[5rem]">
     
      <div className="relative w-full h-80 flex items-center justify-center">
        <img src={blogHero} alt="Blogging" className="absolute w-full h-full object-cover opacity-40" />
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="relative text-center"
        >
          <h1 className="text-5xl font-extrabold">Create Your Blog Post</h1>
          <p className="text-gray-300 mt-2">Share your thoughts with the world 🌍</p>
        </motion.div>
      </div>

      <div className="flex justify-center mt-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }} 
          className="w-full max-w-3xl bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
        >
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            
            <div>
              <label className="block text-lg font-medium mb-2">Set Title</label>
              <Input 
                className="w-full px-4 py-3 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-400" 
                required 
                onChange={(e) => setTitle(e.target.value)} 
                type="text" 
                maxLength={100} 
              />
            </div>

        
            <div>
              <label className="block text-lg font-medium mb-2">Description</label>
              <Input 
                className="w-full px-4 py-3 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-400" 
                required 
                onChange={(e) => setDescription(e.target.value)} 
                type="text" 
                maxLength={200} 
              />
            </div>

      
            <div>
              <label className="block text-lg font-medium mb-2">Content</label>
              <textarea 
                className="w-full h-40 px-4 py-3 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-400 resize-none" 
                required 
                onChange={(e) => setContent(e.target.value)} 
                maxLength={3000} 
              />
            </div>

          
            <div className="flex flex-col items-center">
              <label className="block text-lg font-medium mb-2">Insert Image</label>
              <div className="relative flex flex-col items-center justify-center w-full max-w-md">
                <input 
                  type="file" 
                  ref={inputFile} 
                  onChange={handleFileUpload} 
                  className="absolute opacity-0 w-full h-full cursor-pointer" 
                  required 
                />
                <div className="w-full px-4 py-3 bg-gray-800 rounded-lg text-center text-gray-400 flex flex-col items-center space-y-2 border-2 border-dashed border-gray-500 cursor-pointer">
                  <BiImageAdd className="text-3xl" />
                  <span>Click to upload an image</span>
                </div>
              </div>
              {file && <img src={file} alt="Preview" className="mt-4 w-40 h-40 object-cover rounded-lg shadow-md" />}
            </div>

            
            <Button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600 text-lg font-semibold py-3 rounded-lg transition"
            >
              Publish Blog 🚀
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateBlog;
