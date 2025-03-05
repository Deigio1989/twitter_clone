"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import TweetFeed from "../components/TweetFeed";

const FeedPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redireciona para a página de login se o token não estiver presente
    } else {
      setLoading(false); // Conclui o carregamento se o token estiver presente
    }
  }, [router]);

  if (loading) {
    return <div>Carregando...</div>; // Mostra uma mensagem de carregamento enquanto a verificação está em progresso
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="w-4/5 mx-auto py-6 sm:px-6 lg:px-8">
          <Header />
        </div>
      </header>
      <main>
        <div className="max-w-8xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <TweetFeed />
        </div>
      </main>
    </div>
  );
};

export default FeedPage;
