"use client";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  username: string;
  email: string;
  exp: number;
}

const UserProfile: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<TokenPayload>(token);
      setUsername(decodedToken.username);
    }
  }, []);

  return (
    <h1 className="text-2xl font-bold text-gray-800 text-center">
      Bem-vindo, {username}!
    </h1>
  );
};

export default UserProfile;
