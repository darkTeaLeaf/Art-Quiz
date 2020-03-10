import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import {signIn} from "../../actions/accountActions";
import "./AuthForm.css";

const SignIn = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    signIn(data);
  };

  return (
    <div className="sign-in">
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="username" ref={register({ required: true })} />
        {errors.username && <span>This field is required</span>}

        <input name="password" ref={register({ required: true })} />
        {errors.password && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
};

const SignUp = () => {
  return <div className="sign-up"></div>;
};

const AuthForm = () => {
  return (
    <div id="AuthForm">
      <SignIn />
      <SignUp />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signIn: () => dispatch(signIn()),
});

export default connect(null, mapDispatchToProps)(AuthForm);
