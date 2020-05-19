import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { suggestPainting } from "../actions/paintingActions";
import { toFormData } from "../helpers";

import PaintingForm from "./PaintingForm";
import Container from "./UI/Container";
import Title from "./UI/Title";

const Layout = styled.div`
  width: 100%;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const PaintingSuggestPage = ({ suggestPainting }) => {
  const onSubmit = (pData) => {
    suggestPainting(toFormData({ ...pData, image: pData.image[0] }));
  };

  return (
    <Layout>
      <Container>
        <Panel>
          <Title bold>Suggest painting</Title>
          <PaintingForm required onSubmit={onSubmit} buttonName="Contribute" />
        </Panel>

        <Panel>
          <Title bold>Your requests</Title>
        </Panel>
      </Container>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => ({
  suggestPainting: (pData) => dispatch(suggestPainting(pData)),
});

export default connect(null, mapDispatchToProps)(PaintingSuggestPage);
