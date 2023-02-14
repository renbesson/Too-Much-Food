const router = require('express').Router();
const { Order, OrderedItems } = require('../../models');

// GET all open orders
router.get('/', async (req, res) => {
  try {
    const orderData = await Order.findAll();
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
      include: [{ model: OrderedItems }, ]
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
  // try {
  //   const orderData = await Order.create(req.body);
  //   res.status(200).json(orderData);
  // } catch (err) {
  //   res.status(400).json(err);
  // }
  Order.create(req.body)
  .then((order) => {
    // create pairings of menu items included in order through bulk create in the OrderedItems model
    if (req.body.orderedItemIds.length) {
      const orderedItemIdArr = req.body.orderedItemIds.map((menu_id) => {
        return {
          order_id: order.id,
          menu_id,
          quantity,
        };
      });
      return OrderedItems.bulkCreate(orderedItemIdArr);
    }
    // if order is empty, create empty order
    res.status(200).json(order);
  })
  .then((orderedItemIds) => res.status(200).json(orderedItemIds))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

// UPDATE an order
// router.put('/:id', async (req, res) => {
//   try {
//     const orderData = await Order.update(req.body, {
//       where: {
//         id: req.params.id
//       }
//     });

//     if (!orderData) {
//       res.status(404).json({ message: 'No order found with this id!' });
//       return;
//     }

//     res.status(200).json({ message: 'Updated!' });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
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
