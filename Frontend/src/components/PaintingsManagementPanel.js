import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getAuthors, getStyles } from "../actions/paintingActions";
import { getRequestsAll } from "../actions/accountActions";

import Container from "../components/UI/Container";
import Title from "../components/UI/Title";
import PaintingSearch from "./PaintingSearch";
import RequestsViewTable from "./RequestsViewTable";

const Panel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 100px;
  }
`;

const PaintingsManagementPanel = ({
  requests,
  authors,
  styles,
  getAuthors,
  getStyles,
  getRequestsAll,
}) => {
  useEffect(() => {
    getAuthors();
    getStyles();
    getRequestsAll();
  }, [getRequestsAll, getAuthors, getStyles]);

  return (
    <Container>
      <Panel>
        <Title bold>Manage paintings</Title>
        <PaintingSearch editable />
      </Panel>

      <Panel>
        <Title bold>User requests</Title>
        <RequestsViewTable
          editable
          requests={
            requests &&
            authors &&
            styles &&
            requests.map((req) => ({
              ...req,
              author: authors.filter((a) => a.id === req.author)[0].name,
              style: styles.filter((a) => a.id === req.style)[0].name,
            }))
          }
        />
      </Panel>
    </Container>
  );
};

const mapStateToProps = (store) => ({
  authors: store.painting.authors.data,
  styles: store.painting.styles.data,
  requests: store.account.requests.data,
});

const mapDispatchToProps = (dispatch) => ({
  getRequestsAll: () => dispatch(getRequestsAll()),
  getAuthors: () => dispatch(getAuthors()),
  getStyles: () => dispatch(getStyles()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaintingsManagementPanel);
