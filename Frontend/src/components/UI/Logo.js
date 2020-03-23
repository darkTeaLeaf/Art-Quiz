import React from "react";
import styled from "styled-components";

const Logo = styled.span`
  font-family: Judson;
  font-weight: 700;
  font-size: ${props => props.fontSize};
  color: black;
  text-decoration: unset;
`;

export default ({ fontSize }) => {
  return <Logo fontSize={fontSize}>ArtQuiz</Logo>;
};
