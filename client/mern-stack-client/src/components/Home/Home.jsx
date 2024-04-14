import { useState } from "react";

import {
  AppBar,
  Button,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../actions/posts";

import Form from "../Form/Form";
import Pagination from "../Pagination";
import Posts from "../Posts/Posts";

import { useLocation, useNavigate } from "react-router-dom";

import {MuiChipsInput } from "mui-chips-input";

import  "../../styles.scss";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState(undefined);
  const [tags, setTags] = useState([]);
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
          className="gridContainer"
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}>
          <Grid item xs={12} sm={12} md={8}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AppBar
              className="appBar"
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
              <MuiChipsInput 
                style={{ margin: "10px 0" }}
                fullWidth
                value={tags}
                onChange={handleAdd}
                onDeleteChip={handleDelete}
                hideClearAll
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className='appBar__searchButton'
                variant="contained"
                color="primary">
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6} className="pagination">
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
