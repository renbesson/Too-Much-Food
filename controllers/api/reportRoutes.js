const router = require('express').Router();
const { OrderedItems, Menu, User, Order } = require('../../models');
const auth = require('../../utils/isLogged');
const { Op } = require("sequelize");

// GET all ordered items
router.get('/', auth, async (req, res) => {
  const isLogged = req.session.isLogged;
  try {
    const orderedItemsData = await OrderedItems.findAll({
    // JOIN with order data
    include: [{ model: Order, include:[{ model: User}] }, { model: Menu }]
  });
  const orderedItems = orderedItemsData.map((order) => order.get({ plain: true }));
  const userData = await User.findByPk(req.session.user_id, {
    attributes: { exclude: ['password'] },
  });
  const user = userData.get({ plain: true });
  res.render("report", {
    orderedItems,
    ...user,
    isLogged,
  });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/today', auth, async (req, res) => {
  const isLogged = req.session.isLogged;
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    const user = userData.get({ plain: true });
    const orderedItemsData = await OrderedItems.findAll({
    // JOIN with order data
    include: [{ model: Order, 
      include:[{ model: User}], where: {date: {
      [Op.eq]: Date.now()
    }
    }}, { model: Menu }]
  });
  const orderedItems = orderedItemsData.map((order) => order.get({ plain: true }));
  res.render("report", {
    orderedItems,
    ...user,
    isLogged,
  });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
