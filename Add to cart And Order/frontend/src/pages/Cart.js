
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from './system.png';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';




function Cart() {
  const token = localStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  const user_Id = decodeToken.token1.id;
  const [data, setData] = useState([]);
  
  async function getfromcart() {
    try {
      const res = await axios.get(`http://localhost:3500/getfromcart/${user_Id}`);
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
   
     getfromcart();
  }, []);



  const Deleteorder = async (CartId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to remove this product?");

      if (confirmed) {
        const res = await axios.delete(`http://localhost:3500/delete-order/${CartId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log(res.data);
        getfromcart();
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const Totalammount = () => {
    let Total = 0;
    data.forEach((product) => {
      const amount = product.J_product.Product_price
      const productCounts = product.productCount
      Total += Number(amount) * Number(productCounts)
    });
    return Total
  };

  const nav = useNavigate();
  function MYODER() {
    nav("/order")
  }

  const placeorder = async (data) => {
    try {
      console.log("data", data)
      const response = await axios.post('http://localhost:3500/placeorder', { data: data }
      )
      if (response.data.success) {
        nav('/order')
        getfromcart()
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('An error occurred while adding the product to the cart.');
    }
  };

  
 


  return (
    <div>
      <div className='BackButton'>
        <p>Logged in : {decodeToken.token1.username}</p>
        <button><a href='home'>Back To Home</a></button>
        <button className="myorder" type='submit' onClick={MYODER}>Go to Order </button>
        <h4>Your Total Amounts is : {Totalammount()}</h4>
        <button onClick={() => placeorder(data)}>Buy All Cart Product</button>
      </div>
      <div className='columnNew'>
        {data.length > 0 && data.map((item) => (
          <div className="display" key={item.id}>
            <img src={image} className="image" alt="#" />
            <p>Product_Name :  {item.J_product.Product_name}</p>
            <p>Product_price :  {item.J_product.Product_price}</p>
            <p>Quantity : {item.productCount}</p>
            <div className='incdecbtn'>
            <button className='increase'>+</button>
            <button className='decrease'>-</button>
            </div>
            <button className="btnorderdlt" onClick={() => Deleteorder(item.CartId)}>Remove From Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cart

