const jwt = require("jsonwebtoken");
const config = require("config");

const { body, validationResult } = require("express-validator");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorisation denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user; // assign user data extracted from the payload to authenticated request
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
