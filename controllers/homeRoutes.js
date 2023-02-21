const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  const isLogged = req.session.isLogged;

  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });
    res.render("homepage", {
      ...user,
      isLogged,
    });
  } catch (error) {
    res.render("homepage", {
      isLogged,
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

router.get("/about",(req, res) => {
  const isLogged = req.session.isLogged;
  res.render("about", {
    isLogged,
  });
});

module.exports = router;
