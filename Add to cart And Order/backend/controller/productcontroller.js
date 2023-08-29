const { Op } = require('sequelize');
const J_product = require('../model/productmodel');
const user = require('../model/usermodel')
const Cart = require('../model/cartmodel');
const J_Order = require('../model/ordermodel');

exports.addproduct = async (req, res) => {
    console.log("this is req", req.body);
    try {
        const { Product_name, Product_price, Product_category, userId } = req.body
        const productcheck = await J_product.findOne({ where: { Product_name } });
        if (!productcheck) {
            const p1 = await J_product.create({ Product_name, Product_price, Product_category, userId })
            return res.json({ success: true, msg: "Product added succesfully", p1 })
        }
        return res.json({ success: false, msg: "Product already exits" })

    } catch (error) {
        console.log(error)
    }



}

exports.getallproduct = async (req, res) => {
    const fa = await J_product.findAll({
    })
    res.json(fa);

}
exports.getfromcart = async (req, res) => {
    const fa = await Cart.findAll({
        where: {
            userId: req.params.id
        },
        include:
        {
            model: J_product
        }
       
    })
    res.json(fa);

}
exports.getfromorder = async (req, res) => {
    const fa = await J_Order.findAll({
        where: {
            userId: req.params.id
        },
        include:
        {
            model: J_product
        }
    })
    res.json(fa);

}

exports.getbyid = async (req, res) => {
    try {

        const { item } = await req.query;
        console.log(item)
        const fo = await J_product.findOne({
            where: { Product_name: { [Op.like]: `%${item}%` } }

        });
        await res.json(fo)

    }
    catch (error) {
        console.error(error)
        res.status(404).json({ message: "error" })
    }
}

exports.DeleteProduct = async (req, res) => {
    try {
        const dlt = await J_product.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.json(dlt)
    }
    catch (error) {
        console.error(error)
        res.status(404).json({ message: "error" })
    }
}

exports.Deleteorder = async (req, res) => {
    try {
        const dlt = await Cart.destroy({
            where: {
                CartId: req.params.id,
            },
        });
        return res.json({ success: true, msg: "  product Delete succesfully From Cart" })
    }
    catch (error) {
        console.error(error)
        return res.json({ success: false, msg: " Product not exits" })
    }
}

exports.cancelorder = async (req, res) => {
    try {
        const dlt = await J_Order.destroy({
            where: {
                OrderId: req.params.id,
            },
        });
        return res.json({ success: true, msg: "Your order has been cancelled" })
    }
    catch (error) {
        console.error(error)
        return res.json({ success: false, msg: "You are late for cancel " })
    }
}

exports.updateproduct = async (req, res) => {
    const { updatename, updateprice, updatecategory, uId } = req.body;
    try {
        const product = await J_product.update({
            Product_name: updatename,
            Product_price: updateprice,
            Product_category: updatecategory
        },
            {
                where: {
                    id: uId
                }
            }

        )
        return res.json({ success: true, msg: " update product succesfully" })
    } catch (error) {
        return res.json({ success: false, msg: " Product not exits" })

    }
}


exports.addtocart = async (req, res) => {
    try {

        const { userId, productId, productCount } = req.body;
        console.log(req.body)
        const existingCartItem = await Cart.findOne({
            where: {
                userId: userId,
                productId: productId,
            }
        });
        console.log(productCount)
        if (existingCartItem) {
            await existingCartItem.update({
                productId: productId,
                productCount: productCount,
            });
            return res.json({ success: true, msg: "Your Updated Product has been added" })
        } else {

            await Cart.create({
                userId: userId,
                productId: productId,
                productCount: productCount,

            });
            return res.json({ success: true, msg: "Product added succesfully in your cart" })
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.palceorder = async (req, res) => {
    try {

        const { data } = req.body;
        console.log(data)
        {
            data && data.length > 0 && data.map(async (item) => {

                await J_Order.create({
                    userId: item.userId,
                    productId: item.productId,
                    productCount: item.productCount,
                    total: item.productCount * item.J_product.Product_price

                });

                await Cart.destroy({
                    where: {
                        userId: item.userId,
                        productId: item.productId
                    }
                })
            })
        }
        return res.json({ success: true, msg: "Your order has been placed" })
    } catch (error) {
        return res.json({ success: false, msg: "Due to Error Your order not place try Again" })
    }
}


