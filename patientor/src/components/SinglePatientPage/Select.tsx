import { useState } from "react";

type SelectOption = {
  label: string;
  value: any;
};

interface SelectProps {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
}

const Select = ({ value, onChange, options }: SelectProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  return (
    <div
      tabIndex={0}
      className="flex items-center relative w-80 outline outline-gray-200 focus:outline-blue-400 p-4 min-h-min rounded my-4 gap-2"
      onClick={() => setIsSelectOpen(!isSelectOpen)}
    >
      <span className="grow">{value?.label}</span>
      <button className="text-gray-500 focus:text-gray-950 hover:text-gray-950 cursor-pointer text-2xl">
        &times;
      </button>
      <div className="bg-gray-500 self-stretch w-[0.05rem]"></div>
      <div
        className={`border-[7.5px] border-solid border-transparent ${
          isSelectOpen
            ? "border-b-gray-500 "
            : "border-t-gray-500 translate-y-1/2"
        }  `}
      ></div>
      <ul
        className={`bg-white max-h-60 overflow-y-auto border rounded absolute left-0 top-[110%] z-30 w-full ${
          isSelectOpen ? "" : "hidden"
        }`}
      >
        {options.map((option) => {
          return (
            <li
              key={option.label}
              className="py-1 px-2 cursor-pointer hover:bg-blue-200 selection:bg-blue-400 selection:text-white"
            >
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
