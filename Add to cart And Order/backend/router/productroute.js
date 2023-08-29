const express = require('express')
const router = express.Router()
const { getallproduct, addproduct, getbyid, DeleteProduct, updateproduct, addtocart, getfromcart, Deleteorder, getfromorder, palceorder, cancelorder } = require('../controller/productcontroller')

router.post('/add-product', addproduct)
router.get('/get-All-product', getallproduct)
router.get('/get-by-id/', getbyid)
router.delete('/delete-product/:id', DeleteProduct)
router.post('/update-product', updateproduct)
router.post('/addtocart', addtocart)
router.get('/getfromcart/:id', getfromcart)
router.delete('/delete-order/:id', Deleteorder)
router.get('/getfromorder/:id', getfromorder)
router.post('/placeorder', palceorder)
router.delete('/cancelorder/:id', cancelorder)

module.exports = router;
