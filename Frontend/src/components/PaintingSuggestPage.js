import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { suggestPainting } from "../actions/accountActions";
import { getRequests } from "../actions/accountActions";
import { toFormData } from "../helpers";

import PaintingForm from "./PaintingForm";
import RequestsList from "./RequestsList";
import Title from "./UI/Title";
import Container from "./UI/Container";

const Panel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const PaintingSuggestPage = ({ requests, suggestPainting, getRequests }) => {
  useEffect(() => {
    getRequests();
  }, [getRequests]);

  const onSubmit = (pData) => {
    suggestPainting(toFormData({ ...pData, image: pData.image[0] }));
  };

  return (
    <Container>
      <Panel>
        <Title bold>Suggest painting</Title>
        <PaintingForm required onSubmit={onSubmit} buttonName="Contribute" />
      </Panel>

      <Panel>
        <Title bold>Your requests</Title>
        <RequestsList requests={requests && requests.data} />
      </Panel>
    </Container>
  );
};

const mapStateToProps = (store) => ({
  requests: store.account.requests,
});

const mapDispatchToProps = (dispatch) => ({
  suggestPainting: (pData) => dispatch(suggestPainting(pData)),
  getRequests: (pData) => dispatch(getRequests(pData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaintingSuggestPage);
