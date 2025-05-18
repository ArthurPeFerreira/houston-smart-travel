// Importação dos tipos para edição de usuário e usuário do sistema
import {  SendEditUserType, UserType } from "@/lib/user/types";

// Importação dos hooks do React para gerenciamento de estado e efeitos colaterais
import React, { useEffect, useState } from "react";

// Importação dos ícones do React Icons para exibir senha visível/oculta e carregamento
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

// Definição da interface das propriedades do modal de edição de usuário
interface EditUserModalProps {
  isOpen: boolean; // Indica se o modal está aberto ou fechado
  isLoading: boolean; // Indica se a ação de edição está em andamento
  userInfo: UserType; // Dados do usuário a ser editado
  onClose: () => void; // Função para fechar o modal
  onEditUser: (data: SendEditUserType, userId: number) => void; // Função para editar o usuário
}

// Componente de modal para edição de usuários
export default function EditUserModal({
  isOpen,
  isLoading,
  userInfo,
  onClose,
  onEditUser,
}: EditUserModalProps) {
  // Estados locais para armazenar os valores do formulário
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);

  // Classe CSS reutilizável para os inputs
  const inputs =
    "w-full border border-gray-600 bg-gray-900 p-2 rounded text-white";

  // Atualiza os estados com os dados do usuário sempre que userInfo mudar
  useEffect(() => {
    setUser(userInfo.user);
    setName(userInfo.name);
    setActive(userInfo.active);
  }, [userInfo]);

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEditUser({ user, password, name, active }, userInfo.id);
  };

  // Função para resetar os campos ao cancelar
  function handleCancel() {
    setPassword("");
    setShowPassword(true);
    setChangePassword(false);
  }

  // Se o modal não estiver aberto, retorna null para não renderizar nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
      {/* Modal principal */}
      <div className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-white">Edit User</h2>
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
          <div className="flex justify-end">
            {/* Botão de cancelar edição */}
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

            {/* Botão de salvar com loading spinner quando a ação está em andamento */}
            {isLoading ? (
              <div className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
                <FaSpinner className="animate-spin" size={24} />
              </div>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
