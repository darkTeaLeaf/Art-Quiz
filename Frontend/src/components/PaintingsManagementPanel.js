import React from "react";
import styled from "styled-components";

import Container from "../components/UI/Container";
import Title from "../components/UI/Title";

const Layout = styled.div`
  width: 100%;
`;

const PaintingsManagementPanel = () => {
  return (
    <Layout>
      <Container horizontal>
        <Title bold>Manage painting</Title>

        
      </Container>
    </Layout>
  );
};

export default PaintingsManagementPanel;
