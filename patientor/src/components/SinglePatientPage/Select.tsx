import { useState } from "react";
import { SelectOption } from "../../types";

interface MultipleSelectProps {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
}

interface SingleSelectProps {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
}

type SelectProps = {
  options: SelectOption[];
} & (MultipleSelectProps | SingleSelectProps);

const Select = ({ multiple, value, onChange, options }: SelectProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOption = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(
          value.filter((v) => {
            return v !== option;
          })
        );
      } else {
        onChange([...value, option]);
      }
    } else {
      onChange(option);
    }
  };

  const isOptionSelected = (option: SelectOption) => {
    if (multiple) {
      return value.includes(option);
    } else {
      return value === option;
    }
  };

  if (!options || !value) {
    return <div>Loading</div>;
  }

  return (
    <div
      tabIndex={0}
      className="flex items-center relative w-[450px] outline outline-gray-200 focus:outline-blue-400 p-4 min-h-min rounded my-4 gap-2"
      onClick={() => setIsSelectOpen((prev) => !prev)}
      onBlur={() => setIsSelectOpen(false)}
    >
      <span className="grow">
        {multiple ? (
          <ul className="flex gap-2 flex-wrap">
            {value.map((option) => {
              return (
                <li
                  key={option.label}
                  className="flex items-center space-x-1 px-1 border border-gray-300 cursor-pointer"
                >
                  <div>{option?.label}</div>
                  <button
                    type="button"
                    className="text-gray-500 focus:text-red-500 hover:text-red-500 cursor-pointer text-2xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      selectOption(option);
                    }}
                  >
                    &times;
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          value?.label
        )}
      </span>
      <button
        type="button"
        className="text-gray-500 focus:text-red-500 hover:text-red-500 cursor-pointer text-2xl"
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
      >
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
              className={`py-1 px-2 cursor-pointer   selection:text-white ${
                isOptionSelected(option)
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-200"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setIsSelectOpen(false);
              }}
            >
              {option?.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
