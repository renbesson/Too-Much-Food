const router = require("express").Router();
const authRoutes = require("./authRoutes");
//const orderRoutes = require('./orderRoutes');
const menuRoutes = require('./menuRoutes');
//const reportRoutes = require('./reportRoutes');

router.use("/", authRoutes);
//router.use('/orders', orderRoutes);
router.use('/menu', menuRoutes);
//router.use('/reports', reportRoutes);

module.exports = router;
