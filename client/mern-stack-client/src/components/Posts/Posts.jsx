/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Post from "./Post/Post";
import useStyles from "./styles";

import { CircularProgress, Grid } from "@material-ui/core";

import { useSelector } from "react-redux";

const Posts = ({setCurrentId}) => {
  
  const {posts, isLoading} = useSelector((state) => {
    return state.posts;
  });
  const classes = useStyles();

  if(!posts.length && !isLoading)return "No posts found"
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
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
