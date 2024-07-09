import React, { ChangeEvent } from "react";

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
  showClearInput?: boolean;
  onButtonClick?: () => void;
}

const Input = ({
  value,
  onChange,
  type,
  placeholder,
  showClearInput = false,
  onButtonClick,
}: InputProps) => (
  <div className="relative flex items-center w-full">
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {showClearInput && (
      <button
        className="absolute inset-y-0 right-0 px-3 py-1 focus:outline-none"
        onClick={onButtonClick}
      >
        Clear
      </button>
    )}
  </div>
);

export default Input;
