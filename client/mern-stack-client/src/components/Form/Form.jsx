/* eslint-disable react/prop-types */
import { Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./styles.scss";

import FileBase64 from "react-file-base64";

import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { MuiChipsInput } from "mui-chips-input";

const Form = ({ currentId, setCurrentId }) => {
  const navigate = useNavigate();
  const post = useSelector((state) => {
    return currentId
      ? state.posts.posts.find((p) => p._id === currentId)
      : null;
  });

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result.name }));
    } else {
      dispatch(createPost({ ...postData, name: user?.result.name }, navigate));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result.name) {
    return (
      <Paper className="paper" elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other&apos;s
          memories.
        </Typography>
      </Paper>
    );
  }

  const handleDeleteChip = (tagToDelete) =>
    setPostData({...postData, tags: postData.tags.filter((tag) => tag !== tagToDelete)});
  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: tag });
  };

  return (
    <Paper className="paper" elevation={6}>
      <form
        action=""
        autoComplete="off"
        noValidate
        className="postsForm"
        onSubmit={handleSubmit}>
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <MuiChipsInput
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={handleAddChip}
          onDeleteChip={handleDeleteChip}
        />
        <div className="postsForm__fileInput">
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className="postsForm__submitButton"
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth>
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
