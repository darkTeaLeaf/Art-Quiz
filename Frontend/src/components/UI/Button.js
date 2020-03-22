import styled, { css } from "styled-components";

const Button = styled.button`
  display: flex;
  flex: 1 0;
  justify-content: center;
  min-width: 40%;
  padding: 0.8vw 0;
  border: 0.3vw solid black;
  font-size: 1.5vw;
  font-family: "Judson", serif;
  transition: box-shadow 0.3s ease;
  position: relative;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);

  &:hover {
    box-shadow: 0.4vw -0.4vw 0 0 rgba(0, 0, 0, 1);
  }

  ${props =>
    props.answered &&
    css`
      cursor: default;

      &:hover {
        box-shadow: none !important;
      }

      ${!props.correct && "opacity: 0.5;"}
    `}

  ${props =>
    props.pin &&
    css`
      &:before {
        content: "";
        background-image: url("/img/circle-sign.png");
        background-size: contain;
        background-repeat: no-repeat;
        position: absolute;
        width: 2vw;
        height: 2vw;
        top: -1.2vw;
      }
    `}
`;

export default Button;
