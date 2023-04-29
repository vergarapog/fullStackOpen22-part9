type SelectOption = {
  label: string;
  value: any;
};

interface SelectProps {
  options: SelectOption[];
  value: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
}

const Select = ({ value, onChange, options }: SelectProps) => {
  return (
    <div
      tabIndex={0}
      className="flex items-center relative w-80 outline outline-gray-200 focus:outline-blue-400 p-4 min-h-min rounded my-4 gap-2"
    >
      <span className="grow">Value</span>
      <button className="text-gray-500 focus:text-gray-950 hover:text-gray-950 cursor-pointer text-2xl">
        &times;
      </button>
      <div className="bg-gray-500 self-stretch w-[0.05rem]"></div>
      <div className="border-4 border-solid border-transparent border-t-gray-500 translate-y-1/2"></div>
      <ul className="max-h-60 overflow-y-auto">
        {options.map((option) => {
          return (
            <li key={option.label} className="option">
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
