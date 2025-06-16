// Indica que este é um componente do lado do cliente no Next.js (App Router)
"use client";

// Importação de ícones do React Icons para exibição de status ativo/inativo
import { MdOutlineExpandCircleDown } from "react-icons/md";
import { GoXCircle } from "react-icons/go";

// Importação da função para converter o horário para o fuso de Houston
import { convertToHoustonTime } from "@/lib/date/convertToHoustonTime";

// Importação da API configurada para chamadas HTTP
import { api } from "@/lib/api/api";

// Importação de hooks do React
import { useEffect, useState } from "react";

// Importação de tipos relacionados a usuários
import { UserType, Session, SendEditUserType } from "@/lib/user/types";

// Importação dos componentes modais para criação e edição de usuários
import CreateUserModal from "./components/CreateUser";
import EditUserModal from "./components/EditUser";

// Importação do Toastify para notificações
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfigs } from "@/lib/toastify/toastify";

// Importação da função de logout do NextAuth
import { signOut } from "next-auth/react";
import { FaSpinner } from "react-icons/fa";
import eventEmitter from "@/lib/event/eventEmmiter";

// Componente principal que exibe a tabela de usuários
export default function UserTable() {
  // Classe CSS reutilizável para estilização das células da tabela
  const classItens = "border border-gray-800 p-2 text-center";

  // Estados para armazenar os usuários e controlar modais
  const [users, setUsers] = useState<UserType[] | undefined>(undefined);
  const [showCreateUserModal, setShowCreateUserModal] =
    useState<boolean>(false);

  const [showEditUserModal, setShowEditUserModal] = useState<boolean>(false);

  // Estado para armazenar o usuário que será editado
  const [userToEdit, setUserToEdit] = useState<UserType>();

  // Estado para armazenar os dados da sessão do usuário autenticado
  const [session, setSession] = useState<Session>();

  // useEffect para buscar os usuários e os dados da sessão ao carregar o componente
  useEffect(() => {
    async function fetchInitialData() {
      try {
        // Requisição para obter a lista de usuários
        const response = await api.get("api/admin/user");
        setUsers(response.data);

        // Requisição para obter os dados da sessão do usuário logado
        const sessionData = await api.get("api/auth/session");
        setSession(sessionData.data);
      } catch {
        console.error("Failed to Find Users.");
      }
    }
    fetchInitialData();

    // Registra o evento e faz cleanup ao desmontar o componente
    eventEmitter.on("updateUsers", fetchInitialData);
    return () => {
      eventEmitter.off("updateUsers", fetchInitialData);
    };
  }, []);

  // Função para deletar um usuário
  async function handleDeleteUser(userId: number) {
    try {
      if (confirm("Are you sure you want to delete this user?")) {
        // Requisição para deletar um usuário
        const userDeletedData = await api.delete(`api/admin/user/${userId}`);
        const userDeleted: UserType = userDeletedData.data;

        // Atualiza a lista de usuários após a exclusão
        const response = await api.get("api/admin/user");
        setUsers(response.data);

        // Exibe notificação de sucesso
        toast.success("User deleted successfully.", toastConfigs);

        // Se o usuário deletado for o mesmo da sessão atual, realiza o logout
        if (userDeleted.id == session?.user.id) {
          setTimeout(async () => {
            await signOut();
          }, 1000);
        }
      }
    } catch {
      // Exibe notificação de erro
      toast.error("Failed to delete user.", toastConfigs);
    }
  }

  return (
    <div className="mt-10 w-full flex items-center justify-center">
      <div className="bg-gray-800 w-full p-5 rounded-2xl flex flex-col items-center justify-center text-white">
        {/* Título e botão para criar usuário */}
        <div className="sm:relative flex flex-col items-center sm:justify-center w-full mb-5">
          <h1 className="font-bold text-3xl mb-2 sm:mb-0">Users Table</h1>
          <button
            onClick={() => setShowCreateUserModal(true)}
            className="bg-green-500 py-2 px-3 rounded w-fit sm:absolute sm:right-0 sm:top-0 cursor-pointer hover:bg-green-600"
          >
            Create User
          </button>
        </div>
        {users ? (
          <div className="w-full flex flex-col overflow-x-auto items-center justify-center text-white">
            {/* Tabela de usuários */}
            <table className="min-w-full border-collapse text-sm md:text-lg">
              <thead>
                <tr className="bg-gray-700">
                  <th className={classItens}>Name</th>
                  <th className={classItens}>User</th>
                  <th className={classItens}>Active</th>
                  <th className={`${classItens} hidden sm:table-cell`}>
                    Last Login
                  </th>
                  <th className={classItens}>Edit</th>
                  <th className={classItens}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="text-center bg-gray-600">
                    <td className={classItens}>{user.name}</td>
                    <td className={classItens}>{user.user}</td>
                    <td className={classItens}>
                      <div className="flex items-center justify-center">
                        {user.active ? (
                          <MdOutlineExpandCircleDown size={25} color="green" />
                        ) : (
                          <GoXCircle size={25} color="red" />
                        )}
                      </div>
                    </td>
                    <td className={`${classItens} hidden sm:table-cell`}>
                      {user.lastLogin
                        ? convertToHoustonTime(String(user.lastLogin))
                        : "Never"}
                    </td>
                    <td className={classItens}>
                      <button
                        onClick={() => {
                          setShowEditUserModal(true);
                          setUserToEdit(user);
                        }}
                        className="bg-yellow-500 py-2 px-5 rounded cursor-pointer hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    </td>
                    <td className={classItens}>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-500 py-2 px-3 rounded cursor-pointer hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modais de criação e edição de usuário */}
            <CreateUserModal
              isOpen={showCreateUserModal}
              setIsOpen={setShowCreateUserModal}
            />
            <EditUserModal
              isOpen={showEditUserModal}
              setIsOpen={setShowEditUserModal}
              userInfo={userToEdit}
              session={session}
            />
          </div>
        ) : (
          <div className="text-white">
            <FaSpinner className="animate-spin" size={40} />
          </div>
        )}
      </div>
    </div>
  );
}
