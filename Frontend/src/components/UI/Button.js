import styled, { css } from "styled-components";

const Button = styled.button`
  display: flex;
  flex: 1 0;
  justify-content: center;
  min-width: 40%;
  padding: 10px 0;
  font-size: 20px;
  font-family: "Judson", serif;
  transition: box-shadow 0.3s ease;
  position: relative;

  ${(props) =>
    props.inverse
      ? css`
          color: white;
          border: 5px solid white;
          background-color: black;
          box-shadow: 0 0 0 0 white;
          &:hover {
            box-shadow: 5px -5px 0 0 white;
          }
        `
      : css`
          color: black;
          border: 5px solid black;
          background-color: white;
          box-shadow: 0 0 0 0 black;
          &:hover {
            box-shadow: 5px -5px 0 0 black;
          }
        `}

  ${(props) =>
    props.answered &&
    css`
      cursor: default;

      &:hover {
        box-shadow: none !important;
      }

      ${!props.correct && "opacity: 0.5;"}
    `}

  ${(props) =>
    props.pin &&
    css`
      &:before {
        content: "";
        background-image: url("/img/circle-sign.png");
        background-size: contain;
        background-repeat: no-repeat;
        position: absolute;
        width: 26px;
        height: 26px;
        top: -16px;
      }
    `}

  ${(props) =>
    props.link &&
    css`
      border: none;
      font-weight: bold;

      :hover {
        box-shadow: none;
        text-decoration: underline;
      }
    `}
`;

export default Button;
