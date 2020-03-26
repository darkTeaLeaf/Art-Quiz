import styled, { css } from "styled-components";

const Avatar = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  overflow: hidden;
  ${props =>
    props.src
      ? css`
          background-image: url(${props.src});
          background-size: cover;
        `
      : css`
          background-image: url(${process.env.PUBLIC_URL}/img/camera.svg);
          background-size: 25%;
        `}
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: ${props => (props.rounded ? "50%" : "")};
  border: ${props => props.borderWidth || "0"} solid black;
  filter: grayscale(100%) contrast(150%);
  transition: filter 0.3s ease;

  &:hover {
    filter: grayscale(0%) contrast(100%);
  }
`;

export default Avatar;
