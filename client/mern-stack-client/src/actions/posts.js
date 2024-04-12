import * as api from "../api";
import {
  CREATE,
  DELETE,
  END_LOADING,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  START_LOADING,
  UPDATE,
} from "../constants/actionTypes";

// action creators
const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);

    dispatch({
      type: FETCH_ALL,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({ type: END_LOADING });
  }
};

const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({
      type: FETCH_BY_SEARCH,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({ type: END_LOADING });
  }
};

const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  } finally {
    dispatch({ type: END_LOADING });
  }
};

const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({ type: END_LOADING });
  }
};

const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({ type: END_LOADING });
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

export {
  createPost,
  deletePost,
  getPosts,
  getPostsBySearch,
  likePost,
  updatePost,
};
