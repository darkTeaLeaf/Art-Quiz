import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAuthors, getStyles } from "../../actions/paintingActions";
import { getRequestsAll } from "../../actions/accountActions";

import Form from "../Form";
import Container from "../UI/Container";
import Title from "../UI/Title";
import Section from "../UI/Section";
// import PaintingSearch from "../PaintingSearch";

const ModeratorPanel = ({
  requests,
  getAuthors,
  getStyles,
  getRequestsAll,
}) => {
  useEffect(() => {
    getAuthors();
    getStyles();
    getRequestsAll();
  }, [getAuthors, getStyles, getRequestsAll]);

  return (
    <Container>
      <Form />
      {/* <Section>
        <Title bold>Manage paintings</Title>
        <PaintingSearch editable />
      </Section>

      <Section>
        <Title bold>User requests</Title>
      </Section> */}
    </Container>
  );
};

const mapStateToProps = (store) => ({
  authors: store.painting.authors.data,
  styles: store.painting.styles.data,
  requests: store.account.requests.data,
});

const mapDispatchToProps = (dispatch) => ({
  getAuthors: () => dispatch(getAuthors()),
  getStyles: () => dispatch(getStyles()),
  getRequestsAll: () => dispatch(getRequestsAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorPanel);
