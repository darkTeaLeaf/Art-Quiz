import axios from "axios";
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_OUT } from "../constants";

export const signInSuccess = () => ({
  type: SIGN_IN_SUCCESS,
  payload: {
    isAuthenticated: true
  }
});

const signInFailure = () => ({
  type: SIGN_IN_FAILURE,
  payload: ""
});

export const signIn = credentials => {
  return async dispatch => {
    try {
      const {
        data: { token, id }
      } = await axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/api-token-auth/`,
        credentials
      );

      localStorage.setItem("token", token);
      localStorage.setItem("id", id);

      dispatch(signInSuccess());
      return "success";
    } catch (error) {
      dispatch(signInFailure());
      return error.message;
    }
  };
};

export const signOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");

  return { type: SIGN_OUT, payload: { isAuthenticated: false } };
};
