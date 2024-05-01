import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    // Extract token from the authorization header
    const token = authHeader.split(" ")[1];
    console.log(token)
    // token verification
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        return res.status(400).json({ message: "Token verification failed", error: err });
      } else {
        req.user = payload;
        next();
      }
    });
  }
};

export default authMiddleware;
