"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import Input from "./Input";
import List from "./List";
import Loading from "./Loading";

const SEARCH_CHARACTERS = gql`
  query SearchCharacters($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
      }
    }
  }
`;

interface CharacterI {
  id: string;
  name: string;
}

interface SearchDataI {
  characters: {
    results: CharacterI[];
  };
}

interface ResultI {
  name: string;
}

const Autocomplete = () => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<CharacterI[]>([]);
  const [getCharacters, { loading, data }] = useLazyQuery<SearchDataI, ResultI>(
    SEARCH_CHARACTERS
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      getCharacters({ variables: { name: value } });
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (name: string) => {
    setQuery(name);
    setSuggestions([]);
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
  };

  useEffect(() => {
    if (data && data.characters && data.characters.results) {
      setSuggestions(data.characters.results);
    }
  }, [data]);

  console.log("suggestions", suggestions, "query", query);

  return (
    <div className="flex flex-col items-center mt-6 w-full max-w-md mx-auto">
      <h4 className="mb-8">Welcome to Rick and Morty universe</h4>
      {!query && (
        <div className="mt-2 text-gray-500">
          Type to search for characters from Rick and Morty universe.
        </div>
      )}
      <Input
        value={query}
        onChange={handleChange}
        showClearInput={!!query}
        onButtonClick={handleClear}
        type="text"
        placeholder="Search for characters..."
        aria-label="Search characters"
      />

      {loading && <Loading />}

      {suggestions.length > 0 && (
        <List suggestions={suggestions} onSelect={handleSelect} />
      )}
    </div>
  );
};

export default Autocomplete;
