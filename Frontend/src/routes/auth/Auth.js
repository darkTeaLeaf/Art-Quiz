import React from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signIn, signUp } from "../../actions/accountActions";
import "./Auth.css";

const Input = ({ label, type, name, required = false, register, errors }) => {
  return (
    <label>
      {label}
      <input type={type} name={name} ref={register({ required })} />
      {errors[name] && <span>The {label} field is required</span>}
    </label>
  );
};

const SignIn = ({ signIn }) => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async credentials => {
    const status = await signIn(credentials);
    if (status === "success") {
      history.push("/account");
    }
  };

  return (
    <div className="sign-in">
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Username"
          type="text"
          name="username"
          register={register}
          errors={errors}
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          register={register}
          errors={errors}
          required
        />

        <input type="submit" />
      </form>
    </div>
  );
};

const SignUp = ({ signUp }) => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async credentials => {
    const [first_name, last_name] = credentials.full_name.trim().split(/\s+/);
    credentials = {
      ...credentials,
      first_name: first_name || "",
      last_name: last_name || "",
      avatar: credentials.avatar[0]
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

  return (
    <div className="sign-up">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Avatar"
          type="file"
          name="avatar"
          register={register}
          errors={errors}
        />

        <Input
          label="Full name"
          type="text"
          name="full_name"
          register={register}
          errors={errors}
        />

        <Input
          label="Username"
          type="text"
          name="username"
          register={register}
          errors={errors}
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          register={register}
          errors={errors}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          register={register}
          errors={errors}
          required
        />

        <input type="submit" />
      </form>
    </div>
  );
};

const AuthForm = ({ isAuthenticated, signIn, signUp }) => {
  return isAuthenticated ? (
    <Redirect to="/account" />
  ) : (
    <div id="Auth">
      <SignIn signIn={signIn} />
      <SignUp signUp={signUp} />
    </div>
  );
};

const mapStateToProps = store => ({
  isAuthenticated: store.account.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  signIn: credentials => dispatch(signIn(credentials)),
  signUp: credentials => dispatch(signUp(credentials))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
