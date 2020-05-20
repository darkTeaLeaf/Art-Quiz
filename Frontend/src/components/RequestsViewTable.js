import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { FixedSizeList } from "react-window";

import SearchBar from "./UI/SearchBar";
import PaintingForm from "./PaintingForm";
import Title from "../components/UI/Title";
import Modal from "../components/UI/Modal";
import Container from "../components/UI/Container";

import { toFormData } from "../helpers";
import { acceptRequest, declineRequest } from "../actions/accountActions";

const PaintingsTable = styled.div`
  background-color: black;
  border: 10px solid black;
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

const RequestsViewTable = ({
  requests,
  editable,
  acceptRequest,
  declineRequest,
}) => {
  useEffect(() => {
    setPaintingsFiltered(requests);
  }, [requests]);

  const [paintingIndex, setPaintingIndex] = useState(null);
  const [paintingsFiltered, setPaintingsFiltered] = useState(null);

  const onPaintingsFilter = (pFiltered) => {
    setPaintingsFiltered(
      requests.filter((p) => pFiltered.map((pF) => pF.id).includes(p.id))
    );
  };

  const onSubmit = (pData) => {
    console.log(pData);
    acceptRequest(
      toFormData({
        ...pData,
        image: pData.image[0],
        id: paintingsFiltered[paintingIndex].id,
      })
    );
  };

  const onDecline = (pData) => {
    declineRequest(
      toFormData({
        ...pData,
        image: pData.image[0],
        id: paintingsFiltered[paintingIndex].id,
      })
    );
  };

  return (
    paintingsFiltered !== null &&
    requests && (
      <Container maxWidth={850}>
        <SearchBar
          list={requests.map(({ image, ...rest }) => rest)}
          onUpdate={onPaintingsFilter}
        />

        <PaintingsTable>
          <TitleRow>
            <IDCol>Id</IDCol>
            <NameCol>Name</NameCol>
            <AuthorCol>Author</AuthorCol>
            <YearCol>Year</YearCol>
            <StyleCol>Style</StyleCol>
          </TitleRow>

          <List
            height={430}
            itemCount={paintingsFiltered.length}
            itemSize={70}
            width="100%"
          >
            {({ index, style }) => (
              <ListRow style={style}>
                <IDCol>
                  {editable ? (
                    <Link
                      onClick={() => {
                        setPaintingIndex(index);
                      }}
                    >
                      {paintingsFiltered[index].id}
                    </Link>
                  ) : (
                    paintingsFiltered[index].id
                  )}
                </IDCol>
                <NameCol>{paintingsFiltered[index].name}</NameCol>
                <AuthorCol>{paintingsFiltered[index].author}</AuthorCol>
                <YearCol>{paintingsFiltered[index].year}</YearCol>
                <StyleCol>{paintingsFiltered[index].style}</StyleCol>
              </ListRow>
            )}
          </List>
        </PaintingsTable>

        {editable && paintingIndex !== null && (
          <Modal
            active={paintingIndex !== null}
            onClose={() => {
              setPaintingIndex(null);
            }}
          >
            <Container>
              <Title bold>{paintingsFiltered[paintingIndex].name}</Title>
              <PaintingForm
                onSubmit={onSubmit}
                onDecline={onDecline}
                buttonName="Accept"
                defaultValues={paintingsFiltered[paintingIndex]}
              >
                <img
                  src={paintingsFiltered[paintingIndex].image}
                  alt="painting"
                />
              </PaintingForm>
            </Container>
          </Modal>
        )}
      </Container>
    )
  );
};

const mapDispatchToProps = (dispatch) => ({
  acceptRequest: (data) => dispatch(acceptRequest(data)),
  declineRequest: (data) => dispatch(declineRequest(data)),
});

export default connect(null, mapDispatchToProps)(RequestsViewTable);
