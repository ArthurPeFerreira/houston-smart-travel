import React from "react";
import Select, {
  components,
  OptionProps,
  SingleValueProps,
  StylesConfig,
} from "react-select";

interface CustomSelectOption<V> {
  value: V;
  label: string;
}

interface CustomSelectProps<V extends string | number> {
  options: CustomSelectOption<V>[];
  value: V;
  setValue: (value: V) => void;
  placeholder: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export function CustomSelect<V extends string | number>({
  options,
  value,
  setValue,
  placeholder,
  label,
  required = false,
  disabled = false,
}: CustomSelectProps<V>) {
  const selectedOption = options.find((o) => o.value === value) ?? null;

  const customStyles: StylesConfig<CustomSelectOption<V>, false> = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#101828",
      borderColor: "#4b5563",
      borderRadius: "0.25rem",
      padding: "2px",
      minHeight: "auto",
      height: "auto",
      boxShadow: "none",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      "&:hover": { borderColor: "#4b5563" },
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? "#6B7280" : "#9CA3AF",
    }),
    input: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      padding: 0,
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      svg: { width: 16, height: 16 },
    }),
    indicatorSeparator: () => ({ display: "none" }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#101828",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#1967d2" : "#101828",
      color: "#fff",
      ":hover": { backgroundColor: "#1967d2" },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
  };

  return (
    <div className={`w-full ${disabled ? "cursor-not-allowed" : ""}`}>
      {label && <label className="block mb-1 text-white">{label}</label>}
      <Select<CustomSelectOption<V>, false>
        styles={customStyles}
        isDisabled={disabled}
        required={required}
        placeholder={placeholder}
        options={options}
        value={selectedOption}
        onChange={(opt) => setValue(opt?.value as V)}
        components={{
          Option: (props: OptionProps<CustomSelectOption<V>, false>) => (
            <components.Option {...props}>
              <div className="flex items-center">{props.data.label}</div>
            </components.Option>
          ),
          SingleValue: (
            props: SingleValueProps<CustomSelectOption<V>, false>
          ) => (
            <components.SingleValue {...props}>
              <div className="flex items-center">{props.data.label}</div>
            </components.SingleValue>
          ),
        }}
      />
    </div>
  );
}
