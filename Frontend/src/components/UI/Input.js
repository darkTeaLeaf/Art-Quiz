import React from "react";
import styled from "styled-components";

const Input = styled.div`
  font-family: Judson;
  font-weight: 700;
  font-size: ${(props) => props.fontSize};
  color: black;
  text-decoration: unset;

  & input {
    width: 100%;
    padding: 10px;
    border: ${(props) => (props.borderless ? 0 : 5)}px solid black;
    font-family: Raleway;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 20px;
  }
`;

export default ({
  placeholder,
  type,
  name,
  defaultValue,
  required = false,
  register,
  borderless,
  errors,
}) => {
  return (
    <Input className="input-wrapper" borderless={borderless}>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        ref={register({ required })}
        placeholder={placeholder}
      />
      {errors && errors[name] && <div className="error">* Required</div>}
    </Input>
  );
};
