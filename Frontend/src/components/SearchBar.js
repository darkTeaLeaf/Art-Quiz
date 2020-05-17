import React, { useState, useRef } from "react";
import styled from "styled-components";
import debounce from "lodash.debounce";

const Wrapper = styled.form`
  width: 100%;
  border: 5px solid black;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;

  > * {
    display: flex;
  }
`;

const SearchField = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 20px;
  font-family: Raleway;
  text-align: left;
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  font-size: 25px;
  flex-shrink: 0;
  justify-content: center;
`;

const SearchBar = ({ list, onUpdate }) => {
  const [query, setQuery] = useState("");
  const filterDebounced = useRef(debounce((q) => filter(q), 300)).current;

  const filter = (query) => {
    const listFiltered = list.filter((item) =>
      Object.values(item).reduce(
        (prev, curr) =>
          prev ||
          curr
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) !== -1,
        false
      )
    );
    onUpdate(listFiltered);
  };

  const handleChange = (query) => {
    setQuery(query);
    filterDebounced(query, 300);
  };

  return (
    <Wrapper
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <SearchField
        name="query"
        placeholder="Start typing here..."
        value={query}
        onChange={({ target: { value } }) => handleChange(value)}
      />
      {query && <Button onClick={() => handleChange("")}>✕</Button>}
    </Wrapper>
  );
};

export default SearchBar;
