const Sequelize = require("sequelize")
const sequelize = require('../db/server');
const user = sequelize.define("Layout", {
   email: {
      type: Sequelize.STRING,

   },
   username: {
      type: Sequelize.STRING,

   },
   password: {
      type: Sequelize.INTEGER,
   },

});
module.exports = user;