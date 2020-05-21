import axios from "axios";
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  UPDATE_USER_DATA,
  GET_USER_DATA_FAILURE,
  SIGN_OUT,
  SUGGEST_PAINTING,
  SUGGEST_PAINTING_SUCCESS,
  SUGGEST_PAINTING_FAILURE,
  GET_REQUESTS,
  GET_REQUESTS_SUCCESS,
  GET_REQUESTS_FAILURE,
  ACCEPT_REQUEST,
  ACCEPT_REQUEST_SUCCESS,
  ACCEPT_REQUEST_FAILURE,
  DECLINE_REQUEST,
  DECLINE_REQUEST_SUCCESS,
  DECLINE_REQUEST_FAILURE,
} from "../constants";

import { toFormData } from "../helpers";

const statuses = ["Rejected", "Accepted", "Edited and accepted", "In progress"];

const signInSuccess = (id) => ({
  type: SIGN_IN_SUCCESS,
  payload: {
    id,
    isAuthenticated: true,
  },
});

const signInFailure = () => ({
  type: SIGN_IN_FAILURE,
  payload: {},
});

export const signIn = (credentials) => {
  return async (dispatch) => {
    try {
      const {
        data: { token, id },
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

const signUpSuccess = (id) => ({
  type: SIGN_UP_SUCCESS,
  payload: {
    id,
    isAuthenticated: true,
  },
});

const signUpFailure = () => ({
  type: SIGN_UP_FAILURE,
  payload: {},
});

export const signUp = (credentials) => {
  return async (dispatch) => {
    try {
      const {
        data: { token, id },
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
  is_staff,
  achievements,
  statistic: { win_rate, games_total, wins_total },
}) => ({
  type: UPDATE_USER_DATA,
  payload: {
    username,
    email,
    avatar,
    isModerator: is_staff,
    achievements,
    statistic: {
      winRate: (win_rate * 100).toFixed(2),
      gamesTotal: games_total,
      winsTotal: wins_total,
    },
    firstName: first_name,
    lastName: last_name,
  },
});

const getUserDataFailure = () => ({
  type: GET_USER_DATA_FAILURE,
  payload: {},
});

export const getUserData = () => {
  return async (dispatch, getState) => {
    try {
      const id = getState().account.id;
      const token = localStorage.getItem("token");
      const { data: userData } = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/users/${id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

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

const suggestPaintingSuccess = (data) => ({
  type: SUGGEST_PAINTING_SUCCESS,
  data,
});

const suggestPaintingFailure = (error) => ({
  type: SUGGEST_PAINTING_FAILURE,
  error,
});

export const suggestPainting = (pData) => {
  return async (dispatch) => {
    dispatch({ type: SUGGEST_PAINTING });
    const userId = localStorage.getItem("id");

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/users/${userId}/requests/`,
        toFormData({ ...pData, image: pData.image[0] }),
        {
          headers: {
            Authorization: `Token ${process.env.REACT_APP_STAFF_TOKEN}`,
          },
        }
      );

      dispatch(
        suggestPaintingSuccess({ ...data, status: statuses[data.status] })
      );
    } catch (error) {
      dispatch(suggestPaintingFailure("error"));
    }
  };
};

const getRequestsSuccess = (data) => ({
  type: GET_REQUESTS_SUCCESS,
  data,
});

const getRequestsFailure = (error) => ({
  type: GET_REQUESTS_FAILURE,
  error,
});

export const getRequests = () => {
  return async (dispatch) => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    dispatch({ type: GET_REQUESTS });

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/users/${userId}/requests/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      dispatch(
        getRequestsSuccess(
          data
            .reverse()
            .slice(0, 20)
            .map((r) => ({ ...r, status: statuses[r.status] }))
        )
      );
    } catch (error) {
      dispatch(getRequestsFailure("error"));
    }
  };
};

export const getRequestsAll = () => {
  return async (dispatch) => {
    dispatch({ type: GET_REQUESTS });

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/requests/`,
        {
          headers: {
            Authorization: `Token ${process.env.REACT_APP_STAFF_TOKEN}`,
          },
        }
      );

      dispatch(
        getRequestsSuccess(
          data.reverse().map((r) => ({ ...r, status: statuses[r.status] }))
        )
      );
    } catch (error) {
      dispatch(getRequestsFailure("error"));
    }
  };
};

const acceptRequestSuccess = (data) => ({
  type: ACCEPT_REQUEST_SUCCESS,
  data,
});

const acceptRequestFailure = (error) => ({
  type: ACCEPT_REQUEST_FAILURE,
  error,
});

export const acceptRequest = (pData, id) => {
  return async (dispatch) => {
    const { image, ...rest } = pData;

    const formData = toFormData({
      ...rest,
      ...(image.length ? { image: image[0] } : {}),
    });

    dispatch({
      type: ACCEPT_REQUEST,
    });

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/requests/${id}/edit/`,
        formData,
        {
          headers: {
            Authorization: `Token ${process.env.REACT_APP_STAFF_TOKEN}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(acceptRequestSuccess(data));
    } catch (error) {
      dispatch(acceptRequestFailure("error"));
    }
  };
};

const declineRequestSuccess = (id) => ({ type: DECLINE_REQUEST_SUCCESS, id });
const declineRequestFailure = (error) => ({
  type: DECLINE_REQUEST_FAILURE,
  error,
});

export const declineRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: DECLINE_REQUEST });

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/requests/${id}/decline/`,
        {},
        {
          headers: {
            Authorization: `Token ${process.env.REACT_APP_STAFF_TOKEN}`,
          },
        }
      );

      dispatch(declineRequestSuccess(id));
    } catch (error) {
      dispatch(declineRequestFailure("error"));
    }
  };
};
