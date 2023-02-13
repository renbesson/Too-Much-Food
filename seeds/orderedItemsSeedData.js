const { OrderedItems } = require('../models');

const orderedItemData = [
    {
        "order_id": 1,
        "menu_id": 4,
        "quantity": 1
    },
    {
        "order_id": 1,
        "menu_id": 9,
        "quantity": 2
    },
    {
        "order_id": 2,
        "menu_id": 20,
        "quantity": 1
    },
    {
        "order_id": 3,
        "menu_id": 16,
        "quantity": 3
    },
    {
        "order_id": 3,
        "menu_id": 1,
        "quantity": 1
    },
    {
        "order_id": 4,
        "menu_id": 2,
        "quantity": 1
    },
    {
        "order_id": 4,
        "menu_id": 17,
        "quantity": 1
    },
    {
        "order_id": 5,
        "menu_id": 7,
        "quantity": 1
    },
    {
        "order_id": 5,
        "menu_id": 17,
        "quantity": 1
    },
    {
        "order_id": 6,
        "menu_id": 19,
        "quantity": 1
    }
];

const seedOrderedItems = () => OrderedItems.bulkCreate(orderedItemData);

module.exports = seedOrderedItems;