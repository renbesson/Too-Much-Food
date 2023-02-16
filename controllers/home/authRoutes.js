const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

router.get("/signup",(req, res) => {
  if (req.session.isLogged) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/signin", (req, res) => {
  if (req.session.isLogged) {
    res.redirect("/");
    return;
  }

  res.render("signin");
});

router.get("/signout", (req, res) => {
    if (req.session.isLogged) {
      res.redirect("/");
      return;
    }
  
    res.render("signin");
  });

module.exports = router;
