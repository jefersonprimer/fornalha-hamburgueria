"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [isValid, setIsValid] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  useEffect(() => {
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
  }, [name, email]);

  useEffect(() => {
    const nameError = name.length >= 4 ? "" : "O nome deve ter pelo menos 4 caracteres.";
    const emailError = email.includes("@") && email.includes(".") ? "" : "Digite um email válido.";

    setErrors({ name: nameError, email: emailError });
    setIsValid(nameError === "" && emailError === "" && name !== "" && email !== "");
  }, [name, email]);

  const handleSubmit = () => {
    setAttemptedSubmit(true);
    if (!isValid) return;
    alert("Login realizado com sucesso!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
        <p className="text-gray-500 text-center mt-2">Acesse sua conta</p>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {attemptedSubmit && errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-4 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {attemptedSubmit && errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

          <button
            onClick={handleSubmit}
            className={`w-full p-3 rounded-lg mt-6 transition ${isValid ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            disabled={!isValid}
          >
            Login
          </button>

          {attemptedSubmit && !isValid && <p className="text-red-500 text-center mt-2">Preencha todos os campos corretamente.</p>}

          <div className="text-center mt-4">
            <p className="text-gray-600">Não tem uma conta?</p>
            <Link href="/cadastro" className="text-blue-500 font-semibold hover:underline">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
