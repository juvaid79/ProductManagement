const Sequelize = require("sequelize")
const sequelize = require('../db/server');
const user = require('./usermodel')
const J_Product = require('./productmodel');
const Cart = sequelize.define("J_Cart", {
    CartId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: user,
            key: 'id'
        }
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: J_Product,
            key: 'id'
        }
    },
    productCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1, // You can set a default value if needed
    },

});

user.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(user, { foreignKey: 'userId' });

J_Product.hasMany(Cart, { foreignKey: 'productId' });
Cart.belongsTo(J_Product, { foreignKey: 'productId' });

module.exports = Cart;
