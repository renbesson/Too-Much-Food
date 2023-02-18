const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

router.get("/", async (req, res) => {
  const isLogged = req.session.isLogged;

  try {
    res.render("homepage", {
      isLogged,
    });
  } catch (error) {
    res.render("error", {
      isLogged,
      error,
    });
  }
});

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
