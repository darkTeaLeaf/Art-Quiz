import styled from "styled-components";

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 100px;
  }
`;

export default Section;
