import React, { useState, useRef } from "react";
import { createPost } from "../api";
import { createImage } from "../api";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState();
  
  
  const inputFile = useRef(null);
  const MAX_FILE_SIZE=15000000
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   let data = {
  //     title: title,
  //     description: description,
  //     content: content,
  //     author: null,
  //     dateCreated: new Date(),
  //     file: file
  //   };
  //   await createPost(data);
  // }
  async function handleSubmit(e) {
    e.preventDefault();
    
    let imageResponse = await createImage(file); // Upload image first
    let imageUrl = imageResponse.data.url; // Assume response contains the image URL
  
    let data = {
      title,
      description,
      content,
      imageUrl,  // ✅ Attach image URL here
      author: null,
      dateCreated: new Date(),
    };
  
    await createPost(data);
  }
  

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.'));
    
    
    if (fileExtension !== '.jpg' && fileExtension !== '.png' && fileExtension !== '.jpeg') {
      alert("Files must be jpg, jpeg, or png.");
      inputFile.current.value = ''; 
      inputFile.current.type = 'file'; 
      return
    }
    if (file.size>MAX_FILE_SIZE) {
      alert("file too big.");
      inputFile.current.value = ''; 
      inputFile.current.type = 'file'; 
      return 
    }
    
      setFile(file); 
  
  }

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center py-30"
    >
      <label htmlFor="">Blog Post Title:</label>
      <input
        required
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        name="title"
        maxLength={100}
      />
      <label htmlFor="">Blog Description:</label>
      <input
        required
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        name="description"
        maxLength={200}
      />
      <label htmlFor="">Blog Content:</label>
      <textarea
        required
        onChange={(e) => setContent(e.target.value)}
        name="content"
        maxLength={300}
      />
      <label>Insert Header Image</label>
      <input
        type="file"
        ref={inputFile}
        onChange={handleFileUpload}
        required
        name="image"
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateBlog;
