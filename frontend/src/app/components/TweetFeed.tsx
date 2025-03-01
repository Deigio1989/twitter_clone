"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Tweet from "./Tweet";
import Sidebar from "./Sidebar";
import { format, parseISO } from "date-fns";
import CreatePost from "./CreatePost";
import LeftSidebar from "./LeftSidebar";

interface Tweet {
  id: number;
  username: string;
  avatar_url: string;
  content: string;
  created_at: string;
}

const TweetFeed: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [filteredTweets, setFilteredTweets] = useState<Tweet[]>([]);
  const [error, setError] = useState("");
  const [displayedTweets, setDisplayedTweets] = useState(5);

  const fetchTweets = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Você precisa estar logado para visualizar os tweets.");
      return;
    }

    try {
      const response = await axios.get(
        "https://twitter-clone-sn7k.onrender.com/api/tweets/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTweets(response.data);
      setFilteredTweets(response.data);
    } catch (error) {
      setError("Erro ao buscar os tweets. Tente novamente.");
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = tweets.filter((tweet) =>
      tweet.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTweets(filtered);
  };

  const mockTweets = [
    {
      username: "usuario1",
      content: "Este é meu primeiro tweet!",
      timestamp: "2h atrás",
      avatar: "https://robohash.org/usuario1.png",
    },
    {
      username: "usuario2",
      content: "Adorando usar este clone do Twitter!",
      timestamp: "1h atrás",
      avatar: "https://robohash.org/usuario2.png",
    },
  ];

  return (
    <div className="flex mx-auto w-4/5">
      <div className="w-3/12">
        <LeftSidebar />
      </div>
      <div className="w-5/12 border-r border-l border-gray-200">
        <div className="w-full max-w-3xl mx-auto ">
          <CreatePost onPostCreated={fetchTweets} />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {filteredTweets.slice(0, displayedTweets).map((tweet) => (
            <Tweet
              key={tweet.id}
              username={tweet.username}
              content={tweet.content}
              timestamp={
                tweet.created_at
                  ? format(parseISO(tweet.created_at), "dd/MM/yyyy HH:mm")
                  : "Data inválida"
              }
              avatar={tweet.avatar_url}
            />
          ))}
        </div>
        <div className="w-full max-w-3xl mx-auto ">
          {mockTweets.map((tweet, index) => (
            <Tweet
              key={index}
              username={tweet.username}
              content={tweet.content}
              timestamp={tweet.timestamp}
              avatar={tweet.avatar}
            />
          ))}
        </div>
        <div className="mt-8">
          {displayedTweets < filteredTweets.length && (
            <button
              onClick={() => setDisplayedTweets(displayedTweets + 5)}
              className="block mx-auto mt-4 py-2 px-5 border border-transparent text-lg font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
            >
              Carregar mais
            </button>
          )}
        </div>
      </div>
      <div className="w-4/12 pl-10 pr-12 mr-10">
        <Sidebar onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default TweetFeed;
