const router = require("express").Router();
const { Order, User, Menu, OrderedItems } = require("../models");
const withAuth = require("../utils/isLogged");

///////////////////////////////////////////////////////////////////////////////
// Render home page
///////////////////////////////////////////////////////////////////////////////
router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      isLogged: req.session.isLogged,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

///////////////////////////////////////////////////////////////////////////////
// Render profile page
///////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////
// Render login page
///////////////////////////////////////////////////////////////////////////////
router.get("/login", (req, res) => {
  if (req.session.isLogged) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;

///////////////////////////////////////////////////////////////////////////////
// Render orders page
///////////////////////////////////////////////////////////////////////////////
router.get("/orders", withAuth, async (req, res) => {
  try {
    const ordersData = await Order.findAll({
      include: [{ model: User }, { model: Menu, through: OrderedItems }],
    });

    const orders = ordersData.map((order) => order.get({ plain: true }));

    console.log(orders);

    res.render("orders", {
      orders,
      isLogged: req.session.isLogged,
    });
  } catch (error) {
    console.log(error);
    res.render("error", {
      error,
    });
  }
});
