const { User } = require('../models');

const userData = [
  {
    "first_name": "Gavin",
    "last_name": "O'Brien",
    "email": "gavin@xyz.com",
    "password": "password123"
  },
  {
    "first_name": "Ren",
    "last_name": "Besson",
    "email": "Ren.Besson@outlook.com",
    "password": "$2b$10$y9.MmdTKu99Dw1iQ/WwP4OIhvNbsJ9boJjfwE4VMfgqIKH0b4odKS"
  },
  {
    "first_name": "Marie-dale",
    "last_name": "Pais",
    "email": "mariedale@xyz.com",
    "password": "password123"
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;