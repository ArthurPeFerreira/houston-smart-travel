import axios from "axios";

// Criação de uma instância do Axios configurada com base em uma URL base e cabeçalhos padrão.
// Essa instância será usada para realizar requisições HTTP em todo o projeto.
const api = axios.create({
  baseURL: process.env.HOST_URL as string, // Define a URL base para as requisições com base na variável de ambiente HOST_URL.
  headers: {
    "Content-Type": "application/json", // Configura o cabeçalho padrão para indicar o tipo de conteúdo como JSON.
  },
});

// Exporta a instância configurada do Axios para ser usada em outras partes do projeto.
export { api };