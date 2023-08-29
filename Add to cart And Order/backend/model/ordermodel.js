const Sequelize = require("sequelize")
const sequelize = require('../db/server');
const user = require('./usermodel')
const J_Product = require('./productmodel');
const Cart = require("./cartmodel");
const J_Order = sequelize.define("J_Order", {
    OrderId: {
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
        references: {
            model: Cart,
            key: 'productCount'
        }

    },
    total:
    {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

user.hasMany(J_Order, { foreignKey: 'userId' });
J_Order.belongsTo(user, { foreignKey: 'userId' });

J_Product.hasMany(J_Order, { foreignKey: 'productId' });
J_Order.belongsTo(J_Product, { foreignKey: 'productId' });

module.exports = J_Order;
