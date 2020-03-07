import axios from "axios";

export const getAnswers = () => {
  return async (dispatch, getState) => {
    const { id } = getState().painting;
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_ADDRESS}/paintings/random/`);
    // dispatch();
  };
};
