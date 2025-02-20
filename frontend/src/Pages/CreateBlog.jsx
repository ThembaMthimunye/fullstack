import React, { useState, useRef, useEffect } from "react";
import { createPost } from "../api";
import { jwtDecode } from "jwt-decode";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  // ✅ Handle File Upload
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
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center py-30 mt-40">
        <label>Blog Post Title:</label>
        <Input required onChange={(e) => setTitle(e.target.value)} type="text" maxLength={100} />

        <label>Blog Description:</label>
        <Input required onChange={(e) => setDescription(e.target.value)} type="text" maxLength={200} />

        <label>Blog Content:</label>
        <Input required onChange={(e) => setContent(e.target.value)} maxLength={3000} />

        <label>Insert Header Image</label>
        <Input type="file" ref={inputFile} onChange={handleFileUpload} required />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default CreateBlog;
