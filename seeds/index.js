const seedUsers = require('./usersSeedData');
const seedMenu = require('./menuSeedData');
const seedOrders = require('./ordersSeedData');
const seedOrderedItems = require('./orderedItemsSeedData');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedMenu();
  console.log('\n----- MENU SEEDED -----\n');

  await seedOrders();
  console.log('\n----- ORDERS SEEDED -----\n');

  await seedOrderedItems();
  console.log('\n----- ORDERED ITEMS SEEDED -----\n');

  process.exit(0);
};

seedAll();