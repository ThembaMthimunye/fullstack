import React, { useState } from "react";
import { createPost } from "../api";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    let data = {
      title: title,
      description: description,
      content: content,
      author: null,
      dateCreated: new Date(),
    };
    await createPost(data);
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

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateBlog;
