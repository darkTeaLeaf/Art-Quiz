import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.label`
  cursor: pointer;

  input {
    display: none;
  }
`;

const UploadImage = ({ children, register }) => {
  const [url, setUrl] = useState(null);

  return (
    <Wrapper>
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
