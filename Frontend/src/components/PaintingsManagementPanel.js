import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { FixedSizeList } from "react-window";

import { getPaintingsList } from "../actions/paintingActions";

import PaintingEditPage from "./PaintingEditPage";
import Container from "../components/UI/Container";
import Title from "../components/UI/Title";
import Modal from "../components/UI/Modal";

const Layout = styled.div`
  width: 100%;
`;

const PaintingsTable = styled.div`
  background-color: black;
  border: 10px solid black;
  max-width: 850px;
  width: 100%;
`;

const List = styled(FixedSizeList)`
  background-color: #fff;
  overflow-y: scroll;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  font-size: 20px;

  > div {
    box-sizing: border-box;
    overflow: hidden;
  }
`;

const TitleRow = styled(Row)`
  padding-bottom: 10px;
  font-family: "Judson", serif;
  font-weight: bold;
  color: white;
  height: 50px;
  margin-right: 15px;
`;

const ListRow = styled(Row)`
  transition: background-color 0.1s ease;

  :hover {
    background-color: rgba(1, 1, 1, 0.05);
  }

  color: black;
  font-family: Raleway;
`;

const IDCol = styled.div`
  width: 10%;
  text-align: center;
`;

const NameCol = styled.div`
  width: 35%;
`;

const AuthorCol = styled.div`
  width: 25%;
`;

const YearCol = styled.div`
  width: 10%;
  text-align: center;
`;

const StyleCol = styled.div`
  width: 20%;
`;

const Link = styled.button`
  font-family: inherit;
  font-size: inherit;
  transition: border 0.1s ease;

  :hover {
    border-bottom: 2px solid black;
  }
`;

const PaintingsManagementPanel = ({ paintingsList, getPaintingsList }) => {
  useEffect(() => {
    getPaintingsList();
  }, [getPaintingsList]);

  const [paintingIdx, setPaintingIdx] = useState(null);

  return (
    <Layout>
      <Container>
        <Title bold>Manage paintings</Title>

        <PaintingsTable>
          <TitleRow>
            <IDCol>Id</IDCol>
            <NameCol>Name</NameCol>
            <AuthorCol>Author</AuthorCol>
            <YearCol>Year</YearCol>
            <StyleCol>Style</StyleCol>
          </TitleRow>

          {paintingsList !== null && (
            <List
              height={500}
              itemCount={paintingsList.length}
              itemSize={70}
              width="100%"
            >
              {({ index, style }) => (
                <ListRow style={style}>
                  <IDCol>
                    <Link
                      onClick={() => {
                        setPaintingIdx(index);
                      }}
                    >
                      {paintingsList[index].id}
                    </Link>
                  </IDCol>
                  <NameCol>{paintingsList[index].name}</NameCol>
                  <AuthorCol>{paintingsList[index].author}</AuthorCol>
                  <YearCol>{paintingsList[index].year}</YearCol>
                  <StyleCol>{paintingsList[index].style}</StyleCol>
                </ListRow>
              )}
            </List>
          )}
        </PaintingsTable>

        {paintingsList !== null && (
          <Modal
            active={paintingIdx !== null}
            onClose={() => {
              setPaintingIdx(null);
            }}
          >
            <PaintingEditPage data={paintingsList[paintingIdx]} />
          </Modal>
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
