const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/config");
const users = require("../../data/Models/users");



module.exports = user => {
  const jwtPayload = {
    subject: user.id,
    username: user.username,
    roles: [...user.roles],
  };

  const jwtOptions = {
    expiresIn: "1d",
  };

  return jwt.sign(jwtPayload, jwtSecret, jwtOptions);
};