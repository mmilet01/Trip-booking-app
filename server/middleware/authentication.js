const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (token !== "null") {
    try {
      const payload = jwt.verify(token, "bigSecret");
      req.user = payload;
      next();
    } catch (err) {
      return res.status(500).json({
        msg: "Verification failed, token not valid, autorization denied"
      });
    }
  }
}

module.exports = auth;
