/* eslint-disable @typescript-eslint/no-explicit-any */

import { mileagePrograms } from "@/lib/route/mileagePrograms";
import { components, OptionProps, SingleValueProps } from "react-select";

// Tipagem para opções do Select que representam os programas de milhagem
export interface MileageProgramOption {
  value: string;
  label: string;
  logoUrl: string;
}

// Mapeamento dos programas de milhagem para serem usados como opções no Select
export const options: MileageProgramOption[] = Object.values(mileagePrograms).map(
    (program) => ({
      value: program.key,
      label: program.label,
      logoUrl: program.logoUrl,
    })
  );

// Estilos customizados para o componente Select do react-select
export const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#101828",
    borderColor: "#4b5563",
    color: "#fff",
    borderRadius: "0.25rem",
    minHeight: "auto",
    height: "auto",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#4b5563",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: "#fff",
    padding: "0",
    svg: {
      width: "16px",
      height: "16px",
    },
    "&:hover": {
      color: "#fff",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "#101828",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#1967d2" : "#101828",
    color: "#fff",
    ":hover": {
      backgroundColor: "#1967d2",
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#fff",
  }),
};

// Componente customizado de item da lista de opções do Select (com ícone)
export function ProgramOption(props: OptionProps<MileageProgramOption>) {
  const { data } = props;
  return (
    <components.Option {...props}>
      <div className="flex items-center">
        {/* eslint-disable @next/next/no-img-element */}
        <img src={data.logoUrl} alt={data.label} className="w-5 h-5 mr-2" />
        {data.label}
      </div>
    </components.Option>
  );
}

// Componente customizado para valor selecionado no Select (com ícone)
export function ProgramSingleValue(props: SingleValueProps<MileageProgramOption>) {
  const { data } = props;
  return (
    <components.SingleValue {...props}>
      <div className="flex items-center">
        {/* eslint-disable @next/next/no-img-element */}
        <img src={data.logoUrl} alt={data.label} className="w-5 h-5 mr-2" />
        {data.label}
      </div>
    </components.SingleValue>
  );
}
