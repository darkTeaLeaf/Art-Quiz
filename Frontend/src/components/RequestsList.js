import React from "react";
import styled from "styled-components";

import Container from "./UI/Container";

const Request = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 15px;
  border: 5px solid rgba(1, 1, 1, 0.05);
  margin-bottom: 10px;
`;

const Label = styled.div`
  font-family: Raleway;
  color: #ababab;
  font-size: 18px;

  &:first-child {
    margin-right: 15px;
  }
`;

const Value = styled.span`
  color: black;
  font-size: 22px;
  font-weight: bold;
`;

const RequestsList = ({ requests }) =>
  requests && (
    <Container maxWidth="850">
      {requests.map((req) => (
        <Request key={req.id}>
          <Label>
            Painting name: <Value>{req.name}</Value>
          </Label>

          <Label>
            Status: <Value>{req.status}</Value>
          </Label>
        </Request>
      ))}
    </Container>
  );

export default RequestsList;
