import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Container from "../components/UI/Container";
import Title from "../components/UI/Title";
import PaintingSearch from "./PaintingSearch";
import RequestsList from "./RequestsList";

import { getRequestsAll } from "../actions/accountActions";

const Panel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 100px;
  }
`;

const PaintingsManagementPanel = ({ requests, getRequestsAll }) => {
  useEffect(() => {
    getRequestsAll();
  }, [getRequestsAll]);

  return (
    <Container>
      <Panel>
        <Title bold>Manage paintings</Title>
        <PaintingSearch editable />
      </Panel>

      <Panel>
        <Title bold>User requests</Title>
        <RequestsList requests={requests && requests.data} />
      </Panel>
    </Container>
  );
};

const mapStateToProps = (store) => ({
  requests: store.account.requests,
});

const mapDispatchToProps = (dispatch) => ({
  getRequestsAll: () => dispatch(getRequestsAll()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaintingsManagementPanel);
