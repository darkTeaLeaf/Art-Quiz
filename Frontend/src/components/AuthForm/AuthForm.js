import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signIn, /*signUp*/ } from "../../actions/accountActions";
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
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name="username" ref={register({ required: true })} />
        {errors.username && <span>This field is required</span>}

        <input
          type="password"
          name="password"
          ref={register({ required: true })}
        />
        {errors.password && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
};

const SignUp = ({ /*signUp,*/ toggleAuthFormActive }) => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async credentials => {
    // const status = await signUp(credentials);
    // if (status === "success") {
    //   history.push("/account");
    //   toggleAuthFormActive(false);
    // }
  };

  return (
    <div className="sign-up">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" name="username" ref={register({ required: true })} />
        {errors.username && <span>This field is required</span>}

        <input type="text" name="username" ref={register({ required: true })} />
        {errors.username && <span>This field is required</span>}

        <input
          type="text"
          name="firstName"
          ref={register({ required: true })}
        />
        {errors.firstName && <span>This field is required</span>}

        <input type="text" name="lastName" ref={register({ required: true })} />
        {errors.lastName && <span>This field is required</span>}

        <input type="email" name="email" ref={register({ required: true })} />
        {errors.email && <span>This field is required</span>}

        <input
          type="password"
          name="password"
          ref={register({ required: true })}
        />
        {errors.password && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
};

const AuthForm = ({ signIn, toggleAuthFormActive }) => {
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
      <SignUp />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signIn: credentials => dispatch(signIn(credentials)),
  // signUp: credentials => dispatch(signUp(credentials))
});

export default connect(null, mapDispatchToProps)(AuthForm);
