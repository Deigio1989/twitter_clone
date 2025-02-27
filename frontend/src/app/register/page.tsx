"use client"; // Adicione esta linha no início do arquivo para indicar que é um componente do lado do cliente

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    // Validação do username
    const usernameRegex = /^[a-zA-Z0-9@./+/-/_]+$/;
    if (!usernameRegex.test(username)) {
      setError(
        "O nome de usuário só pode conter letras, números e os caracteres @/./+/-/_."
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/register/", {
        username,
        email,
        password,
      });

      // Redirecione o usuário para a página de login após o registro
      router.push("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessages = Object.values(error.response.data)
          .flat()
          .join(" ");
        setError(`Erro: ${errorMessages}`);
      } else {
        setError(
          `Erro ${error} ao fazer cadastro. Verifique suas informações e tente novamente.`
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="mb-4 text-center">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-12 h-12 text-blue-500 mx-auto"
          >
            <g>
              <path
                d="M23.954 4.569c-.885.391-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.165-2.724-.95.568-2.005.98-3.127 1.2-.896-.961-2.173-1.56-3.594-1.56-2.719 0-4.92 2.206-4.92 4.917 0 .388.045.765.127 1.125-4.083-.205-7.702-2.165-10.126-5.144-.422.724-.666 1.56-.666 2.454 0 1.69.86 3.18 2.17 4.055-.8-.026-1.554-.246-2.21-.614v.062c0 2.364 1.685 4.337 3.918 4.782-.41.111-.843.171-1.288.171-.314 0-.615-.03-.916-.085.631 1.953 2.445 3.377 4.6 3.418-1.68 1.319-3.801 2.103-6.102 2.103-.396 0-.787-.023-1.175-.068 2.18 1.397 4.768 2.215 7.548 2.215 9.054 0 14-7.497 14-13.987 0-.21 0-.42-.015-.63.96-.694 1.8-1.56 2.46-2.548l-.047-.02z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Criar Conta</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nome de usuário
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Confirmar Senha
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Registrar
          </button>
          <div className="mt-6 text-center">
            <a href="/login" className="text-sm text-blue-600 hover:underline">
              Já tem uma conta? Entrar
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
