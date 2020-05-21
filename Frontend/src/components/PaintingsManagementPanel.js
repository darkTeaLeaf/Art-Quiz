import React from "react";

import Container from "../components/UI/Container";
import Title from "../components/UI/Title";
import PaintingSearch from "./PaintingSearch";

const PaintingsManagementPanel = () => (
  <Container>
    <Title bold>Manage paintings</Title>
    <PaintingSearch editable />
  </Container>
);

export default PaintingsManagementPanel;
