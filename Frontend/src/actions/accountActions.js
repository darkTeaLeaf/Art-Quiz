import axios from "axios";
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  UPDATE_USER_DATA,
  GET_USER_DATA_FAILURE,
  SIGN_OUT
} from "../constants";

const signInSuccess = id => ({
  type: SIGN_IN_SUCCESS,
  payload: {
    id,
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

      dispatch(signInSuccess(id));
      return "success";
    } catch (error) {
      dispatch(signInFailure());
      return error.message;
    }
  };
};

const signUpSuccess = id => ({
  type: SIGN_UP_SUCCESS,
  payload: {
    id,
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

      dispatch(signUpSuccess(id));
      return "success";
    } catch (error) {
      dispatch(signUpFailure());
      return error.message;
    }
  };
};

const updateUserData = ({
  username,
  email,
  first_name,
  last_name,
  avatar,
  achievements,
  statistic
}) => ({
  type: UPDATE_USER_DATA,
  payload: {
    username,
    email,
    avatar,
    achievements,
    statistic,
    firstName: first_name,
    lastName: last_name,
  }
});

const getUserDataFailure = () => ({
  type: GET_USER_DATA_FAILURE,
  payload: {}
});

export const getUserData = () => {
  return async (dispatch, getState) => {
    try {
      // const id = getState().account.id;
      // const userData = await axios.get(
      //   `${process.env.REACT_APP_BACKEND_ADDRESS}/users/${id}`
      // );

      // TODO: replace by real data from request to backend
      const userData = {
        id: 3,
        username: "irek",
        password:
          "pbkdf2_sha256$180000$1yVyW9K5i6pa$/2i0uU8+LahweS2bCj7XSUXwpjiVQXXVVLeXtwSTQoQ=",
        email: "irek_nazmiev@mail.ru",
        first_name: "Irek",
        last_name: "Nazmiev",
        avatar:
          "http://localhost:8000/media/users/%D0%B1%D0%BE%D0%B1%D1%803.jpg",
        achievements: [],
        statistic: { id: 1, win_rate: 0, games_total: 0, wins_total: 0 }
      };

      dispatch(updateUserData(userData));
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

  return { type: SIGN_OUT, payload: { id: null, isAuthenticated: false } };
};
