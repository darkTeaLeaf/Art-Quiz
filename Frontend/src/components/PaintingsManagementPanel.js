import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { FixedSizeList } from "react-window";

import { getPaintingsList } from "../actions/paintingActions";

import Container from "../components/UI/Container";
import Title from "../components/UI/Title";

const Layout = styled.div`
  width: 100%;
`;

const List = styled(FixedSizeList)`
  border: 10px solid black;
  background-color: #fff;
  max-width: 850px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  transition: background-color 0.1s ease;

  :hover {
    background-color: rgba(1,1,1,0.05);
  }
`;

const PaintingsManagementPanel = ({ paintingsList, getPaintingsList }) => {
  useEffect(() => {
    getPaintingsList();
  }, [getPaintingsList]);

  return (
    <Layout>
      <Container>
        <Title bold>Manage painting</Title>

        {paintingsList !== null && (
          <List
            height={500}
            itemCount={paintingsList.length}
            itemSize={70}
            width="100%"
          >
            {({ index, style }) => (
              <Row style={style}>{paintingsList[index].name}</Row>
            )}
          </List>
        )}
      </Container>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  paintingsList: store.painting.paintingsList.data,
});

const mapDispatchToProps = (dispatch) => ({
  getPaintingsList: () => dispatch(getPaintingsList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaintingsManagementPanel);
