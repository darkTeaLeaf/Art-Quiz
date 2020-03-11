import axios from "axios";
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from "../constants";

const signInSuccess = () => ({
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
        data: { token }
      } = await axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/api-token-auth/`,
        credentials
      );

      localStorage.setItem("token", token);
      dispatch(signInSuccess());
      return "success";
    } catch (error) {
      dispatch(signInFailure());
      return error.message;
    }
  };
};
