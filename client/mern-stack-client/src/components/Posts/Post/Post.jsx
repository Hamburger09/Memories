/* eslint-disable react/prop-types */
import useStyles from "./styles";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import moment from "moment";

import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();

  const [likes, setLikes] = useState(post?.likes)

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === userId
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;{" "}
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${
                likes.length > 1 ? "s" : ""
              }`}{" "}
        </>
      ) : (
        <>
          {" "}
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp; {likes.length}{" "}
          {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" /> &nbsp; Like
      </>
    );
  };
  console.log(post)

  const userId = user?.result.id || user?.result?._id

  const hasLikedPost = post.likes.find(
    (like) => like === userId)

  const handleDelete = (e) => {
    e.preventDefault();
     dispatch(deletePost(post._id));
  };

  const handleLike = async () => {
    dispatch(likePost(post._id))
    if(hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId))
    } else {
      setLikes([...post.likes, userId])
    }
  }

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };
  return (
    <Card
      className={classes.card}
      raised
      elevation={6}
      style={{ cursor: "pointer" }}>
      <div onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />

        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>

        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
      </div>
      {(user?.result.id === post?.creator ||
        user?.result._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon />
          </Button>
        </div>
      )}

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}>
          <Likes />
        </Button>
        {(user?.result.id === post?.creator ||
          user?.result._id === post?.creator) && (
          <form action="" onSubmit={handleDelete}>
            <Button size="small" color="secondary" type="submit">
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          </form>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
