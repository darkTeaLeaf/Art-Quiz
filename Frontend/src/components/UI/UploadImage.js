import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const ImgOnHover = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  visibility: hidden;
  opacity: 0;
  transition: visibility 0.2s ease, opacity 0.2s ease;
  background-color: rgba(1, 1, 1, 0.5);
  backdrop-filter: blur(10px);

  img {
    width: 40px;
    filter: invert(1);
    opacity: 0.8;
  }
`;

const ImgPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 40px;
    height: 100%;
  }
`;

const Uploader = styled.label`
  display: flex;
  position: relative;
  cursor: pointer;
  border: ${(props) => (props.outlined ? 8 : 0)}px solid black;

  ${(props) =>
    props.noImage &&
    css`
      height: 200px;
      width: 200px;
    `}

  input {
    display: none;
  }

  > * {
    width: 100%;
  }

  :hover ${ImgOnHover} {
    visibility: visible;
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadImage = ({
  children,
  register,
  rules,
  errors,
  outlined = false,
  style,
}) => {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(null);
  }, [register]);

  return (
    <Wrapper style={style}>
      <Uploader
        outlined={outlined}
        noImage={children === undefined && url === null}
      >
        <ImgOnHover>
          <img src={`${process.env.PUBLIC_URL}/img/camera.svg`} alt="camera" />
        </ImgOnHover>

        {url === null ? (
          children || (
            <ImgPlaceholder>
              <img
                src={`${process.env.PUBLIC_URL}/img/camera.svg`}
                alt="camera"
              />
            </ImgPlaceholder>
          )
        ) : (
          <img src={url} alt="avatar" />
        )}

        <input
          type="file"
          name="image"
          accept="image/png, image/jpeg, image/jpg"
          ref={register(rules)}
          onChange={(e) => {
            setUrl(URL.createObjectURL(e.target.files[0]));
          }}
        />
      </Uploader>
      {errors && errors.image && <b>* Required</b>}
    </Wrapper>
  );
};

export default UploadImage;
