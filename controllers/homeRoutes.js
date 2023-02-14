const router = require("express").Router();
const { Order, User } = require("../models");
const withAuth = require("../utils/isLogged");

router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      isLogged: req.session.isLogged,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      // include: [{ model: Order }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      isLogged: true,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.isLogged) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
