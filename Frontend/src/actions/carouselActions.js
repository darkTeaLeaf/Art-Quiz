import axios from "axios";
import { BACKEND_ADDRESS } from "../constants";

export const getAnswers = () => {
  return async (dispatch, getState) => {
    const { id } = getState().painting;
    const { data } = await axios.get(`${BACKEND_ADDRESS}/paintings/random/`);
    dispatch();
  };
};
