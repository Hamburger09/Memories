import { useEffect } from "react";

import {
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import {getPost, getPostsBySearch} from '../../actions/posts'

import { useNavigate, useParams } from "react-router-dom";

import CommentSection from './CommenSection'

import  "./styles.scss";
const PostDetails = () => {
  const navigate = useNavigate();
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(id))
  }, [id,dispatch])

  useEffect(() => {
    if(post) {
      dispatch(getPostsBySearch({search: 'none', tags: post?.tags.join(',')}))
    }

  }, [post, dispatch])

  if(!post) return null

  if(isLoading) {
    return (
      <Paper elevation={6} className="loadingPaper">
        <CircularProgress size="7em"/>
      </Paper>
    )
  }

  const recommendedPosts = posts.filter(({_id}) => _id !== post._id)
  const openPost = (_id) => navigate(`/posts/${_id}`)


  return (
    <Paper style={{padding: '20px', borderRadius: "15px"}} elevation={6}>
      <div className="postDetails__card">
        <div className="section">
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
         
        </div>
        <div className="imageSection">
          <img
            className="postDetails__media"
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      <div className="section" >
            <CommentSection post={post}/>
          </div>
      {recommendedPosts.length && (
        <div className="section">
          <Typography gutterBottom variant="h5">You might also like: </Typography>
          <Divider/>
          <div className="recommendedPosts">
            {recommendedPosts.map(({title, message, name, likes, selectedFile, _id}) => (
              <div key={_id} style={{margin: "20px", cursor: "pointer"}} onClick={() => openPost(_id)}>
                <Typography gutterBottom variant="h6" >{title}</Typography>
                <Typography gutterBottom variant="subtitle2" >{name}</Typography>
                <Typography gutterBottom variant="subtitle2" >{message}</Typography>
                <Typography gutterBottom variant="subtitle1" >Likes: {likes.length}</Typography>
                <img src={selectedFile} alt="" width="200px"/>
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
