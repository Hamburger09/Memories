import { Container } from "@mui/material";

import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import PostDetails from "./components/PostDetails/PostDetails";

import { Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/search" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route
          path="/auth"
          element={!user ? <Auth /> : <Navigate to="/posts" />}
        />
      </Routes>
    </Container>
  );
};

export default App;
