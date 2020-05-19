import styled from "styled-components";

const Container = styled.div`
  padding: 0 30px;
  width: 100%;
  max-width: ${(props) => props.maxWidth || 1200}px;
  margin: auto;

  display: flex;
  flex-direction: ${(props) => (props.horizontal ? "row" : "column")};
  justify-content: center;
  align-items: center;
`;

export default Container;
