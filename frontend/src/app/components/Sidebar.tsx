"use client";
import React, { useState } from "react";
import UserList from "./UserList";

interface SearchSidebarProps {
  onSearch: (query: string) => void;
}

const Sidebar: React.FC<SearchSidebarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <>
      <div className="border border-gray-200 p-4 rounded-md">
        <input
          type="text"
          placeholder="Buscar"
          className="w-full p-4 px-7 mb-4 text-lg bg-transparent border border-gray-300 rounded-full"
          value={query}
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <UserList />
    </>
  );
};

export default Sidebar;
