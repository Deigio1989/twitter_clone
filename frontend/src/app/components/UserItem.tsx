"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";

interface UserProfile {
  avatar_url: string;
}

interface User {
  id: number;
  username: string;
  profile: UserProfile;
}

interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Você precisa estar logado para seguir usuários.");
        return;
      }

      await axios.post(
        `https://twitter-clone-sn7k.onrender.com/api/follow/${user.id}/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsFollowing(true);
    } catch {
      alert("Erro ao seguir o usuário. Tente novamente.");
    }
  };

  return (
    <div className="flex items-center mb-4">
      <img
        src={`https://robohash.org/${user.username}.png`}
        alt={`${user.username}'s avatar`}
        width={40}
        height={40}
        className="rounded-full mr-4"
      />
      <div className="flex-1">
        <p className="text-lg font-semibold">{user.username}</p>
      </div>
      <button
        onClick={handleFollow}
        className={`py-2 px-5 text-md rounded-full ${
          isFollowing
            ? "bg-gray-400 text-white"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        disabled={isFollowing}
      >
        {isFollowing ? "Seguindo" : "Seguir"}
      </button>
    </div>
  );
};

export default UserItem;
