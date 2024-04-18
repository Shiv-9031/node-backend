import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  try {
    jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Jwt error",
          error: error,
        });
      }
      req.body.id = decode.id;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Auth Failed",
      success: false,
    });
  }
}

export default auth;
