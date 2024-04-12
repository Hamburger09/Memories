import { AUTH } from "../constants/actionTypes";

import * as api from "../api/index";

const signIn = (formData, navigate) => async (dispatch) => {
  try {
    // log in the user
    const {data} = await api.signIn(formData);

    dispatch({type: AUTH, data})
    navigate("/");
  } catch (error) {
    console.error(error);
  }
};

const signUp = (formData, navigate) => async (dispatch) => {
  try {
    // sign up the user
    const {data} = await api.signUp(formData);

    dispatch({type: AUTH, data})

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export { signIn, signUp };
