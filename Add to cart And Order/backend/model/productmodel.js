const Sequelize = require("sequelize")
const sequelize = require('../db/server');
const user = require("./usermodel")
const J_product = sequelize.define("J_product", {
   Product_name: {
      type: Sequelize.STRING,

   },
   Product_price: {
      type: Sequelize.INTEGER,
   },
   Product_category: {
      type: Sequelize.STRING
   },
   userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
         model: user,
         key: 'id'
      }
   }

});

user.hasMany(J_product, { foreignKey: 'userId' });
J_product.belongsTo(user, { foreignKey: 'userId' });

module.exports = J_product;
