// Define um tipo `CabinKey` que representa as possíveis classes de cabine em um voo
export type CabinKey = "economy" | "business" | "first" | "premium";

// Interface que descreve a estrutura de um objeto `Cabin`
export interface Cabin {
  // Chave que identifica a cabine (deve ser um dos valores do tipo CabinKey)
  key: CabinKey;
  // Nome legível da cabine, usado para exibição em UI
  label: string;
  // Código IATA padrão da cabine:
  // Y = Econômica, W = Premium Econômica, J = Executiva, F = Primeira Classe
  code: "Y" | "J" | "F" | "W";
}

// Objeto que define a prioridade de exibição ou ordenação das cabines
// Valores numéricos crescentes representam maior prioridade
export const cabinPriority: Record<CabinKey, number> = {
  economy: 1, // Prioridade da cabine econômica
  business: 2, // Prioridade da cabine executiva
  first: 3, // Prioridade da primeira classe
  premium: 4, // Prioridade da premium econômica
};

// Objeto que mapeia cada chave de cabine (`CabinKey`) para sua definição completa (`Cabin`)
export const cabins: Record<CabinKey, Cabin> = {
  // Definição da cabine econômica
  economy: {
    key: "economy",
    label: "Economy",
    code: "Y",
  },
  // Definição da cabine executiva
  business: {
    key: "business",
    label: "Business",
    code: "J",
  },
  // Definição da primeira classe
  first: {
    key: "first",
    label: "First Class",
    code: "F",
  },
  // Definição da cabine premium econômica
  premium: {
    key: "premium",
    label: "Premium",
    code: "W",
  },
};
