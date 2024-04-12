import { useEffect, useState } from "react";

import {
  AppBar,
  Button,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
} from "@material-ui/core";

import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/posts";

import Form from "../Form/Form";
import Pagination from "../Pagination";
import Posts from "../Posts/Posts";

import { useLocation, useNavigate } from "react-router-dom";

import ChipInput from "material-ui-chip-input";

import useStyles from "../../styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState(undefined);
  const [tags, setTags] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery =  query.get("searchQuery")

  const searchPost = () => {
    if (search.trim() || tags) {
      // dispatch -> fetch search posts
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  // useEffect(() => {
  //   if (searchQuery) {
  //     dispatch(getPostsBySearch({ searchQuery, tags: tags.join(",") }));
  //   }
  // }, []);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      // search post
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}>
          <Grid item xs={12} sm={12} md={8}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                onKeyDown={handleKeyDown}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary">
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
