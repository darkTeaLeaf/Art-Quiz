import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  padding: 0 !important;
  margin: 0 !important;

  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  height: 100vh;
  width: 100vw;

  transition: backdrop-filter 0.2s ease, background-color 0.2s ease;

  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  z-index: 999;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 50px;
  top: 25px;
  font-size: 45px;
`;

const Modal = ({ children, active, onClose }) =>
  active ? (
    <ModalWrapper>
      <CloseButton onClick={onClose}>✕</CloseButton>
      {children}
    </ModalWrapper>
  ) : null;

export default Modal;
