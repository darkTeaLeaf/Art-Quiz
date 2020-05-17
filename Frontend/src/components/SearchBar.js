import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

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

const SearchBar = ({ list, onUpdate }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = ({ query }) => {
    const listFiltered = list.filter((item) =>
      Object.values(item).reduce(
        (prev, curr) => prev || curr.toString().indexOf(query) !== -1,
        false
      )
    );

    onUpdate(listFiltered);
  };

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <SearchField
        ref={register}
        name="query"
        placeholder="Start typing here..."
      />
      <Button />
    </Wrapper>
  );
};

export default SearchBar;
