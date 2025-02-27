"use client";
import LoginPage from "./login/page";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/feed"); // Redireciona para a página de login se o token não estiver presente
    }
  }, [router]);

  return (
    <div>
      <LoginPage></LoginPage>
    </div>
  );
}
