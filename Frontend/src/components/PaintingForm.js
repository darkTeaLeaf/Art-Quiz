import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "./UI/Button";
import Input from "./UI/Input";
import Select from "./UI/Select";
import UploadImage from "./UploadImage";

import { getAuthors, getStyles } from "../actions/paintingActions";

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

const SubmitButton = styled(Button)`
  margin-top: 30px;
`;

const PaintingForm = ({
  children,
  defaultValues,
  required = false,
  buttonName = "Update",
  onSubmit,
  onDecline,
  authors,
  styles,
  getAuthors,
  getStyles,
}) => {
  useEffect(() => {
    getAuthors();
    getStyles();
  }, [getAuthors, getStyles]);

  const { register, handleSubmit, errors, reset } = useForm();

  return (
    authors &&
    styles && (
      <Form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
      >
        <UploadImage
          register={register}
          rules={{ required }}
          errors={errors}
          reset={reset}
          style={{ maxWidth: "40%" }}
        >
          {children}
        </UploadImage>

        <FieldsWrapper>
          <Input
            placeholder="Painting name"
            type="text"
            name="name"
            defaultValue={defaultValues && defaultValues.name}
            register={register}
            rules={{ required }}
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
            defaultValue={
              defaultValues &&
              authors.filter(
                (author) => author.name === defaultValues.author
              )[0].id
            }
            register={register}
            rules={{ required }}
            errors={errors}
          />

          <Input
            placeholder="Year"
            type="text"
            name="year"
            defaultValue={defaultValues && defaultValues.year}
            register={register}
            rules={{ required }}
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
            defaultValue={
              defaultValues &&
              styles.filter((style) => style.name === defaultValues.style)[0].id
            }
            register={register}
            rules={{ required }}
            errors={errors}
          />

          <Input
            placeholder="Gallery"
            type="text"
            name="gallery"
            defaultValue={defaultValues && defaultValues.gallery}
            register={register}
            rules={{ required }}
            errors={errors}
            borderless
          />

          <SubmitButton type="submit">{buttonName}</SubmitButton>

          {onDecline && (
            <SubmitButton onClick={onDecline}>Decline</SubmitButton>
          )}
        </FieldsWrapper>
      </Form>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(PaintingForm);
