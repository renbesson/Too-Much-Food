const router = require('express').Router();
const { Menu, Order, OrderedItems, User } = require('../../models');

// GET all open orders
router.get('/', async (req, res) => {
  try {
    const orderData = await Order.findAll({
      // JOIN with ordered items
      include: [{ model: User }, { model: OrderedItems, include: [{ model: Menu }] }]
    });
    res.status(200).json(orderData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single order
router.get('/:id', async (req, res) => {
  try {
    const orderData = await Order.findByPk(req.params.id, {
      // JOIN with ordered items
      include: [{ model: User }, { model: OrderedItems, include: [{ model: Menu }] }]
    });

    if (!orderData) {
      res.status(404).json({ message: 'No order found with this id!' });
      return;
    }

    res.status(200).json(orderData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE an order
router.post('/', async (req, res) => {
  console.log(req.body);
  Order.create(req.body)
  .then((order) => {
    // create pairings of menu items and quantity included in order through bulk create in the OrderedItems model
    if (req.body.menuIds.length) {
      console.log(req.body.qty);
      const menuIdArr = req.body.menuIds.map((menu_id, index) => {
        return {
          order_id: order.id,
          menu_id,
          quantity: req.body.qty[index],
        };
      });
      console.log(menuIdArr);
      return OrderedItems.bulkCreate(menuIdArr);
    }
    // if order is empty, create empty order
    res.status(200).json(order);
  })
  .then((menuIds) => res.status(200).json(menuIds))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

// UPDATE an order
router.put('/:id', async(req, res) => {
  // update product data
  const orders = await Order.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((order) => {
      // find all associated menu items from OrderedItems
      return OrderedItems.findAll({ where: { order_id: req.params.id } });
    })
    .then((orderedItems) => {
      // get list of current menu_ids
      const orderedItemIds = orderedItems.map(({ menu_id }) => menu_id);
      // create filtered list of new menu_ids
      const newOrderedItems = req.body.menuIds
        .filter((menu_id) => !orderedItemIds.includes(menu_id))
        .map((menu_id) => {
          return {
            order_id: req.params.id,
            menu_id,
            quantity,
          };
        });
      // figure out which ones to remove
      const orderedItemsToRemove = orderedItems
        .filter(({ menu_id }) => !req.body.menuIds.includes(menu_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        OrderedItems.destroy({ where: { id: orderedItemsToRemove } }),
        OrderedItems.bulkCreate(newOrderedItems),
      ]);
    })
    .then((updatedOrderedItems) => res.json(updatedOrderedItems))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
