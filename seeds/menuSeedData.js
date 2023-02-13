const { Menu } = require('../models');

const menuData = [
    {
        "item": "Nacho & Cheese",
        "price": 8.00
    },
    {
        "item": "Nacho Beans",
        "price": 10.00
    },
    {
        "item": "Entity 59 Nachos",
        "price": 12.00
    },
    {
        "item": "Loaded Nachos",
        "price": 17.00
    },
    {
        "item": "Montreal Smoked Meat Sandwich",
        "price": 12.00
    },
    {
        "item": "Entity 59 Club",
        "price": 17.00
    },
    {
        "item": "Pulled Pork Sandwich",
        "price": 17.00
    },
    {
        "item": "Burger",
        "price": 15.00
    },
    {
        "item": "Cheese Burger",
        "price": 16.00
    },
    {
        "item": "Bacon Cheese Burger",
        "price": 18.00
    },
    {
        "item": "Burger with the Works",
        "price": 19.00
    },
    {
        "item": "Chicken 1/4",
        "price": 15.00
    },
    {
        "item": "Chicken 1/2",
        "price": 20.00
    },
    {
        "item": "Chicken Full",
        "price": 28.00
    },
    {
        "item": "Pulled Pork Mac & Cheese",
        "price": 13.00
    },
    {
        "item": "Ribs 1/4",
        "price": 15.00
    },
    {
        "item": "Ribs 1/2",
        "price": 22.00
    },
    {
        "item": "Ribs Full",
        "price": 32.00
    },
    {
        "item": "All Meat Combo",
        "price": 32.00
    },
    {
        "item": "Date Night",
        "price": 45.00
    },
    {
        "item": "Everybody Eats",
        "price": 75.00
    }
];

const seedMenu = () => Menu.bulkCreate(menuData);

module.exports = seedMenu;