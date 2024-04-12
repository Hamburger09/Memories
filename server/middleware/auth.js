import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodedData;

    // Function to check if the token is a JWT token
    function isJWT(token) {
      const parts = token.split(".");
      return parts.length === 3;
    }

    const getGoogleId = async () => {
      try {
        const response = await fetch(
          "https://people.googleapis.com/v1/people/me?personFields=names",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        return data.resourceName.split("/")[1];
      } catch (error) {
        console.log(error);
      }
    };

    if (token && isJWT(token)) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } else {
      const googleId = await getGoogleId();
      req.userId = googleId;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
