"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserItem from "./UserItem";

interface UserProfile {
  bio: string;
  location: string;
  website: string;
  avatar_url: string;
}

interface User {
  id: number;
  username: string;
  avatar_url: string;
  profile: UserProfile;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://twitter-clone-sn7k.onrender.com/api/users/"
      );
      setUsers(response.data.slice(0, 10)); // Limita a lista para 10 usuários
    } catch {
      setError("Erro ao buscar os usuários. Tente novamente.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="border border-gray-200 p-4 rounded-md">
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
