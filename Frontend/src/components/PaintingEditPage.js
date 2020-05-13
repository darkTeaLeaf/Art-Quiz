import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { updatePainting } from "../actions/paintingActions";

import UploadImage from "../components/UploadImage";
import Container from "../components/UI/Container";
import Title from "../components/UI/Title";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

const Layout = styled.div`
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  input {
    margin-bottom: 12px;
  }
`;

const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 40px;
  background-color: white;
  padding: 10px 20px;
`;

const UpdateButton = styled(Button)`
  margin-top: 30px;
`;

const PaintingEditPage = ({ data, updatePainting }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (updData) => {
    updatePainting(updData, data.id);
  };

  return (
    <Layout>
      <Container>
        <Title bold>{data.name}</Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <UploadImage register={register} width="40%">
            <img src={data.image} alt="painting" />
          </UploadImage>

          <FieldsWrapper>
            <Input
              placeholder="Painting name"
              type="text"
              name="name"
              defaultValue={data.name}
              register={register}
              borderless
            />

            <Input
              placeholder="Author"
              type="text"
              name="author"
              defaultValue={data.author}
              register={register}
              borderless
            />

            <Input
              placeholder="Year"
              type="text"
              name="year"
              defaultValue={data.year}
              register={register}
              borderless
            />

            <Input
              placeholder="Style"
              type="text"
              name="style"
              defaultValue={data.style}
              register={register}
              borderless
            />

            <Input
              placeholder="Gallery"
              type="text"
              name="gallery"
              defaultValue={data.gallery}
              register={register}
              borderless
            />

            <UpdateButton type="submit">Update</UpdateButton>
          </FieldsWrapper>
        </Form>
      </Container>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updatePainting: (data, id) => dispatch(updatePainting(data, id)),
});

export default connect(null, mapDispatchToProps)(PaintingEditPage);
