import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.scss";

import { useEffect, useState } from "react";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";

import { useDispatch } from "react-redux";

import { useLocation,  } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem("profile")));

    // Function to check if the token is a JWT token
    function isJWT() {
      const parts = token.split(".");
      return parts.length === 3;
    }

    if (token && isJWT()) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    window.location.reload();
  };

  return (
    <AppBar className="navBar" position="static" color="inherit">
      <Link className="navBar__brandContainer" to="/">
       <img src={memoriesText} alt="icon" height="45px" />
        <img
          className="navBar__image"
          src={memoriesLogo}
          alt="memories"
          height="40px"
        />
      </Link>
      <Toolbar className="navBar__toolbar">
        {user ? (
          <div className="navBar__profile">
            <Avatar
              className="purple"
              alt={user.result.name}
              src={user.result.picture}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className="navBar__userName" variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className="navBar__logout"
              color="secondary"
              onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
