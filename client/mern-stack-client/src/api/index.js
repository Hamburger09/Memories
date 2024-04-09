import axios from 'axios'

const url = `http://localhost:3000/posts`

// fetch all the posts
const fetchPosts = () => axios.get(url);

// create a new post
const createPost = (newPost) => axios.post(url, newPost)

export {
    fetchPosts,
    createPost,
}