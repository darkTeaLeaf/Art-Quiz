import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { updatePainting } from "../actions/paintingActions";

import PaintingForm from "./PaintingForm";
import Container from "./UI/Container";
import Title from "./UI/Title";

const Layout = styled.div`
  width: 100%;
`;

const PaintingEditPage = ({ data, updatePainting }) => {
  const onSubmit = (updData) => {
    updatePainting(updData, data.id);
  };

  return (
    <Layout>
      <Container>
        <Title bold>{data.name}</Title>

        <PaintingForm onSubmit={onSubmit} defaultValues={data}>
          <img src={data.image} alt="painting" />
        </PaintingForm>
      </Container>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updatePainting: (data, id) => dispatch(updatePainting(data, id)),
});

export default connect(null, mapDispatchToProps)(PaintingEditPage);
