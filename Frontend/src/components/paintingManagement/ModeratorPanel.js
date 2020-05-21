import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getAuthors,
  getStyles,
  getPaintings,
  addPainting,
  updatePainting,
  deletePainting,
} from "../../actions/paintingActions";
import { getRequestsAll } from "../../actions/accountActions";

import Form from "../Form";
import Table from "../Table";
import Modal from "../UI/Modal";
import Container from "../UI/Container";
import Title from "../UI/Title";
import Section from "../UI/Section";

const ModeratorPanel = ({
  authors,
  styles,
  paintings,
  requests,
  getAuthors,
  getStyles,
  getPaintings,
  getRequestsAll,
  addPainting,
  updatePainting,
  deletePainting,
}) => {
  useEffect(() => {
    getAuthors();
    getStyles();
    getPaintings();
    getRequestsAll();
  }, [getAuthors, getStyles, getPaintings, getRequestsAll]);

  const [paintingModal, setPaintingModal] = useState(null);

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

      <Section>
        <Title bold>Manage paintings</Title>
        {paintings.loaded && (
          <Table
            headers={[
              {
                key: "name",
                title: "Name",
                size: 0.2,
                action: (p) => setPaintingModal(p),
              },
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
        <Title bold>User requests</Title>
        {authors.loaded && styles.loaded && requests.loaded && (
          <Table
            headers={[
              {
                key: "name",
                title: "Name",
                size: 0.2,
                action: (p) => setPaintingModal(p),
              },
              { key: "author", title: "Author", size: 0.25 },
              { key: "style", title: "Style", size: 0.2 },
              { key: "year", title: "Year", size: 0.1 },
              { key: "status", title: "Status", size: 0.25 },
            ]}
            items={requests.data.map((r) => ({
              ...r,
              author: authors.data.filter((a) => a.id === r.author)[0].name,
              style: styles.data.filter((s) => s.id === r.style)[0].name,
            }))}
            height={430}
            itemSize={70}
            searchBar
          />
        )}
      </Section>

      <Modal
        active={paintingModal !== null}
        onClose={() => setPaintingModal(null)}
      >
        <Section>
          <Title bold>{paintingModal && paintingModal.name}</Title>
          {authors.loaded && styles.loaded && requests.loaded && (
            <Form
              fields={[
                {
                  key: "image",
                  type: "image",
                  props: {
                    url: paintingModal && paintingModal.image,
                    style: {
                      width: "100%",
                      margin: "30px 0 60px",
                    },
                  },
                },
                {
                  key: "name",
                  type: "input",
                  props: {
                    defaultValue: paintingModal && paintingModal.name,
                    type: "text",
                    placeholder: "Painting name",
                    name: "name",
                    outlined: false,
                  },
                },
                {
                  key: "author",
                  type: "select",
                  props: {
                    defaultValue:
                      paintingModal &&
                      authors.data.filter(
                        (a) => a.name === paintingModal.author
                      )[0].id,
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
                  props: {
                    defaultValue:
                      paintingModal &&
                      styles.data.filter(
                        (s) => s.name === paintingModal.style
                      )[0].id,
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
                  props: {
                    defaultValue: paintingModal && paintingModal.year,
                    type: "text",
                    placeholder: "Year",
                    name: "year",
                    outlined: false,
                  },
                },
                {
                  key: "gallery",
                  type: "input",
                  props: {
                    defaultValue: paintingModal && paintingModal.gallery,
                    type: "text",
                    placeholder: "Gallery",
                    name: "gallery",
                    outlined: false,
                  },
                },
              ]}
              buttons={[
                {
                  key: "update",
                  name: "Update",
                  action: (data) => {
                    updatePainting(data, paintingModal.id);
                    setPaintingModal(null);
                  },
                },
                {
                  key: "delete",
                  name: "Delete",
                  action: (data) => {
                    deletePainting(paintingModal.id);
                    setPaintingModal(null);
                  },
                },
              ]}
            />
          )}
        </Section>
      </Modal>
    </Container>
  );
};

const mapStateToProps = (store) => ({
  authors: store.painting.authors,
  styles: store.painting.styles,
  paintings: store.painting.paintings,
  requests: store.account.requests,
});

const mapDispatchToProps = (dispatch) => ({
  getAuthors: () => dispatch(getAuthors()),
  getStyles: () => dispatch(getStyles()),
  getPaintings: () => dispatch(getPaintings()),
  getRequestsAll: () => dispatch(getRequestsAll()),
  addPainting: (data) => dispatch(addPainting(data)),
  updatePainting: (data, id) => dispatch(updatePainting(data, id)),
  deletePainting: (id) => dispatch(deletePainting(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeratorPanel);
