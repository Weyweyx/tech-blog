const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  {
    dialectOptions:{
      ssl: {
        require: true
      }
    }
  }
);

module.exports = sequelize;