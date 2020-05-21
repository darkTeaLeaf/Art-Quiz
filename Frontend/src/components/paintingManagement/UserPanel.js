import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { suggestPainting, getRequests } from "../../actions/accountActions";
import {
  getAuthors,
  getStyles,
  getPaintings,
} from "../../actions/paintingActions";

import Form from "../Form";
import Table from "../Table";
import RequestsList from "../RequestsList";
import Modal from "../UI/Modal";
import Section from "../UI/Section";
import Title from "../UI/Title";
import Container from "../UI/Container";

const UserPanel = ({
  paintings,
  authors,
  styles,
  requests,
  getPaintings,
  getAuthors,
  getStyles,
  getRequests,
  suggestPainting,
}) => {
  useEffect(() => {
    getPaintings();
    getAuthors();
    getStyles();
    getRequests();
  }, [getPaintings, getAuthors, getStyles, getRequests]);

  const [paintingModalActive, setPaintingModalActive] = useState(false);
  const togglePaintingModal = () =>
    setPaintingModalActive(!paintingModalActive);

  return (
    <Container>
      <Section style={{ minHeight: "100vh" }}>
        <Title bold>Check for duplicates</Title>
        {paintings.loaded && (
          <Table
            headers={[
              { key: "name", title: "Name", size: 0.2 },
              { key: "author", title: "Author", size: 0.25 },
              { key: "style", title: "Style", size: 0.2 },
              { key: "year", title: "Year", size: 0.1 },
              { key: "gallery", title: "Gallery", size: 0.25 },
            ]}
            items={paintings.data}
            height={430}
            itemSize={70}
            searchBar
          />
        )}
      </Section>

      <Section>
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

      <Modal active={paintingModalActive} onClose={togglePaintingModal}>
        {authors.loaded && styles.loaded && requests.loaded && (
          <Form
            readonly
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
          />
        )}
      </Modal>
    </Container>
  );
};

const mapStateToProps = (store) => ({
  paintings: store.painting.paintings,
  authors: store.painting.authors,
  styles: store.painting.styles,
  requests: store.account.requests,
});

const mapDispatchToProps = (dispatch) => ({
  suggestPainting: (data) => dispatch(suggestPainting(data)),
  getPaintings: () => dispatch(getPaintings()),
  getAuthors: () => dispatch(getAuthors()),
  getStyles: () => dispatch(getStyles()),
  getRequests: () => dispatch(getRequests()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
