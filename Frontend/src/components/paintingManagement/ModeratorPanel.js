import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getAuthors,
  getStyles,
  addPainting,
} from "../../actions/paintingActions";
import { getRequestsAll } from "../../actions/accountActions";

import Form from "../Form";
import Container from "../UI/Container";
import Title from "../UI/Title";
import Section from "../UI/Section";

const ModeratorPanel = ({
  authors,
  styles,
  requests,
  getAuthors,
  getStyles,
  getRequestsAll,
  addPainting,
}) => {
  useEffect(() => {
    getAuthors();
    getStyles();
    getRequestsAll();
  }, [getAuthors, getStyles, getRequestsAll]);

  return (
    <Container>
      <Section style={{ minHeight: "100vh" }}>
        <Title bold>Add painting</Title>

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
                key: "add",
                name: "Add",
                action: addPainting,
              },
            ]}
          />
        )}
      </Section>
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
  authors: store.painting.authors,
  styles: store.painting.styles,
  requests: store.account.requests,
});

const mapDispatchToProps = (dispatch) => ({
  getAuthors: () => dispatch(getAuthors()),
  getStyles: () => dispatch(getStyles()),
  getRequestsAll: () => dispatch(getRequestsAll()),
  addPainting: (data) => dispatch(addPainting(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorPanel);
