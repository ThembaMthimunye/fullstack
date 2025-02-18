import React, { useState, useRef } from "react";
import { createPost } from "../api";
import { createImage } from "../api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState();

  const inputFile = useRef(null);
  const MAX_FILE_SIZE = 1500000000;
  async function handleSubmit(e) {
    e.preventDefault();
    let data = {
      title: title,
      description: description,
      content: content,
      author: null,
      dateCreated: new Date(),
      file: file,
    };
    await createPost(data);
    console.log(data);
  }
  // async function handleSubmit(e) {
  //   e.preventDefault();

  //   let imageResponse = await createImage(file); // Upload image first
  //   let imageUrl = imageResponse.data.url; // Assume response contains the image URL

  //   let data = {
  //     title,
  //     description,
  //     content,
  //     imageUrl,  // ✅ Attach image URL here
  //     author: null,
  //     dateCreated: new Date(),
  //   };

  //   await createPost(data);
  // }

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    console.log(file);
    const fileExtension = file.name.substring(file.name.lastIndexOf("."));

    if (
      fileExtension !== ".jpg" &&
      fileExtension !== ".png" &&
      fileExtension !== ".jpeg"
    ) {
      alert("Files must be jpg, jpeg, or png.");
      inputFile.current.value = "";
      inputFile.current.type = "file";
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert("file too big.");
      inputFile.current.value = "";
      inputFile.current.type = "file";
      return;
    }

    setFile(file);
  }

  return (
    <div className="flex flex-col justify-center items-center ">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center py-30 mt-40"
      >
        <label htmlFor="">Blog Post Title:</label>
        <Input
          required
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title"
          maxLength={100}
        />
        <label htmlFor="">Blog Description:</label>
        <Input
          required
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          name="description"
          maxLength={200}
        />
        <label htmlFor="">Blog Content:</label>
        <Input
          required
          onChange={(e) => setContent(e.target.value)}
          name="content"
          maxLength={3000}
        />
        <label>Insert Header Image</label>
        <Input
          type="file"
          ref={inputFile}
          onChange={handleFileUpload}
          required
          name="image"
        />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default CreateBlog;
