import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

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
  flex-direction: column;

  input {
    margin-bottom: 12px;
  }
`;

const UpdateButton = styled(Button)`
  margin-top: 30px;
`;

const PaintingEditPage = ({ data }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Layout>
      <Container>
        <Title bold>{data.name}</Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <UploadImage register={register}>
            <img
              src={process.env.REACT_APP_BACKEND_ADDRESS + data.image}
              alt="painting"
            />
          </UploadImage>

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

          <UpdateButton type="submit">Update</UpdateButton>
        </Form>
      </Container>
    </Layout>
  );
};

export default PaintingEditPage;
