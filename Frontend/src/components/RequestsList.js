import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const Request = styled.div``;

const RequestsList = ({ requests }) =>
  requests && (
    <Wrapper>
      {requests.map((req) => (
        <Request key={req.id}>{req.name}</Request>
      ))}
    </Wrapper>
  );

export default RequestsList;
