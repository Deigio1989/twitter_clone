"use client";
import React from "react";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, onClick }) => {
  return (
    <div
      className="flex items-center px-4 py-2 hover:bg-gray-200 ml-10 mb-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="mr-4">{icon}</div>
      <span className="text-2xl">{text}</span>
    </div>
  );
};

export default SidebarItem;
