const jwt = require("jsonwebtoken");
module.exports.createToken = async (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  //   return token;
};
