const router = require('express').Router();
const { Menu } = require('../../models');

router.get("/menu",(req, res) => {
  if (req.session.isLogged) {
    res.render("/menu");
    return;
  }

  res.redirect("signin");
});

router.get("/menu/:id", (req, res) => {
  if (req.session.isLogged) {
    res.render("/menu/:id");
    return;
  }

  res.redirect("signin");
});

module.exports = router;
