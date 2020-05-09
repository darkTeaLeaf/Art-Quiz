import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { signIn, signUp } from "../../actions/accountActions";
import Avatar from "../../components/UI/Avatar";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import "./Auth.css";

const SignIn = ({ signIn }) => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async (credentials) => {
    const status = await signIn(credentials);
    if (status === "success") {
      history.push("/account");
    }
  };

  return (
    <div className="sign">
      <h1>Welcome!</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Username"
          type="text"
          name="username"
          register={register}
          errors={errors}
          required
        />

        <Input
          placeholder="Password"
          type="password"
          name="password"
          register={register}
          errors={errors}
          required
        />

        <Button type="submit">Sign in</Button>
      </form>
    </div>
  );
};

const SignUp = ({ signUp }) => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async (credentials) => {
    console.log(credentials);
    const [first_name, last_name] = credentials.full_name.trim().split(/\s+/);
    credentials = {
      ...credentials,
      first_name: first_name || "",
      last_name: last_name || "",
      avatar: credentials.avatar[0],
    };
    delete credentials.full_name;
    if (!credentials.avatar) delete credentials.avatar;

    let formData = new FormData();
    for (let key in credentials) {
      formData.append(key, credentials[key]);
    }

    const status = await signUp(formData);
    if (status === "success") {
      history.push("/account");
    }
  };

  const [url, setUrl] = useState(undefined);

  return (
    <div className="sign up">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="img-upload">
          <Avatar
            className="user-pic"
            src={url}
            width="150px"
            height="150px"
            rounded
            borderWidth="12px"
          />
          <input
            type="file"
            name="avatar"
            ref={register({ required: false })}
            onChange={(e) => {
              setUrl(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </label>

        <Input
          placeholder="Full name"
          type="text"
          name="full_name"
          register={register}
          errors={errors}
        />

        <Input
          placeholder="Username"
          type="text"
          name="username"
          register={register}
          errors={errors}
          required
        />

        <Input
          placeholder="Email"
          type="email"
          name="email"
          register={register}
          errors={errors}
        />

        <Input
          placeholder="Password"
          type="password"
          name="password"
          register={register}
          errors={errors}
          required
        />

        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
};

const BackPanel = styled.div`
  padding: 0 50px;
  display: flex;
  flex-direction: ${(props) => (props.formState ? "row" : "row-reverse")};
  align-items: center;
  justify-content: space-between;
  height: 400px;
  width: 850px;
  background-color: black;
`;

const AuthForm = ({ isAuthenticated, signIn, signUp }) => {
  const [formState, toggleFormState] = useState(true);

  return isAuthenticated ? (
    <Redirect to="/account" />
  ) : (
    <div id="Auth">
      <BackPanel formState={formState}>
        {formState ? <SignIn signIn={signIn} /> : <SignUp signUp={signUp} />}
        {formState ? (
          <div className="to-sign">
            <h2>Don't have an account?</h2>
            <Button
              onClick={() => {
                toggleFormState(false);
              }}
              inverse
            >
              Sign up
            </Button>
          </div>
        ) : (
          <div className="to-sign">
            <h2>Already have an account?</h2>
            <Button
              onClick={() => {
                toggleFormState(true);
              }}
              inverse
            >
              Sign in
            </Button>
          </div>
        )}
      </BackPanel>
    </div>
  );
};

const mapStateToProps = (store) => ({
  isAuthenticated: store.account.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (credentials) => dispatch(signIn(credentials)),
  signUp: (credentials) => dispatch(signUp(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
