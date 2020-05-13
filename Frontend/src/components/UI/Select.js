import React from "react";
import styled from "styled-components";

const Select = styled.select``;

const Option = styled.option``;

export default ({ name, register, options, defaultValue }) => (
  <Select name={name} ref={register} defaultValue={defaultValue}>
    {options.map((option) => (
      <Option key={option.key} value={option.value}>
        {option.text}
      </Option>
    ))}
  </Select>
);
