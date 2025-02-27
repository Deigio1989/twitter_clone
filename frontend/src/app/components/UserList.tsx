"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserItem from "./UserItem";

interface User {
  id: number;
  username: string;
  avatar_url: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users/");
      setUsers(response.data.slice(0, 10)); // Limita a lista para 10 usuários
    } catch (error) {
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
