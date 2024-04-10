import * as api from "../api";
import {
  CREATE,
  DELETE,
  FETCH_ALL,
  UPDATE,
} from "../constants/actionTypes";

// action creators
const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({
      type: FETCH_ALL,
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({
      type: UPDATE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export { createPost, deletePost, getPosts, likePost, updatePost };
