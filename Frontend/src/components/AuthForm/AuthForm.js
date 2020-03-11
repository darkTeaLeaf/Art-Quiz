import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signIn } from "../../actions/accountActions";
import "./AuthForm.css";

const SignIn = ({ signIn, setIsAuthFormActive }) => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async credentials => {
    const status = await signIn(credentials);
    if (status === "success") {
      history.push("/account");
      setIsAuthFormActive(false);
    }
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

const AuthForm = ({ signIn, setIsAuthFormActive }) => {
  return (
    <div id="AuthForm">
      <SignIn signIn={signIn} setIsAuthFormActive={setIsAuthFormActive} />
      <SignUp />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signIn: credentials => dispatch(signIn(credentials))
});

export default connect(null, mapDispatchToProps)(AuthForm);
