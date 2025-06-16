/* eslint-disable @typescript-eslint/no-explicit-any */

// Importa a instância da API para realizar requisições HTTP
import { api } from "@/lib/api/api";

// Importa o tipo de dados esperado para rotas
import { RouteType } from "@/lib/route/types";

// Importa as configurações padrão para exibição de toasts
import { toastConfigs } from "@/lib/toastify/toastify";

// Importa a função de exibição de mensagens (toasts)
import { toast } from "react-toastify";

// Define o formato do objeto de propriedades esperadas pela função getRoutes
interface GetRoutesProps {
  setIsLoading: (value: boolean) => void; // Função para atualizar o estado de carregamento
  airportIdSelected: number; // ID do aeroporto selecionado
  setFilteredRoutes: (value: RouteType[]) => void; // Função para atualizar a lista de rotas filtradas
}

// Função assíncrona responsável por buscar as rotas associadas a um aeroporto específico
export default async function getRoutes({
  setIsLoading,
  airportIdSelected,
  setFilteredRoutes,
}: GetRoutesProps) {
  try {
    // Define o estado de carregamento como verdadeiro ao iniciar a requisição
    setIsLoading(true);

    // Realiza uma chamada GET para buscar rotas com base no ID do aeroporto
    const data = await api.get(`/api/admin/route/filter/${airportIdSelected}`);

    // Atualiza o estado com as rotas filtradas recebidas da API
    setFilteredRoutes(data.data);
  } catch (error: any) {
    // Em caso de erro, tenta extrair a mensagem vinda do backend
    const errorMessage =
      error?.response?.data?.error || "Failed to get routes.";

    // Exibe a mensagem de erro utilizando toast de notificação
    toast.error(errorMessage, toastConfigs);
  } finally {
    // Finaliza o carregamento, independente do sucesso ou falha
    setIsLoading(false);
  }
}
