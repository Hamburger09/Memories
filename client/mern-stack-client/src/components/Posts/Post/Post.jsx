/* eslint-disable react/prop-types */
import  "./styles.scss";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import moment from "moment";

import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
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
      className="card"
      raised
      elevation={6}
      style={{ cursor: "pointer" }}>
      <div onClick={openPost}>
        <CardMedia
          className="media"
          image={post.selectedFile}
          title={post.title}
        />

        <div className="card__overlay">
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>

        <div className="card__details">
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className="card__title" variant="h5" gutterBottom>
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
        <div className="card__overlay2">
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon />
          </Button>
        </div>
      )}

      <CardActions className="card__cardActions">
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
