const { Order } = require('../models');

const orderData = [
    {
        "date": '2023-02-09 16:04:42',
        "user_id": 1,
        "table_no": 2,
        "completed": true
    },
    {
        "date": '2023-02-09 16:43:02',
        "user_id": 2,
        "table_no": 6,
        "completed": true
    },
    {
        "date": '2023-02-09 17:14:44',
        "user_id": 3,
        "table_no": 5,
        "completed": false
    },
    {
        "date": '2023-02-09 18:04:32',
        "user_id": 1,
        "table_no": 7,
        "completed": false
    },
    {
        "date": '2023-02-09 18:16:42',
        "user_id": 2,
        "table_no": 1,
        "completed": false
    },
    {
        "date": '2023-02-09 19:54:28',
        "user_id": 3,
        "table_no": 8,
        "completed": false
    }
];

const seedOrders = () => Order.bulkCreate(orderData);

module.exports = seedOrders;