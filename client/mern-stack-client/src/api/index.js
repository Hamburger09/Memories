import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});
// fetch all the posts
const fetchPosts = (page) => API.get(`/posts?page=${page}`);

// fetch the posts by search
const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags || 'none'}`
  );



// create a new post
const createPost = (newPost) => API.post("/posts", newPost);

// update the post
const updatePost = (id, updatedPost) =>
  API.patch(`${"/posts"}/${id}`, updatedPost);

// delete the post
const deletePost = (id) => API.delete(`${"/posts"}/${id}`);

// like the post
const likePost = (id) => API.patch(`${"/posts"}/${id}/likePost`);

// auth api
const signIn = (formData) => API.post("/user/signin", formData);
const signUp = (formData) => API.post("/user/signup", formData);

export {
  createPost,
  deletePost,
  fetchPosts,
  likePost,
  signIn,
  signUp,
  updatePost,
  fetchPostsBySearch
};
