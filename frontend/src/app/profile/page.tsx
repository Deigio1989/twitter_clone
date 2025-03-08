"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import ProfilePage from "../components/ProfilePage";

const FeedPage: React.FC = () => {
  const router = useRouter();
  const [update, setUpdate] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redireciona para a página de login se o token não estiver presente
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="w-4/5 mx-auto py-6 sm:px-6 lg:px-8">
          <Header />
        </div>
      </header>
      <main>
        <div className="max-w-8xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <ProfilePage />
        </div>
      </main>
    </div>
  );
};

export default FeedPage;
