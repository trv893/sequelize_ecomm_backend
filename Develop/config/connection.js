require('dotenv').config();
// connects sequelize to the db through the .env file to obscure usn, db pw and db name
const Sequelize = require('sequelize');
console.log(process.env.DB_NAME);
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
