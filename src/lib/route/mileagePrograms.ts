// Define a estrutura de um programa de milhagem, utilizada para garantir consistência nos dados
export interface MileageProgram {
  key: string;       // Identificador único do programa (usado como chave no objeto)
  label: string;     // Nome completo do programa de milhagem (para exibição)
  iataCode: string;  // Código IATA da companhia aérea associada ao programa
  logoUrl: string;   // Caminho para a imagem (logo) do programa de milhagem
}

// Objeto que armazena os programas de milhagem disponíveis, indexado por string (a key do programa)
export const mileagePrograms: Record<string, MileageProgram> = {
  // Programa de milhagem da Scandinavian Airlines (SAS)
  eurobonus: {
    key: "eurobonus",
    label: "SAS EuroBonus",
    iataCode: "SK",
    logoUrl: "/static/mileageProgramsLogos/SK.png",
  },
  // Programa de milhagem da Virgin Atlantic
  virginatlantic: {
    key: "virginatlantic",
    label: "Virgin Atlantic Flying Club",
    iataCode: "VS",
    logoUrl: "/static/mileageProgramsLogos/VS.png",
  },
  // Programa da Aeromexico
  aeromexico: {
    key: "aeromexico",
    label: "Aeromexico Club Premier",
    iataCode: "AM",
    logoUrl: "/static/mileageProgramsLogos/AM.png",
  },
  // Programa da American Airlines
  american: {
    key: "american",
    label: "American Airlines",
    iataCode: "AA",
    logoUrl: "/static/mileageProgramsLogos/AA.png",
  },
  // Programa da Delta Air Lines
  delta: {
    key: "delta",
    label: "Delta SkyMiles",
    iataCode: "DL",
    logoUrl: "/static/mileageProgramsLogos/DL.png",
  },
  // Programa da Etihad Airways
  etihad: {
    key: "etihad",
    label: "Etihad Guest",
    iataCode: "EY",
    logoUrl: "/static/mileageProgramsLogos/EY.png",
  },
  // Programa da United Airlines
  united: {
    key: "united",
    label: "United MileagePlus",
    iataCode: "UA",
    logoUrl: "/static/mileageProgramsLogos/UA.png",
  },
  // Programa da Emirates
  emirates: {
    key: "emirates",
    label: "Emirates Skywards",
    iataCode: "EK",
    logoUrl: "/static/mileageProgramsLogos/EK.png",
  },
  // Programa da Air Canada
  aeroplan: {
    key: "aeroplan",
    label: "Air Canada Aeroplan",
    iataCode: "AC",
    logoUrl: "/static/mileageProgramsLogos/AC.png",
  },
  // Programa da Alaska Airlines
  alaska: {
    key: "alaska",
    label: "Alaska Mileage Plan",
    iataCode: "AS",
    logoUrl: "/static/mileageProgramsLogos/AS.png",
  },
  // Programa da Virgin Australia
  velocity: {
    key: "velocity",
    label: "Virgin Australia Velocity",
    iataCode: "VA",
    logoUrl: "/static/mileageProgramsLogos/VA.png",
  },
  // Programa da Qantas Airways
  qantas: {
    key: "qantas",
    label: "Qantas Frequent Flyer",
    iataCode: "QF",
    logoUrl: "/static/mileageProgramsLogos/QF.png",
  },
  // Programa da Copa Airlines
  connectmiles: {
    key: "connectmiles",
    label: "Copa ConnectMiles",
    iataCode: "CM",
    logoUrl: "/static/mileageProgramsLogos/CM.png",
  },
  // Programa da Azul Linhas Aéreas
  azul: {
    key: "azul",
    label: "Azul TudoAzul",
    iataCode: "AD",
    logoUrl: "/static/mileageProgramsLogos/AD.png",
  },
  // Programa da GOL Linhas Aéreas
  smiles: {
    key: "smiles",
    label: "GOL Smiles",
    iataCode: "G3",
    logoUrl: "/static/mileageProgramsLogos/G3.png",
  },
  // Programa da Air France e KLM
  flyingblue: {
    key: "flyingblue",
    label: "Air France/KLM Flying Blue",
    iataCode: "AF",
    logoUrl: "/static/mileageProgramsLogos/AF.png",
  },
  // Programa da JetBlue Airways
  jetblue: {
    key: "jetblue",
    label: "JetBlue TrueBlue",
    iataCode: "B6",
    logoUrl: "/static/mileageProgramsLogos/B6.png",
  },
};
