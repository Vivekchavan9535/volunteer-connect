import jwt from "jsonwebtoken";

const userAuthentication = (req, res, next) => {
  try {
    const token = req.headers.authorization;
     console.log("TOKEN:", token);

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default userAuthentication;