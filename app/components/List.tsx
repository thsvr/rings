import React from "react";

interface Suggestion {
  id: string;
  name: string;
}

interface ListProps {
  suggestions: Suggestion[];
  onSelect: (name: string) => void;
}

const List = ({ suggestions, onSelect }: ListProps) => {
  return (
    <ul className="w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
      {suggestions.map((suggestion) => (
        <li
          key={suggestion.id}
          className="p-2 cursor-pointer hover:bg-gray-100"
          onClick={() => onSelect(suggestion.name)}
        >
          {suggestion.name}
        </li>
      ))}
    </ul>
  );
};

export default List;
