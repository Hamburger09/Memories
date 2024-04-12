import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import useStyles from "./styles";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Icon from "./icon";

import Input from "./Input";

import { signIn, signUp } from "../../actions/auth";

import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const googleApiUrl = "https://www.googleapis.com/oauth2/v1/userinfo";
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signUp(formData, navigate));
    } else {
      dispatch(signIn(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () =>
    setShowPassword((previosShowPassword) => !previosShowPassword);

  const switchMode = () => {
    setIsSignUp((previosIsSignUp) => !previosIsSignUp);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    let token = res?.access_token;
    try {
      // get request to get the user's information
      const { data: result } = await axios.get(googleApiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // dispatch the token and the result to redux state
      dispatch({ type: "AUTH", data: { token, result } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = async (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try again later.");
  };

  const googleLogin = useGoogleLogin({
    scope:'openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    auto_select: true,
    onSuccess: googleSuccess,
    onError: googleFailure,
    select_account: false,
    flow: "implicit",
  });

  //   "Not a valid origin for the client: http://localhost:5173 has not been registered for client ID 733987035812-e94fc6me1u9mteucjblmung78a1g0na0.apps.googleusercontent.com. Please go to https://console.developers.google.com/ and register this origin for your project's client ID."

  // "You have created a new client application that uses libraries for user authentication or authorization that are deprecated. New clients must use the new libraries instead. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form action="" className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>

          {/* <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("login failed");
            }}
          /> */}

          <Button
            className={classes.googleButton}
            color="primary"
            fullWidth
            onClick={() => googleLogin()}
            // disabled={renderProps.disabled}
            startIcon={<Icon />}
            variant="contained">
            Google Sign In
          </Button>
          <Grid container justifyContent="flex-start">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account?"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
