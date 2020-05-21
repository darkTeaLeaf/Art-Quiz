import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FixedSizeList } from "react-window";

import SearchBar from "./UI/SearchBar";
import Container from "../components/UI/Container";

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

const Cell = styled.div`
  width: ${(props) => props.size * 100}%;
  padding: 0 5px;

  box-sizing: border-box;
  overflow: hidden;
  max-height: 100%;
  line-break: anywhere;
  text-align: ${(props) => props.align || "center"};
`;

const Link = styled.a`
  cursor: pointer;
  text-decoration: underline;
`;

const Table = ({
  headers = [],
  items = [],
  searchBar = false,
  height = 400,
  itemSize = 70,
}) => {
  useEffect(() => {
    setItemsFiltered(items);
  }, [items]);

  const [itemsFiltered, setItemsFiltered] = useState(null);

  const onPaintingsFilter = (pFiltered) => {
    setItemsFiltered(
      items.filter((p) => pFiltered.map((pF) => pF.id).includes(p.id))
    );
  };

  return (
    itemsFiltered && (
      <Container maxWidth={850}>
        {searchBar && (
          <SearchBar
            list={items.map(({ image, ...rest }) => rest)}
            onUpdate={onPaintingsFilter}
          />
        )}

        <PaintingsTable>
          <TitleRow>
            {headers.map((h) => (
              <Cell key={h.key} size={h.size} align={h.align}>
                {h.title}
              </Cell>
            ))}
          </TitleRow>

          <List
            height={height}
            itemCount={itemsFiltered.length}
            itemSize={itemSize}
            width="100%"
          >
            {({ index, style }) => (
              <ListRow style={style}>
                {headers.map((h) => (
                  <Cell key={h.key} size={h.size} align={h.align}>
                    {h.action ? (
                      <Link onClick={() => h.action(itemsFiltered[index])}>
                        {itemsFiltered[index][h.key]}
                      </Link>
                    ) : (
                      itemsFiltered[index][h.key]
                    )}
                  </Cell>
                ))}
              </ListRow>
            )}
          </List>
        </PaintingsTable>
      </Container>
    )
  );
};

export default Table;
