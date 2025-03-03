"use client";
import React, { useState } from "react";
import axios from "axios";

interface CreatePostProps {
  onPostCreated: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const apiUrl = "https://twitter-clone-sn7k.onrender.com";
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Você precisa estar logado para criar uma postagem.");
      return;
    }

    try {
      await axios.post(
        `${apiUrl}/api/tweets/`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContent("");
      setError("");
      onPostCreated(); // Chama a função para buscar os tweets após a criação bem-sucedida
    } catch {
      setError("Erro ao criar a postagem. Tente novamente.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-6 w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            id="content"
            placeholder="O que está acontecendo?"
            className="mt-1 block w-full h-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0 resize-none text-lg"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Tweetar
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
