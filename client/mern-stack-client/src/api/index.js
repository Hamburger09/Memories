import axios from 'axios'

const url = `http://localhost:3000/posts`

// fetch all the posts
const fetchPosts = () => axios.get(url);

// create a new post
const createPost = (newPost) => axios.post(url, newPost)

// update the post
const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)

// delete the post
const deletePost = (id) => axios.delete(`${url}/${id}`)

// like the post
const likePost = (id) => axios.patch(`${url}/${id}/likePost`)

export {
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    likePost
}