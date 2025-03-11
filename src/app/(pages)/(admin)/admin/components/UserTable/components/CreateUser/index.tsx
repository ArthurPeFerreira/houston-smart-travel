// Importação do tipo `CreateUserType` para definir a estrutura dos dados do usuário a ser criado
import { CreateUserType } from "@/lib/user/types";

// Importação dos hooks do React para gerenciamento de estado
import React, { useState } from "react";

// Importação de ícones para alternar visibilidade da senha e exibir status de carregamento
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

// Definição da interface das propriedades do modal de criação de usuário
interface CreateUserModalProps {
  isOpen: boolean; // Indica se o modal está aberto ou fechado
  isLoading: boolean; // Indica se a requisição de criação de usuário está em andamento
  onClose: () => void; // Função para fechar o modal
  onCreateUser: (data: CreateUserType) => void; // Função chamada ao criar um novo usuário
}

// Componente de modal para criar usuários
export default function CreateUserModal({
  isOpen,
  isLoading,
  onClose,
  onCreateUser,
}: CreateUserModalProps) {
  // Estados locais para armazenar os valores do formulário
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [name, setName] = useState<string>("");

  // Classe CSS reutilizável para os inputs
  const inputs = "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

  // Função chamada ao enviar o formulário de criação de usuário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Passa os dados para a função recebida via props
    onCreateUser({ user, password, name });

    // Limpa os campos do formulário
    setUser("");
    setPassword("");
    setName("");
  };

  // Função para resetar os campos ao cancelar
  function handleCancel() {
    setUser("");
    setPassword("");
    setShowPassword(true);
    setName("");
  }

  // Se o modal não estiver aberto, retorna `null` para evitar renderização desnecessária
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-10">
      {/* Container do modal */}
      <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-white">Create User</h2>
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
          <div className="flex justify-end">
            {/* Botão de cancelar criação */}
            <button
              type="button"
              onClick={() => {
                handleCancel();
                onClose();
              }}
              className="mr-2 bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600"
            >
              Cancel
            </button>

            {/* Botão de criação com spinner de carregamento quando a ação está em andamento */}
            {isLoading ? (
              <div className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
                <FaSpinner className="animate-spin" size={24} />
              </div>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
              >
                Create
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
