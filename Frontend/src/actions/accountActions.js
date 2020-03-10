import axios from "axios";

export const signIn = async credentials => {
  try {
    const token = await axios.post(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/api-token-auth/`,
      credentials
    );
    console.log(token);
  } catch (error) {
    console.log(error);
  }
};
