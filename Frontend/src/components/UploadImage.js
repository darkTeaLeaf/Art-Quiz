import React, { useState } from "react";
import styled from "styled-components";

const CameraPlaceholder = styled.div`
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

const Wrapper = styled.label`
  position: relative;
  cursor: pointer;
  width: ${(props) => props.width};

  input {
    display: none;
  }

  > * {
    width: 100%;
  }

  :hover ${CameraPlaceholder} {
    visibility: visible;
    opacity: 1;
  }
`;

const UploadImage = ({ children, register, width }) => {
  const [url, setUrl] = useState(null);

  return (
    <Wrapper width={width}>
      <CameraPlaceholder>
        <img src={`${process.env.PUBLIC_URL}/img/camera.svg`} alt="camera" />
      </CameraPlaceholder>

      {url === null ? children : <img src={url} alt="avatar" />}

      <input
        type="file"
        name="image"
        accept="image/png, image/jpeg, image/jpg"
        ref={register({ required: false })}
        onChange={(e) => {
          setUrl(URL.createObjectURL(e.target.files[0]));
        }}
      />
    </Wrapper>
  );
};

export default UploadImage;
