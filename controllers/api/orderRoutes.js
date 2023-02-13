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
  try {
    const orderData = await Order.create(req.body);
    res.status(200).json(orderData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE an order
router.put('/:id', async (req, res) => {
  try {
    const orderData = await Order.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!orderData) {
      res.status(404).json({ message: 'No order found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Updated!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
