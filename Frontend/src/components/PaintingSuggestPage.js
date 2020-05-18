import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { getAuthors, getStyles } from "../actions/paintingActions";

import UploadImage from "../components/UploadImage";
import Container from "../components/UI/Container";
import Title from "../components/UI/Title";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Select from "../components/UI/Select";

const Layout = styled.div`
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 40px;
  background-color: white;
  padding: 10px 20px;

  > * {
    margin-bottom: 15px;
  }
`;

const UpdateButton = styled(Button)`
  margin-top: 30px;
`;

const PaintingSuggestPage = ({ authors, styles, getAuthors, getStyles }) => {
  useEffect(() => {
    getAuthors();
    getStyles();
  }, [getAuthors, getStyles]);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (updData) => {
    console.log(updData);
  };

  return (
    <Layout>
      <Container>
        <Title bold>Suggest painting</Title>

        {authors && styles && (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <UploadImage
              register={register}
              rules={{ required: true }}
              errors={errors}
              style={{ maxWidth: "40%" }}
            />

            <FieldsWrapper>
              <Input
                placeholder="Painting name"
                type="text"
                name="name"
                register={register}
                rules={{ required: true }}
                errors={errors}
                borderless
              />

              <Select
                options={authors.map((author) => ({
                  key: author.id,
                  value: author.id,
                  text: author.name,
                }))}
                name="author"
                register={register}
                rules={{ required: true }}
                errors={errors}
              />

              <Input
                placeholder="Year"
                type="text"
                name="year"
                register={register}
                rules={{ required: true }}
                errors={errors}
                borderless
              />

              <Select
                options={styles.map((style) => ({
                  key: style.id,
                  value: style.id,
                  text: style.name,
                }))}
                name="style"
                register={register}
                rules={{ required: true }}
                errors={errors}
              />

              <Input
                placeholder="Gallery"
                type="text"
                name="gallery"
                register={register}
                rules={{ required: true }}
                errors={errors}
                borderless
              />

              <UpdateButton type="submit">Contribute</UpdateButton>
            </FieldsWrapper>
          </Form>
        )}
      </Container>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  authors: store.painting.authors.data,
  styles: store.painting.styles.data,
});

const mapDispatchToProps = (dispatch) => ({
  getAuthors: () => dispatch(getAuthors()),
  getStyles: () => dispatch(getStyles()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaintingSuggestPage);
