const router = require('express').Router();
const authRoutes = require('./authRoutes');
const orderRoutes = require('./orderRoutes');
const menuRoutes = require('./menuRoutes');
const reportRoutes = require('./reportRoutes');
const userRoutes = require('./userRoutes');

router.use('/auth', authRoutes);
router.use('/orders', orderRoutes);
router.use('/menu', menuRoutes);
router.use('/reports', reportRoutes);
router.use('/users', userRoutes);

module.exports = router;
