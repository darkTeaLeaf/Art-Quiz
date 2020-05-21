import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  padding: 0 !important;
  margin: 0 !important;

  position: fixed;
  top: 0;
  left: 0;

  height: 100vh;
  width: 100vw;

  transition: backdrop-filter 0.2s ease, background-color 0.2s ease;

  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  z-index: 999;
`;

const ContentWrapper = styled.main`
  padding: 100px 0 60px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
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
      <ContentWrapper>{children}</ContentWrapper>
    </ModalWrapper>
  ) : null;

export default Modal;
