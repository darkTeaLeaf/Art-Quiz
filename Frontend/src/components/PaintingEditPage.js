import React from "react";
import styled from "styled-components";

import Container from "../components/UI/Container";
import Title from "../components/UI/Title";

const Layout = styled.div`
  width: 100%;
`;

const PaintingEditPage = ({ data }) => {
  return (
    <Layout>
      <Container>
        <Title bold>{data.name}</Title>
      </Container>
    </Layout>
  );
};

export default PaintingEditPage;
