import axios from "axios";
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  SIGN_OUT
} from "../constants";

const signInSuccess = () => ({
  type: SIGN_IN_SUCCESS,
  payload: {
    isAuthenticated: true
  }
});

const signInFailure = () => ({
  type: SIGN_IN_FAILURE,
  payload: {}
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

const signUpSuccess = () => ({
  type: SIGN_UP_SUCCESS,
  payload: {
    isAuthenticated: true
  }
});

const signUpFailure = () => ({
  type: SIGN_UP_FAILURE,
  payload: {}
});

export const signUp = credentials => {
  return async dispatch => {
    try {
      const {
        data: { token, id }
      } = await axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/users/`,
        credentials,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      localStorage.setItem("token", token);
      localStorage.setItem("id", id);

      dispatch(signUpSuccess());
      return "success";
    } catch (error) {
      dispatch(signUpFailure());
      return error.message;
    }
  };
};

const getUserDataSuccess = () => ({
  type: GET_USER_DATA_SUCCESS,
  payload: {
    isAuthenticated: true
  }
});

const getUserDataFailure = () => ({
  type: GET_USER_DATA_FAILURE,
  payload: {}
});

export const getUserData = () => {
  return async dispatch => {
    try {
      dispatch(getUserDataSuccess());
      return "success";
    } catch (error) {
      dispatch(getUserDataFailure());
      return error.message;
    }
  };
};


export const signOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");

  return { type: SIGN_OUT, payload: { isAuthenticated: false } };
};
