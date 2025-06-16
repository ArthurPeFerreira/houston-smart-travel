"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { CreateUserType } from "@/lib/user/types";
import { api } from "@/lib/api/api";
import { toast } from "react-toastify";
import { toastConfigs } from "@/lib/toastify/toastify";
import eventEmitter from "@/lib/event/eventEmmiter";

interface CreateUserProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// Classe CSS reutilizável para os inputs
const inputs =
  "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

export default function CreateUser({ isOpen, setIsOpen }: CreateUserProps) {
  // Estados locais para armazenar os valores do formulário
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Função chamada ao enviar o formulário de criação de usuário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData: CreateUserType = {
        name,
        password,
        user,
      };
      // Requisição para criar um novo usuário
      await api.post("api/admin/user", userData);

      // Atualiza a lista de usuários após a criação
      eventEmitter.emit("updateUsers");

      // Exibe notificação de sucesso
      toast.success("User created successfully.", toastConfigs);
    } catch {
      // Exibe notificação de erro
      toast.error("Failed to create user.", toastConfigs);
    } finally {
      // Finaliza o loading e fecha o modal
      setLoading(false);

      setTimeout(() => {
        handleCancel();
      }, 1000);
    }
  };

  // Função para resetar os campos ao cancelar
  function handleCancel() {
    setUser("");
    setPassword("");
    setShowPassword(false);
    setName("");
    setIsOpen(!isOpen);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent
        showCloseButton={false}
        className="bg-gray-800 p-6 rounded-md shadow-lg w-11/12 sm:w-full max-w-md border-none text-white h-auto max-h-11/12 "
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Create User
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {/* Campo de usuário */}
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1 text-white">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={user}
              placeholder="Type username"
              onChange={(e) => setUser(e.target.value)}
              className={inputs}
              required
            />
          </div>

          {/* Campo de senha com opção de alternar visibilidade */}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-white">
              Password
            </label>
            <div className="flex">
              <input
                id="password"
                type={showPassword ? "password" : "text"}
                value={password}
                placeholder="Type password"
                onChange={(e) => setPassword(e.target.value)}
                className={inputs}
                required
              />
              {/* Botão para alternar a visibilidade da senha */}
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="text-gray-500 px-2 cursor-pointer"
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
          </div>

          {/* Campo de nome */}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 text-white">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              placeholder="Type name"
              onChange={(e) => setName(e.target.value)}
              className={inputs}
              required
            />
          </div>

          {/* Botões de ação */}
          <div className="flex w-full ">
            {/* Botão de salvar com loading spinner quando a ação está em andamento */}
            {loading ? (
              <div className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 w-full flex items-center justify-center">
                <FaSpinner className="animate-spin" size={24} />
              </div>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 w-full flex items-center justify-center"
              >
                Create
              </button>
            )}
          </div>
        </form>
        {/* Botão para fechar o modal */}
        <button
          onClick={() => handleCancel()}
          className="w-full p-2 rounded bg-red-500 hover:bg-red-600 transition cursor-pointer"
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
}
