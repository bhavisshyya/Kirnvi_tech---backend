const jwt = require("jsonwebtoken");

//verifying token (checkin whether use is loggedin or not)
const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) res.status(401).send("You are not authenticated");

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) res.status(403).send("invalid token");
    req.user = user; //creating new user field in our request
    next();
  });
};

module.exports = verifyToken;
