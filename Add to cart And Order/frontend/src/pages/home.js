import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Search from './search';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import image from './system.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'





function Product() {
  const token = localStorage.getItem("token");
  const decodeToken = jwt_decode(token);
  const user_Id = decodeToken.token1.id;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [data, setData] = useState([]);
  const [productCount, setProductCount] = useState(1)


  


 




  async function getProduct() {
    try {
      const res = await axios.get('http://localhost:3500/get-All-product');
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  const initialValues = {
    Product_name: '',
    Product_price: '',
    Product_category: '',
    userId: user_Id,
  };

  const validationSchema = Yup.object({
    Product_name: Yup.string().required('Product Name Required'),
    Product_price: Yup.number().required('Product PriceRequired'),
    Product_category: Yup.string().required('Product Category Required'),
  });


  // update start

  const [update, setUpdate] = useState([])
  const handleUpdate = (item) => {
    setShow(true)
    console.log("item", item)
    setUpdate(item)
    console.log("update state", state)
  }

  const [state, setState] = useState({
    updatename: '',
    updateprice: '',
    updatecategory: '',
    uId: ''
  })

  useEffect(() => {
    const changeState = {
      uId: update.id,
      updatename: update.Product_name,
      updateprice: update.Product_price,
      updatecategory: update.Product_category

    }
    setState(changeState)
  }, [update])


  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3500/update-product', state)
    toast.success("product has been update")
    getProduct();
  }



  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post('http://localhost:3500/add-product', values);
      console.log(res);

      if (res.status === 200) {
        resetForm();
        toast.success(res.data.msg);
      } else {
        toast.error(res.data.msg);
      }

      getProduct();
    } catch (error) {
      console.error(error);
      toast.error('An error occurred.');
    }
  };


  function getbyid(item) {
    console.log("geybyid api is running")
    axios.get(`http://localhost:3500/get-by-id?item=${item}`)
      .then((res) => {
        console.log(res.data)
        setData([res.data])
      })
  }


  const DeleteProduct = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this product?");

      if (confirmed) {
        const res = await axios.delete(`http://localhost:3500/delete-product/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log(res.data);
        getProduct();
      }
    } catch (error) {
      console.log(error);
    }
  };


  function changepass() {
    navigate("/changepass")
  }


  const navigate = useNavigate();
  function logout() {
    localStorage.clear()
    navigate("/login")
  }


  const nav = useNavigate();
  function MYCART() {
    nav("/cart")
  }


  const addtocart = async (productId) => {
    try {
      const response = await axios.post('http://localhost:3500/addtocart', {
        userId: user_Id,
        productId: productId,
        productCount: productCount,
      })
      console.log(response)
      if (response.data.success) {
        nav('/cart')
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
    <>
      <div>
        <div className='nav'>
          <Search getbyid={(item) => getbyid(item)} />
          <button className="mycart" type='submit' onClick={MYCART} >Cart 🛒 </button>
          <button className="logoutbtn" type='submit' onClick={logout}>
            LogOut
          </button>
          <button className="changepass" type='submit' onClick={changepass}>
            Change Password
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <p>Logged in {decodeToken.token1.username}</p>

              <div>
                <label>Enter Product Name:</label>
                <Field type="text" id="Product_name" name="Product_name" placeholder="Enter product" />
                <ErrorMessage name="Product_name" component="div" className="error" />
              </div>

              <div>
                <label>Enter Product Price:</label>
                <Field type="text" id="Product_name" name="Product_price" placeholder="Enter price" />
                <ErrorMessage name="Product_price" component="div" className="error" />
              </div>

              <div>
                <label>Choose a category:</label>
                <Field as="select" id="Product" name="Product_category" >
                  <option value="" disabled>Select Category</option>
                  <option value="ios">ios</option>
                  <option value="Laptop">Laptop</option>
                  <option value="smart phone">smart phone</option>
                </Field>
                <ErrorMessage name="Product_category" component="div" className="error" />
              </div>

              <button className="button" type='submit'>Add product</button>
            </Form>
          )}
        </Formik>
      </div>

      <div className='columnNew'>
        {data.length > 0 && data.map((item) => (
          <div className="display" key={item.id}>
            <img src={image} className="image" alt="#" />
            <p>Product_Name : {item.Product_name}</p>
            <p>Product_price : {item.Product_price}</p>
            <p>Product_category : {item.Product_category}</p>
            <div className='addtocart'>
              <button onClick={() => addtocart(item.id)} >Add to cart</button>
              <select id="Quantity" name="Qunatity" onChange={(e) => { setProductCount(e.target.value) }}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <button className="button" onClick={() => handleUpdate(item)}> Edit Details</button>
            <button className="button" onClick={() => DeleteProduct(item.id)}> Delete Product</button>

          </div>
        ))}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title><h2>UPDATE PRODUCT</h2></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>
              <label>Enter Update Name:</label>
              <input type="text" id="updatename" name="updatename" onChange={handleChange} value={state.updatename} /><br></br>
              <label>Enter Update Price :</label>
              <input type="text" id="Pprice" name="updateprice" onChange={handleChange} value={state.updateprice} /><br></br>
              <label htmlFor="Product">Choose Update a category:</label>
              <select id="Pcategory" name="updatecategory" onChange={handleChange} value={state.updatecategory}>
                <option value="select">Select category</option>
                <option value="ios">ios</option>
                <option value="Laptop">Laptop</option>
                <option value="smart phone">smart phone</option>
              </select>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='button-group'>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit1}>
              Update Product
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Product;