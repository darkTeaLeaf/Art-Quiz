import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import Button from "./UI/Button";
import Input from "./UI/Input";
import Select from "./UI/Select";
import UploadImage from "./UI/UploadImage";
import Container from "./UI/Container";

const FormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  > * {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const FieldsWrapper = styled.div`
  margin-bottom: 40px;

  > * {
    width: 400px;
    margin-bottom: 20px;
  }
`;

const ButtonsWrapper = styled.div`
  > * {
    width: 400px;
    margin-bottom: 15px;
  }
`;

const Form = ({ fields, buttons }) => {
  const { register, handleSubmit, errors, reset } = useForm();

  return (
    <Container maxWidth="850">
      <FormWrapper onSubmit={(e) => e.preventDefault()}>
        {fields && (
          <FieldsWrapper>
            {fields.map((f) => {
              switch (f.type) {
                case "image":
                  return (
                    <UploadImage
                      key={f.key}
                      register={register}
                      rules={{ required: f.required }}
                      errors={errors}
                      reset={reset}
                      {...f.props}
                    />
                  );

                case "input":
                  return (
                    <Input
                      key={f.key}
                      register={register}
                      rules={{ required: f.required }}
                      errors={errors}
                      {...f.props}
                    />
                  );

                case "select":
                  return (
                    <Select
                      key={f.key}
                      register={register}
                      rules={{ required: f.required }}
                      errors={errors}
                      {...f.props}
                    />
                  );

                default:
                  return null;
              }
            })}
          </FieldsWrapper>
        )}

        {buttons && (
          <ButtonsWrapper>
            {buttons.map((b) => (
              <Button
                key={b.key}
                onClick={handleSubmit((data) => b.action(data))}
              >
                {b.name}
              </Button>
            ))}
          </ButtonsWrapper>
        )}
      </FormWrapper>
    </Container>
  );
};

export default Form;
