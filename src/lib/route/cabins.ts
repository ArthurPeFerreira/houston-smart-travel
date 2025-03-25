// Define um tipo `CabinKey` que representa as possíveis classes de cabine em um voo
export type CabinKey = "economy" | "premium" | "business" | "first";

// Interface que descreve a estrutura de um objeto `Cabin`
export interface Cabin {
  // Chave que identifica a cabine (deve ser um dos valores do tipo CabinKey)
  key: CabinKey;
  // Nome legível da cabine, usado para exibição
  label: string;
  // Código IATA padrão da cabine: Y (Econômica), W (Premium), J (Executiva), F (Primeira)
  code: "Y" | "W" | "J" | "F";
}

// Objeto que mapeia cada tipo de cabine (`CabinKey`) para seu respectivo objeto `Cabin`
export const cabins: Record<CabinKey, Cabin> = {
  // Definição da cabine econômica
  economy: {
    key: "economy",
    label: "Economy",
    code: "Y",
  },
  // Definição da cabine premium
  premium: {
    key: "premium",
    label: "Premium",
    code: "W",
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
};
