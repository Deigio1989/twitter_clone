"use client";
import React from "react";
import {
  FaHome,
  FaHashtag,
  FaBell,
  FaEnvelope,
  FaBookmark,
  FaListAlt,
  FaUser,
  FaEllipsisH,
} from "react-icons/fa";
import SidebarItem from "./SidebarItem";

const LeftSidebar: React.FC = () => {
  return (
    <div className="flex flex-col pl-10">
      <SidebarItem icon={<FaHome />} text="Home" />
      <SidebarItem icon={<FaHashtag />} text="Explorar" />
      <SidebarItem icon={<FaBell />} text="Notificações" />
      <SidebarItem icon={<FaEnvelope />} text="Mensagens" />
      <SidebarItem icon={<FaBookmark />} text="Itens salvos" />
      <SidebarItem icon={<FaListAlt />} text="Listas" />
      <SidebarItem icon={<FaUser />} text="Perfil" />
      <SidebarItem icon={<FaEllipsisH />} text="Mais" />
    </div>
  );
};

export default LeftSidebar;
