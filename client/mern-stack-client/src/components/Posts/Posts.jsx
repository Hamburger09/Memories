import Post from "./Post/Post";
import useStyles from "./styles";

import { CircularProgress, Grid } from "@material-ui/core";

import { useSelector } from "react-redux";

const Posts = () => {
  const posts = useSelector((state) => {
    return state.posts;
  });
  const classes = useStyles();
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
