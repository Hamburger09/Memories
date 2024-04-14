/* eslint-disable react/prop-types */
import Post from "./Post/Post";
import "./styles.scss";

import { CircularProgress, Grid } from "@mui/material";

import { useSelector } from "react-redux";

const Posts = ({setCurrentId}) => {
  
  const {posts, isLoading} = useSelector((state) => {
    return state.posts;
  });

  if(!posts.length && !isLoading)return "No posts found"
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className="mainContainer"
      container
      alignItems="stretch"
      spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
