import React from "react";
import styled, { css } from "styled-components";

const SelectWrapper = styled.div``;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  padding-left: 6px;

  border: 0px solid black;
  background-color: transparent;

  font-family: Raleway;
  font-weight: normal;
  font-size: 20px;
  line-height: 20px;

  &:invalid {
    color: gray;
  }

  option:not(:first-child) {
    color: black;
  }

  /* option:not(:first-child) {
    color: black;
  } */

  ${(props) =>
    props.outlined &&
    css`
      border: 5px solid black;
      background-color: white;
    `}
`;

const Option = styled.option``;

export default ({
  name,
  register,
  errors,
  rules,
  options,
  defaultValue,
  placeholder,
  outlined = true,
  readonly,
}) => (
  <SelectWrapper>
    <Select
      name={name}
      ref={register(rules)}
      defaultValue={defaultValue || ""}
      outlined={outlined}
      required={rules.required}
      disabled={readonly}
    >
      <Option disabled value="" hidden>
        {placeholder}
      </Option>

      {options.map((option) => (
        <Option key={option.key} value={option.value}>
          {option.text}
        </Option>
      ))}
    </Select>
    {errors && errors[name] && <b>* Required</b>}
  </SelectWrapper>
);
