"use client";
import React from "react";
import UserProfile from "./UserProfile";
import LogoutButton from "./LogoutButton";

const Header: React.FC = () => {
  return (
    <header className="max-w-4/5 h-2 mx-12 py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <div className="flex items-center">
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-blue-500 mr-5">
          <g>
            <path
              d="M23.954 4.569c-.885.391-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.165-2.724-.95.568-2.005.98-3.127 1.2-.896-.961-2.173-1.56-3.594-1.56-2.719 0-4.92 2.206-4.92 4.917 0 .388.045.765.127 1.125-4.083-.205-7.702-2.165-10.126-5.144-.422.724-.666 1.56-.666 2.454 0 1.69.86 3.18 2.17 4.055-.8-.026-1.554-.246-2.21-.614v.062c0 2.364 1.685 4.337 3.918 4.782-.41.111-.843.171-1.288.171-.314 0-.615-.03-.916-.085.631 1.953 2.445 3.377 4.6 3.418-1.68 1.319-3.801 2.103-6.102 2.103-.396 0-.787-.023-1.175-.068 2.18 1.397 4.768 2.215 7.548 2.215 9.054 0 14-7.497 14-13.987 0-.21 0-.42-.015-.63.96-.694 1.8-1.56 2.46-2.548l-.047-.02z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
        <UserProfile />
      </div>
      <LogoutButton />
    </header>
  );
};

export default Header;
