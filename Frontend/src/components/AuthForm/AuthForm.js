import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signIn, signUp } from "../../actions/accountActions";
import "./AuthForm.css";

const Input = ({ label, type, name, required, register, errors }) => {
  return (
    <label>
      {label}
      <input type={type} name={name} ref={register({ required })} />
      {errors[name] && <span>The {label} field is required</span>}
    </label>
  );
};

const SignIn = ({ signIn, toggleAuthFormActive }) => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async credentials => {
    const status = await signIn(credentials);
    if (status === "success") {
      history.push("/account");
      toggleAuthFormActive(false);
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

const SignUp = ({ signUp, toggleAuthFormActive }) => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async credentials => {
    let formData = new FormData();
    for (let key in credentials) {
      formData.append(key, credentials[key]);
    }
    formData.set("avatar", credentials.avatar[0]);

    const status = await signUp(formData);
    if (status === "success") {
      history.push("/account");
      toggleAuthFormActive(false);
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
          required
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
          label="First name"
          type="text"
          name="first_name"
          register={register}
          errors={errors}
          required
        />

        <Input
          label="Last name"
          type="text"
          name="last_name"
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

const AuthForm = ({ signIn, signUp, toggleAuthFormActive }) => {
  return (
    <div id="AuthForm">
      <button
        className="close"
        onClick={() => {
          toggleAuthFormActive(false);
        }}
      >
        ✕
      </button>

      <SignIn signIn={signIn} toggleAuthFormActive={toggleAuthFormActive} />
      <SignUp signUp={signUp} toggleAuthFormActive={toggleAuthFormActive} />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signIn: credentials => dispatch(signIn(credentials)),
  signUp: credentials => dispatch(signUp(credentials))
});

export default connect(null, mapDispatchToProps)(AuthForm);
