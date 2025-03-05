"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface UserProfile {
  avatar_url: string;
}

interface User {
  user_id: number;
  username: string;
  profile: UserProfile;
}

interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const apiUrl = "https://twitter-clone-sn7k.onrender.com";

  useEffect(() => {
    const checkIfFollowing = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }
        const response = await axios.get(`${apiUrl}/api/users/following/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          const followingUsers = response.data.following;
          const isUserFollowing = followingUsers.some(
            (followedUser: User) => followedUser.user_id === user.user_id
          );
          setIsFollowing(isUserFollowing);
        } else {
          console.error(
            `Erro ao verificar se está seguindo o usuário: ${response.status}`
          );
        }
      } catch (error) {
        console.error("Erro ao verificar se está seguindo o usuário:", error);
      } finally {
        setLoading(false);
      }
    };
    checkIfFollowing();
  }, [user.user_id]);

  const handleFollow = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Você precisa estar logado para seguir usuários.");
        return;
      }

      const response = await axios.post(
        `${apiUrl}/api/follow/${user.user_id}/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setIsFollowing(true);
      } else {
        alert("Erro ao seguir o usuário. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao seguir o usuário:", error);
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
      {loading ? (
        <p>Carregando...</p>
      ) : (
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
      )}
    </div>
  );
};

export default UserItem;
