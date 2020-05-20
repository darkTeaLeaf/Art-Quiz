import React from "react";
import styled, { css } from "styled-components";

const Input = styled.div`
  font-family: Judson;
  font-weight: 700;
  font-size: ${(props) => props.fontSize};
  color: black;
  text-decoration: unset;

  & input {
    width: 100%;
    padding: 10px;
    border: 0px solid black;
    background-color: transparent;
    font-family: Raleway;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 20px;

    ${(props) =>
      props.outlined &&
      css`
        border: 5px solid black;
        background-color: white;
      `}
  }
`;

export default ({
  placeholder,
  type,
  name,
  defaultValue,
  register,
  rules,
  errors,
  readonly,
  outlined = true,
}) => {
  return (
    <Input className="input-wrapper" outlined={outlined}>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        ref={register(rules)}
        placeholder={placeholder}
        readOnly={readonly}
      />
      {errors && errors[name] && <b>* Required</b>}
    </Input>
  );
};
