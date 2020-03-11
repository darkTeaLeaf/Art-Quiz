import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signIn } from "../../actions/accountActions";
import "./AuthForm.css";

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
      <button className="close" onClick={() => {toggleAuthFormActive(false)}}>✕</button>
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

const AuthForm = ({ signIn, toggleAuthFormActive }) => {
  return (
    <div id="AuthForm">
      <SignIn signIn={signIn} toggleAuthFormActive={toggleAuthFormActive} />
      <SignUp />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signIn: credentials => dispatch(signIn(credentials))
});

export default connect(null, mapDispatchToProps)(AuthForm);
