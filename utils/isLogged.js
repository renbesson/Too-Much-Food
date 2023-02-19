const isLogged = (req, res, next) => {
  if (!req.session.isLogged) {
    res.redirect("/signin");
  } else {
    next();
  }
};

module.exports = isLogged;
