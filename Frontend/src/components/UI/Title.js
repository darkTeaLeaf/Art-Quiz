import styled from "styled-components";

const Title = styled.h1`
  margin-bottom: 24px;

  font-family: "Judson", serif;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  font-size: 45px;
  line-height: 50px;
`;

export default Title;
