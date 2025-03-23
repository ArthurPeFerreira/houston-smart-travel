export interface MileageProgram {
    key: string;
    label: string;
    iataCode: string;
    logoUrl: string;
  }
  
  export const mileagePrograms: Record<string, MileageProgram> = {
    eurobonus: {
      key: "eurobonus",
      label: "SAS EuroBonus",
      iataCode: "SK",
      logoUrl: "/static/mileageProgramsLogos/SK.png",
    },
    virginatlantic: {
      key: "virginatlantic",
      label: "Virgin Atlantic Flying Club",
      iataCode: "VS",
      logoUrl: "/static/mileageProgramsLogos/VS.png",
    },
    aeromexico: {
      key: "aeromexico",
      label: "Aeromexico Club Premier",
      iataCode: "AM",
      logoUrl: "/static/mileageProgramsLogos/AM.png",
    },
    american: {
      key: "american",
      label: "American Airlines",
      iataCode: "AA",
      logoUrl: "/static/mileageProgramsLogos/AA.png",
    },
    delta: {
      key: "delta",
      label: "Delta SkyMiles",
      iataCode: "DL",
      logoUrl: "/static/mileageProgramsLogos/DL.png",
    },
    etihad: {
      key: "etihad",
      label: "Etihad Guest",
      iataCode: "EY",
      logoUrl: "/static/mileageProgramsLogos/EY.png",
    },
    united: {
      key: "united",
      label: "United MileagePlus",
      iataCode: "UA",
      logoUrl: "/static/mileageProgramsLogos/UA.png",
    },
    emirates: {
      key: "emirates",
      label: "Emirates Skywards",
      iataCode: "EK",
      logoUrl: "/static/mileageProgramsLogos/EK.png",
    },
    aeroplan: {
      key: "aeroplan",
      label: "Air Canada Aeroplan",
      iataCode: "AC",
      logoUrl: "/static/mileageProgramsLogos/AC.png",
    },
    alaska: {
      key: "alaska",
      label: "Alaska Mileage Plan",
      iataCode: "AS",
      logoUrl: "/static/mileageProgramsLogos/AS.png",
    },
    velocity: {
      key: "velocity",
      label: "Virgin Australia Velocity",
      iataCode: "VA",
      logoUrl: "/static/mileageProgramsLogos/VA.png",
    },
    qantas: {
      key: "qantas",
      label: "Qantas Frequent Flyer",
      iataCode: "QF",
      logoUrl: "/static/mileageProgramsLogos/QF.png",
    },
    connectmiles: {
      key: "connectmiles",
      label: "Copa ConnectMiles",
      iataCode: "CM",
      logoUrl: "/static/mileageProgramsLogos/CM.png",
    },
    azul: {
      key: "azul",
      label: "Azul TudoAzul",
      iataCode: "AD",
      logoUrl: "/static/mileageProgramsLogos/AD.png",
    },
    smiles: {
      key: "smiles",
      label: "GOL Smiles",
      iataCode: "G3",
      logoUrl: "/static/mileageProgramsLogos/G3.png",
    },
    flyingblue: {
      key: "flyingblue",
      label: "Air France/KLM Flying Blue",
      iataCode: "AF",
      logoUrl: "/static/mileageProgramsLogos/AF.png",
    },
    jetblue: {
      key: "jetblue",
      label: "JetBlue TrueBlue",
      iataCode: "B6",
      logoUrl: "/static/mileageProgramsLogos/B6.png",
    },
  };
  