import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { suggestPainting } from "../../actions/accountActions";
import { getRequests } from "../../actions/accountActions";

import Form from "../Form";
import Section from "../UI/Section";
// import PaintingSearch from "../PaintingSearch";
import RequestsList from "../RequestsList";
import Title from "../UI/Title";
import Container from "../UI/Container";
import { getAuthors, getStyles } from "../../actions/paintingActions";

const UserPanel = ({
  authors,
  styles,
  requests,
  getAuthors,
  getStyles,
  getRequests,
  suggestPainting,
}) => {
  useEffect(() => {
    getAuthors();
    getStyles();
    getRequests();
  }, [getAuthors, getStyles, getRequests]);

  return (
    <Container>
      {/* <Panel>
        <Title bold>Check for duplicates</Title>
        <PaintingSearch />
      </Panel> */}

      <Section style={{ minHeight: "100vh" }}>
        <Title bold>Suggest painting</Title>

        {authors.loaded && styles.loaded && requests.loaded && (
          <Form
            fields={[
              {
                key: "image",
                type: "image",
                required: true,
                props: {
                  style: {
                    width: "100%",
                    margin: "30px 0 60px",
                  },
                },
              },
              {
                key: "name",
                type: "input",
                required: true,
                props: {
                  type: "text",
                  placeholder: "Painting name",
                  name: "name",
                  outlined: false,
                },
              },
              {
                key: "author",
                type: "select",
                required: true,
                props: {
                  name: "author",
                  options: authors.data.map((a) => ({
                    key: a.id,
                    value: a.id,
                    text: a.name,
                  })),
                  placeholder: "Author",
                  outlined: false,
                },
              },
              {
                key: "style",
                type: "select",
                required: true,
                props: {
                  name: "style",
                  options: styles.data.map((s) => ({
                    key: s.id,
                    value: s.id,
                    text: s.name,
                  })),
                  placeholder: "Style",
                  outlined: false,
                },
              },
              {
                key: "year",
                type: "input",
                required: true,
                props: {
                  type: "text",
                  placeholder: "Year",
                  name: "year",
                  outlined: false,
                },
              },
              {
                key: "gallery",
                type: "input",
                required: true,
                props: {
                  type: "text",
                  placeholder: "Gallery",
                  name: "gallery",
                  outlined: false,
                },
              },
            ]}
            buttons={[
              {
                key: "contribute",
                name: "Contribute",
                action: suggestPainting,
              },
            ]}
          />
        )}
      </Section>

      <Section>
        <Title bold>Your requests</Title>
        <RequestsList requests={requests.data} />
      </Section>
    </Container>
  );
};

const mapStateToProps = (store) => ({
  authors: store.painting.authors,
  styles: store.painting.styles,
  requests: store.account.requests,
});

const mapDispatchToProps = (dispatch) => ({
  suggestPainting: (data) => dispatch(suggestPainting(data)),
  getAuthors: () => dispatch(getAuthors()),
  getStyles: () => dispatch(getStyles()),
  getRequests: () => dispatch(getRequests()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
