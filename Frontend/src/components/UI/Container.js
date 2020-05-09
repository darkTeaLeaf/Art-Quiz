import styled from "styled-components";

const Container = styled.div`
  width: 95%;
  max-width: 1800px;
  margin: auto;

  display: flex;
  flex-direction: ${(props) => (props.horizontal ? "row" : "column")};
  justify-content: center;
  align-items: center;
`;

export default Container;
