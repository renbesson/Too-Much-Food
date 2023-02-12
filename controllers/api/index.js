const router = require('express').Router();
const orderRoutes = require('./orderRoutes');
const menuRoutes = require('./menuRoutes');
const reportRoutes = require('./reportRoutes');

router.use('/orders', orderRoutes);
router.use('/menu', menuRoutes);
router.use('/reports', reportRoutes);

module.exports = router;
