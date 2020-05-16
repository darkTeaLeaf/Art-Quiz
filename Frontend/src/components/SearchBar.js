import React from "react";
import styled from "styled-components";

const Wrapper = styled.form`
  width: 100%;
  border: 5px solid black;
  margin-bottom: 20px;
`;

const SearchField = styled.input`
width: 100%;
  padding: 15px;
  font-size: 20px;
  font-family: Raleway;
  text-align: left;
`;

const Button = styled.button``;

const SearchBar = () => {
  return (
    <Wrapper>
      <SearchField placeholder="Start typing here..." />
      <Button />
    </Wrapper>
  );
};

export default SearchBar;
