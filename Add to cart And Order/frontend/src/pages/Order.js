import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from './system.png';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

function Order() {
  const token = localStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  const user_Id = decodeToken.token1.id;

  const [data, setData] = useState([]);


  async function getfromorder() {
    try {
      const res = await axios.get(`http://localhost:3500/getfromorder/${user_Id}`);
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getfromorder();
  }, []);

  const Totalammount = () => {
    let Total = 0;
    data.forEach((product) => {
      const amount = product.J_product.Product_price
      const productCounts = product.productCount
      Total += Number(amount) * Number(productCounts)
    });
    return Total
  };



  const cancelorder = async (OrderId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to cancel Your order");

      if (confirmed) {
        const res = await axios.delete(`http://localhost:3500/cancelorder/${OrderId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log(res.data);
        getfromorder();
        toast.success("Your order has been cancel");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again later.");
    }
  };



  return (
    <div> <div>
      <div className='BackButton'>
        <button><a href='Cart'>Back To Cart</a></button>
        <h4>Your Total Amounts is : {Totalammount()}</h4>
        <p>Logged in : {decodeToken.token1.username}</p>
      </div>
      <div className='columnNew'>
        {data.length > 0 && data.map((item) => (
          <div className="display" key={item.id}>
            <img src={image} className="image" alt="#" />
            <p>Product_Name :  {item.J_product.Product_name}</p>
            <p>Product_price :  {item.J_product.Product_price}</p>
            <p>Quantity : {item.productCount}</p>
            <p>Total amount : {Totalammount()}</p>
            <button className="btnorderdlt" onClick={() => cancelorder(item.OrderId)}>Cancel Oder</button>
          </div>
        ))}
      </div>
    </div></div>
  )
}

export default Order;