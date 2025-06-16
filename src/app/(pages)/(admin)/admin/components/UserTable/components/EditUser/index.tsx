"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { Session, UserType } from "@/lib/user/types";
import { api } from "@/lib/api/api";
import { toast } from "react-toastify";
import { toastConfigs } from "@/lib/toastify/toastify";
import eventEmitter from "@/lib/event/eventEmmiter";
import { signOut } from "next-auth/react";

interface EditUserProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  userInfo: UserType | undefined; // Dados do usuário a ser editado[
  session: Session | undefined;
}

// Classe CSS reutilizável para os inputs
const inputs =
  "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

export default function EditUser({
  isOpen,
  setIsOpen,
  userInfo,
  session,
}: EditUserProps) {
  // Estados locais para armazenar os valores do formulário
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Atualiza os estados com os dados do usuário sempre que userInfo mudar
  useEffect(() => {
    setUser(userInfo?.user ?? "");
    setName(userInfo?.name ?? "");
    setActive(userInfo?.active ?? false);
  }, [userInfo]);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const userData = { user, password, name, active };

    try {
      // Requisição para atualizar os dados do usuário
      const userEditedData = await api.put(
        `api/admin/user/${userInfo?.id}`,
        userData
      );
      const userEdited: UserType = userEditedData.data;

      // Atualiza a lista de usuários após a criação
      eventEmitter.emit("updateUsers");

      // Exibe notificação de sucesso
      toast.success("User edited successfully.", toastConfigs);

      // Se o usuário editado for o mesmo da sessão atual e foi desativado, realiza o logout
      if (userEdited.id == session?.user.id && userEdited.active == false) {
        setTimeout(async () => {
          await signOut();
        }, 1000);
      }
    } catch {
      // Exibe notificação de erro
      toast.error("Failed to edit user.", toastConfigs);
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
    setPassword("");
    setShowPassword(true);
    setChangePassword(false);
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

          {/* Campo de senha com opção de alterar */}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-white">
              Password
            </label>
            <div>
              <div className="flex flex-row">
                <input
                  id="password"
                  type={showPassword ? "password" : "text"}
                  value={password}
                  placeholder="Type password"
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputs}
                  disabled={!changePassword}
                  required={changePassword}
                />
                {/* Botão para alternar a visibilidade da senha */}
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  className="text-gray-500 px-2 cursor-pointer"
                >
                  {showPassword ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </button>
              </div>

              {/* Checkbox para indicar alteração de senha */}
              <div className="mt-2 cursor-pointer">
                <input
                  id="PasswordChange"
                  type="checkbox"
                  checked={changePassword}
                  onChange={(e) => {
                    setChangePassword(e.target.checked);
                    setPassword("");
                  }}
                  className="mr-2"
                />
                <label
                  htmlFor="PasswordChange"
                  className="text-white cursor-pointer"
                >
                  Change Password
                </label>
              </div>
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

          {/* Checkbox para definir usuário como ativo/inativo */}
          <div className="mb-4 flex items-center">
            <input
              id="active"
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="active" className="text-white">
              Active
            </label>
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
                Save
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
