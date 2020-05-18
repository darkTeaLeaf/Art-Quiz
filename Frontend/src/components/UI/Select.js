import React from "react";
import styled from "styled-components";

const SelectWrapper = styled.div``;

const Select = styled.select`
  padding: 10px;
  padding-left: 6px;

  font-family: Raleway;
  font-weight: normal;
  font-size: 20px;
  line-height: 20px;
  color: black;
`;

const Option = styled.option``;

export default ({ name, register, errors, rules, options, defaultValue }) => (
  <SelectWrapper>
    <Select name={name} ref={register(rules)} defaultValue={defaultValue}>
      {options.map((option) => (
        <Option key={option.key} value={option.value}>
          {option.text}
        </Option>
      ))}
    </Select>
    {errors && errors[name] && <div className="error">* Required</div>}
  </SelectWrapper>
);
